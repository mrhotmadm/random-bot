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
                finalMember.send(`You have been kicked from **${message.guild}** for the reason: **${reason}**.`).catch(err => {
                    console.log(err);
                });
            });

            let currentTime = new Date();
            var hours = currentTime.getHours() > 12 ? currentTime.getHours() - 12 : currentTime.getHours();
            var am_pm = currentTime.getHours() >= 12 ? "PM" : "AM";

            let splitted = currentTime.getMinutes()
            if (splitted.length === 1) {
                splitted = "0" + splitted
            }

            let kickEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
            .setThumbnail(finalMember.user.displayAvatarURL())
            .setColor("#91A3B0")
            .setDescription(`
            **Member:** ${finalMember.user.username} - *(${finalMember.user.id})*
            **Action:** ***Kick***
            **Reason:** ${reason}
            **Date & Time:** **${currentTime.getMonth()}-${currentTime.getDay()}-${currentTime.getFullYear()} (${currentTime.getHours()}:${splitted} ${am_pm})**
            **Moderator:** *@${message.author.username} (${message.author.id})*
            **Audit Logged: True**
            `)
            .setTimestamp();

            message.channel.send(kickEmbed);
        }
    }
}