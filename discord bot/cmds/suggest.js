const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

    message.delete()

    let mChannel = message.mentions.channels.first()

    if(!mChannel) return message.channel.send("Mentionnez le salon Suggestions")
    let messageToBot = args.slice(1).join(" ")
    if(!messageToBot) return message.channel.send("Merci de mettre votre suggestion ou le lien menant vers votre suggestion.")

    let embedSaying = new Discord.RichEmbed()
    .setTitle("**Suggestion pour Pasadena Vibes**")
    .setThumbnail("https://cdn.discordapp.com/attachments/665584539682209793/693543211024646164/discord_354.png")
    .setColor('#F5CBA7')
    .setDescription(`${messageToBot}`)
    .setFooter(`Suggestion faite par ${message.author.username}`, 'https://cdn.discordapp.com/attachments/665584539682209793/693543211024646164/discord_354.png')

    mChannel.send(embedSaying).then(async msg => {
        await msg.react('✅')
        await msg.react('❌')
    })
}

module.exports.help = {
  name: 'suggest'
}
