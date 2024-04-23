const { Events } = require('discord.js');

/**
 * Handles interactions between the user and the bot application.
 */
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if(!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if(!command) {
            console.error(`[ERR] No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(`[ERR] Something went wrong: ${error.message}`);
            if(interaction.replied || interaction.deffered) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            }
            else { 
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};