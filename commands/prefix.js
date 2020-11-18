const GuildSchema = require('../schemas/GuildSchema.js');
const Discord = require('discord.js');

module.exports = {
    name: "prefix",
    description: "changes bot prefix for server",
    async execute(message, args) {
        send = async function(msg) {
            message.channel.send(msg)
        }
        sendError = async function(msg) {
            send(new Discord.MessageEmbed().setColor('RED').setDescription(msg).setTitle("Oops!"))
        }

        if (!args[0]) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('Please specify a **prefix**')
        );
        if (args[0].length > 5) return message.channel.send(
            new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('**The prefix cannot be over 5 characters!**')
        );
        if (!message.author === message.guild.owner || !message.member.hasPermission("MANAGE_SERVER" || "ADMINISTRATOR")) {
            return sendError(`**${message.member}**, Only an administrator can change the server prefix!`)
        }
        if (args[0] === "default") {
            args[0] = ";";
        }

        await GuildSchema.findOneAndUpdate({
            guildId: message.guild.id,
        },
        {
            guildId: message.guild.id,
            prefix: args[0],
        },
        { upsert: true }
        );

        message.channel.send(
            new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(`**Sucessfully changed the prefix to: ${args[0]}**`)
        );
    }
}