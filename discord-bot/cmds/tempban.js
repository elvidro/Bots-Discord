const Discord = require("discord.js")
const colours = require("../colours.json")
const ms = require("ms")
 
module.exports.run = async (bot, message, args) => {
 
    message.delete()
 
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission.")
    if(!message.guild.me.hasPermission("ADMINISTRATOR")) return ("Merci de m'ajoutez la permission `ADMINISTRATOR` pour utilisez cette commande.")
 
    let banu = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!banu) return message.channel.send("Veuillez mentionnez la personne à ban temporairement.")
 
    let reason = args.slice(2).join(" ");
    if(!reason) reason = "Aucune raison données."
 
    let bantime = args[1];
    if(!bantime) return message.channel.send("Veuillez saisir le temps du tempban.")
 
    await banu.ban()
 
    let banLogEmbed = new Discord.RichEmbed()
    .setColor(colours.gold)
    .setAuthor(`${message.guild.name} LOG`, message.guild.iconURL)
    .addField("Moderation :", "**BAN TEMPORAIRE**")
    .addField("Utilisateur ayant été ban temporairement :", banu.user.username)
    .addField("Utilisateur ayant ban temporairement :", message.author.tag)
    .addField("Raison :", reason)
 
    let lChannel = message.guild.channels.find(c => c.name === "logs")
    lChannel.send(banLogEmbed)
 
    setTimeout(() => {
 
        try {
            message.guild.unban(banu , {reason: reason})
        } catch(e) {
            console.log(e.message)
        }
 
        let banLogEmbed = new Discord.RichEmbed()
        .setColor(colours.green_dark)
        .setAuthor(`${message.guild.name} LOG`, message.guild.iconURL)
        .addField("Moderation :", "**UNBAN**")
        .addField("Utilisateur ayant été unban :", banu.user.username)
   
        let lChannel = message.guild.channels.find(c => c.name === "logs")
        lChannel.send(banLogEmbed)
 
    }, ms(bantime))
       
}
 
module.exports.help = {
    name: "tempban"
}