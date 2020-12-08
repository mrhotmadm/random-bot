const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "reactrole",
    description: "",
    async execute(message, args, bot) {
        let msg = await message.channel.send("Simply react to this message to gain entry to ALL the coding channels!" +
        " If you misuse the coding chats (as if they are a general chat, etc), your ability to acquire the 'Coder' role and access to the channels WILL be relieved.")


        await msg.react("✅").then(() =>{
            message.delete()
        });


        bot.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return
        
            if (reaction.message.id === msg.id) {
                if (reaction.emoji.name == "✅") await reaction.message.guild.members.cache.get(user.id).roles.add("765967445265481749")
            }
        })
        
        bot.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch()
            if (reaction.partial) await reaction.fetch()
            if (user.bot) return
        
            if (reaction.message.id === msg.id) {
                if (reaction.emoji.name == "✅") await reaction.message.guild.members.cache.get(user.id).roles.remove("765967445265481749")
            }
        })
    }
}
