
/**
 * Run this command by typing /server in the Discord message box. 
 * @action Simply states the server name and the number of users in said server.
 */const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    category: 'utility',
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server'),
    async execute(interaction) {
        // interaction.guild is the object representing the Guild in which the command was executed
        await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`)
    }
}