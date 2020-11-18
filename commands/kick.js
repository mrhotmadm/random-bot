const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "kicks a user",
    async execute(message, args) {
        send = async function(msg) {
            message.channel.send(msg)
        }
        sendError = async function(msg) {
            send(new Discord.MessageEmbed().setColor('RED').setDescription(msg).setTitle("Oops!"))
        }
        sendMember = async function(msg, member) {
            member.send(msg)
        }

        if (!args[0]) return sendError('**You need to specify a member of this server to kick!**')

        if (!message.member.hasPermission("ADMINISTRATOR" || "KICK_MEMBERS")) {
            sendError(`${message.member}, **you do not have permissions!**`);
        }

        if (!message.guild.me.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS" || "KICK_MEMBERS")) {
            return message.channel.send("I do not have permissions!");
        }
        
        if (message.member.hasPermission("ADMINISTRATOR" || "KICK_MEMBERS")) {
            const userToKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!userToKick) return sendError("**That user cannot be found!**");
            let reason = args.slice(1).join(" ");
            if (!reason) reason = "No reason given.";

            if (userToKick.id === message.guild.me.id) return send("**You must kick me manually!**");

            if (userToKick.id === message.author.id) return send("**You cannot kick yourself!**");

            const finalMember = userToKick;
            finalMember.kick(reason).catch(err => {
                console.log(err);
            }).then(() => {
                sendMember(`You have been kicked from **${message.guild}** for the reason: **${reason}**.`, finalMember).catch(err => {
                    console.log(err);
                });
            });

            var d = new Date,
            dformat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

            let kickEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
            .setThumbnail(finalMember.user.displayAvatarURL())
            .setColor("#91A3B0")
            .setDescription(`
            **Member:** ${finalMember.user.username} - *(${finalMember.user.id})*
            **Action:** ***Kick***
            **Reason:** ${reason}
            **Date & Time:** **${dformat}**
            **Moderator:** *@${message.author.username} (${message.author.id})*
            **Audit Logged: True**
            `)
            .setTimestamp();

            message.channel.send(kickEmbed);
        }
    }
}