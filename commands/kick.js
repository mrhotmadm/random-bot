const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "kicks a user",
    async execute(message, args) {
        if (message.mentions.members.first() == message.guild.owner || message.mentions.members.first().id == message.guild.ownerID) return message.channel.send("**You cannot kick the owner of the server!**");
        
        if (!message.guild.me.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS" || "KICK_MEMBERS")) {
            return message.channel.send("I do not have permissions!");
        }
        

        if (message.member.hasPermission("ADMINISTRATOR" || "KICK_MEMBERS")) {
            const userToKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!userToKick) return message.channel.send("That user cannot be found!");
            let reason = args.slice(1).join(" ");
            if (!reason) reason = "No reason given.";

            if (userToKick.id === message.guild.me.id) return message.channel.send("**You must kick me manually!**");

            if (userToKick.id === message.author.id) return message.channel.send("**You cannot kick yourself!**");

            const finalMember = userToKick;
            finalMember.send(reason).catch(err => {
                console.log(err);
            }).then(() => {
                finalMember.kick(reason).catch(err => {
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
        else {
            message.channel.send(`@${message.member.id}, **you do not have permissions!**`);
        }
    }
}