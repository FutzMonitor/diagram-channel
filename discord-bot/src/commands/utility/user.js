const { SlashCommandBuilder } = require('discord.js');

/**
 * Run this command by typing /user in the Discord message box. 
 * @action Simply prints who ran the command and when they last joined the server.
 */
module.exports = { 
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
            // interaction.user is the object representing the User who ran the command
            // interaction.member is the Guildmember object, which represents the user in the specified guild
            await interaction.reply(`This command was run by ${interaction.user.username}, who joing on ${interaction.member.joinedAt}.`)
        }
}