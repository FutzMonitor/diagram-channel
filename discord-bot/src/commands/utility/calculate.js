const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculate')
        .setDescription('Calculates some operation between two whole numbers.')
        .addIntegerOption(option =>
            option.setName('number1')
                .setDescription('The first number.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('operation')
                .setDescription('Math operation to perform.')
                .setRequired(true)
                .addChoices(
                    { name: 'addition', value: '+' },
                    { name:'subtraction', value: '-' },
                    { name:'multiplication', value: '*' },
                    { name: 'division', value: '/' },
                    { name: 'exponentiation', value: '**' },
                    { name: 'modulus', value: '%' },
                )
        )
        .addIntegerOption(option =>
            option.setName('number2')
                .setDescription('The second number.')
                .setRequired(true)
        ),

    async execute(interaction) {
        console.log(`Entering the execute function.`);
        const operation = interaction.options.getString('operation'); 
        const number1 = interaction.options.getInteger('number1');
        const number2 = interaction.options.getInteger('number2');
        let result;
        if(operation === '+') {
            result = number1 + number2;
        }
        else if (operation === '-') {
            result = number1 - number2;
        }
        else if (operation === '*') {
            result = number1 * number2;
        }
        else if (operation === '/') {
            if(number2 === 0) {
                return await interaction.reply('😅 Brother, you can\'t divide by zero.');
            }
            result = number1 / number2;
        }
        else if (operation === '**') {
            result = Math.pow(number1, number2);
        }
        else if (operation === '%') {
            if(number2 === 0) {
                return await interaction.reply('😅 Brother, you can\'t divide by zero.');
            }
            result = number1 % number2;
        }
        // Debugging only
        // console.log(`The result of ${number1} ${operation} ${number2} is ${result}.`);
        await interaction.reply(`# The result of ${number1} ${operation} ${number2} is ${result}.`);
    }
};
