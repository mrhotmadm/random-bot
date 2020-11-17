const { DiscordAPIError, MessageEmbed } = require("discord.js");

module.exports = {
    name: "mute",
    description: "mutes a user",
    async execute(message, args) {
        function send(msg) {
            message.channel.send(msg)
        }

        if (!args[0]) return send("Please specify a user to mute!");
        if (!args[1]) return send("Please specify the amount of time you want to mute this user!");
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return send(new MessageEmbed().setColor("RED").setDescription("You don't have permissions! Ask a mod/admin for permission to manage roles!"))

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let muteRole = message.guild.roles.cache.find(role => role.name === "Muted")
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: "Muted",
                    color: "GRAY",
                    permissions: []
                },
            })
        }

        for (let channel of message.guild.channels.cache) {
            channel.updateOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false
            }).catch(err => console.log(err))
        }

        user.roles.add(muteRole).then(message.channel.send(`Sucessfully muted ${user}!`)).catch(err => console.log(err))

        
    }
}