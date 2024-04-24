const { SlashCommandBuilder } = require('discord.js');

/**
 * Run this command by typing /server in the Discord message box. 
 * @
 */
module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('gen')
        .setDescription('Generates a Mermaid diagram with user input.'),
        async execute(interaction) {
            await interaction.reply({ content: 'Please input your code:', ephemeral: true });
    
            const filter = (m) => m.author.id === interaction.user.id;
            const collector = interaction.channel.createMessageCollector({ filter, time: 60000, max: 1 });
    
            collector.on('collect', (message) => {
                const code = message.content;
                // Here you can execute or process the provided code
                console.log(`User inputted code: ${code}`);
                // You can replace the console.log with your code execution logic
                interaction.followUp(`You entered the following code: \n\`\`\`${code}\`\`\``);
            });
    
            collector.on('end', (collected, reason) => {
                if (reason === 'time') {
                    interaction.followUp('You took too long to input your code.');
                }
            });
        },
}