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
                const svgCode = await generateDiagramSVG(graphDefinition);

                // Reply to the user with the generated SVG
                
                modalInteraction.reply({ content: 'Here\'s your diagram:', files: [svgCode] });
            })
            .catch((err) => {
                console.error(`[ERR] Something went wrong: ${err}`);
            });
    }
};

async function generateDiagramSVG(graphDefinition) {
    const browser = await puppeteer.launch({ headless: false });
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

    // Wait for the Mermaid script to be fully loaded and initialized
    await page.waitForFunction(() => typeof mermaid !== 'undefined');

    // Once the Mermaid script is loaded, proceed with rendering the diagram
    const svgCode = await page.evaluate(() => {
        const svg = document.querySelector('.mermaid svg');
        return svg ? svg.outerHTML : null;
    });

    await browser.close();

    return generateDiagramPNG(svgCode);
}

async function generateDiagramPNG(svgCode) {
    // Convert SVG code to PNG using sharp
    const pngBuffer = await sharp(Buffer.from(svgCode)).png().toBuffer();
    return pngBuffer;
}
