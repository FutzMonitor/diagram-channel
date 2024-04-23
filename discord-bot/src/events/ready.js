const { Events } = require('discord.js');

/**
 * Acknowledges the bot's ready state. 
 */
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};