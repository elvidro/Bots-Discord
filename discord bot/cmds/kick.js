const Discord = require("discord.js");
const colours = require("../colours.json")

module.exports.run = async (bot, message, args) => {

    let kickedUser = message.guild.member(message.mentions.users.first())
    if(!kickedUser) {
        return message.channel.send("**Aucun Résultat**")
    }
    let kickReason = args.join(" ").slice(22);
    if(!message.member.hasPermissions("MANAGE_MESSAGE")) {
        return message.channel.send("Vous n'avez pas les permissions !")
    }
    if(kickedUser.hasPermissions("MANAGE_MESSAGES")) {
        return message.channel.send("Vous n'avez pas kick la personne")
    }
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**Kick par le Staff**")
    .setColor(colours.red_light)
    .addField("Joueur Kick", `${kickedUser} (ID: ${kickedUser.id})`)
    .addField("Personne qui vous as kick", `${message.author} (ID: ${message.author.id})`)
    .addField("Canal", message.channel)
    .addField("Raison du Kick", kickReason)

    let kickChannel = message.guild.channels.find(`name`, "logs");
    if(!kickChannel) {
        return message.channel.send("Le Canal 'logs' n'a pas été trouvé. Créez-le !")
    }
    message.guild.member(kickedUser).kick(kickReason)
    kickChannel.send(kickEmbed)
}

module.exports.help = {
    name: "kick"
}