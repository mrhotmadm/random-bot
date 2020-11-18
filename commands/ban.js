const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "bans a user",
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

        if (!args[0]) return sendError('**You need to specify a member of this server to ban!**')

        if (!message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")) {
            sendError(`${message.member}, **you do not have permissions!**`);
        }

        if (!message.guild.me.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS" || "KICK_MEMBERS")) {
            return message.channel.send("I do not have permissions!");
        }
        
        if (message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")) {
            const userToBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!userToBan) return sendError("**That user cannot be found!**");
            let reason = args.slice(1).join(" ");
            if (!reason) reason = "No reason given.";

            if (userToBan.id === message.guild.me.id) return sendError("**You must ban me manually!**");

            if (userToBan.id === message.author.id) return sendError("**You cannot ban yourself!**");

            const finalMember = userToBan;
            finalMember.ban({reason: `${reason}`}).catch(err => {
                console.log(err);
            }).then(() => {
                sendMember(`You have been banned from **${message.guild}** for the reason: **${reason}**.`, finalMember).catch(err => {
                    console.log(err);
                });
            });

            var d = new Date,
            dformat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

            let banEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
            .setThumbnail(finalMember.user.displayAvatarURL())
            .setColor("#91A3B0")
            .setDescription(`
            **Member:** ${finalMember.user.username} - *(${finalMember.user.id})*
            **Action:** ***Ban***
            **Reason:** ${reason}
            **Date & Time:** **${dformat}**
            **Moderator:** *@${message.author.username} (${message.author.id})*
            **Audit Logged: True**
            `)
            .setTimestamp();

            send(banEmbed);
        }
    }
}