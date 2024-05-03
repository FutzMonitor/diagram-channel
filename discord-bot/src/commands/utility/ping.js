const { SlashCommandBuilder } = require("discord.js");

/**
 * Run this command by typing /ping in the Discord message box. 
 * @action Simply responds 'Pong!' to the users command.
 */
module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};