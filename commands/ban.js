const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "bans a user",
    async execute(message, args) {
        if (args[0] == message.guild.owner || args[0] == message.guild.ownerID) return message.channel.send("**You cannot ban the owner of the server!**");
        
        if (!message.guild.me.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS" || "KICK_MEMBERS")) {
            return message.channel.send("I do not have permissions!");
        }
        

        if (message.member.hasPermission("ADMINISTRATOR" || "KICK_MEMBERS")) {
            const userToBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!userToBan) return message.channel.send("That user cannot be found!");
            let treason = args.slice(1).join(" ");
            if (!treason) treason = "No reason given.";

            if (userToBan.id === message.guild.me.id) return message.channel.send("**You must ban me manually!**");

            if (userToBan.id === message.author.id) return message.channel.send("**You cannot ban yourself!**");

            const finalMember = userToBan;
            finalMember.ban({reason : treason}).catch(err => {
                console.log(err);
            });

            var d = new Date,
            dformat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

            let banEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
            .setThumbnail(finalMember.user.displayAvatarURL())
            .setColor("#91A3B0")
            .setDescription(`
            **Member:** ${finalMember.user.username} - *(${finalMember.user.id})*
            **Action:** **Permanent Ban *(Unless unbanned)***
            **Reason:** ${treason}
            **Date & Time:** **${dformat}**
            **Moderator:** *@${message.author.username} (${message.author.id})*
            **Audit Logged:** True
            `)
            .setTimestamp();

            message.channel.send(banEmbed);
        }
        else {
            message.reply(`**You do not have permissions!**`);
        }
    }
}