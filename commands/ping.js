const Discord = require('discord.js');

module.exports = {
    name: "ping",
    description: "pong",
    execute(message, args) {
        const speedembed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Pong!')
        .setDescription(`**Time:** *${message.client.ws.ping}ms*`);

        message.channel.send(speedembed);
    }
}