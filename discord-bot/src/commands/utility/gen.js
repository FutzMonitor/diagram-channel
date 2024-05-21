const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

module.exports = {
    cooldown: 5,
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('gen')
        .setDescription('Generates a Mermaid diagram with user input.'),
    async execute(interaction) {
        const codeBox = new ModalBuilder({
            customId: `myDiagram-${interaction.user.id}`,
            title: `Code Box`,
        });

        const diagramInput = new TextInputBuilder({
            customId: `Diagram Syntax Input`,
            label: `Please paste your Mermaid code below.`,
            style: TextInputStyle.Paragraph,
            required: true
        });

        const row = new ActionRowBuilder().addComponents(diagramInput);

        codeBox.addComponents(row);

        await interaction.showModal(codeBox);

        // Wait for user input.
        const filter = (interaction) => interaction.customId === `myDiagram-${interaction.user.id}`;
        interaction
            .awaitModalSubmit({ filter, time: 60000 })
            .then(async (modalInteraction) => {
                const graphDefinition = modalInteraction.fields.getTextInputValue('Diagram Syntax Input');

                // Generate the SVG using Puppeteer
                const diagramPng = await generateDiagramPNG(graphDefinition);

                // Reply to the user with the generated SVG

                modalInteraction.reply({ content: 'Here\'s your diagram:', files: [diagramPng] });
            })
            .catch((err) => {
                console.error(`[ERR] Something went wrong: ${err}`);
            });
    }
};

/**
 * Take the user inputted modal diagram definition and launch a headless
 * browser to render the Mermaid diagram. Necessary because Mermaid.js
 * requires the DOM to calculate where to place different elements of the 
 * diagram. NOTE: The migration from JISON to Langium might mean this function will 
 * need to be updated in the future. 
 * @param graphDefinition 
 * @returns 
 */
async function generateDiagramPNG(graphDefinition) {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.setContent(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mermaid Diagram Example</title>
            <!-- Load Mermaid CSS and JavaScript from CDN -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.css">
            <script src="https://cdn.jsdelivr.net/npm/mermaid@10.9.0/dist/mermaid.min.js"></script>
            <!-- Initialize Mermaid -->
            <script>
                document.addEventListener('DOMContentLoaded', function () {
                    mermaid.initialize({ startOnLoad: true });
                });
            </script>
        </head>
        <body>
            <div class="mermaid">
                ${graphDefinition}
            </div>
        </body>
        </html>
    `);

    // Wait for the Mermaid diagram to render
    await page.waitForFunction(() => typeof mermaid !== 'undefined');
    await page.waitForSelector('.mermaid svg');
    const svgElement = await page.$('.mermaid svg');
    const boundingBox = await svgElement.boundingBox();
    const padding = 20; // Add 20 pixels of padding to finetune targeting the actual svg. You can change it as needed.
    await page.setViewport({
        width: Math.ceil(boundingBox.width) + padding,
        height: Math.ceil(boundingBox.height),
        deviceScaleFactor: 2 
    });

    // Take a screenshot of the rendered SVG
    const svgBuffer = await page.screenshot({
        clip: {
            x: boundingBox.x,
            y: boundingBox.y,
            width: boundingBox.width + padding,
            height: boundingBox.height
        },
        omitBackground: true
    });

    await browser.close();

    return svgToPng(svgBuffer);
}
/**
 * Convert to a PNG from an SVG representation because Discord
 * doesn't support SVG rendering on its platform for security reasons.
 * @param svgBuffer 
 * @returns 
 */
async function svgToPng(svgBuffer) {
    // Converts SVG to PNG via Sharp
    const pngBuffer = await sharp(svgBuffer)
        .png({
            density: 300,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toBuffer();

    return pngBuffer;
}
