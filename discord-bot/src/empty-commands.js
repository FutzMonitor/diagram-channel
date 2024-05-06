const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

/**
 * Set the commands array to empty
 */
const commands = [];

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.token);

// Empty commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all the commands in the guild with the empty set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.clientID, process.env.guildID), 
            { body: commands },
        );
        console.log(`Successfully emptied application (/) commands`)
    }
    catch(error) {
        console.error(`[ERR]: ${error}`);
    }

})();