const Discord = require("discord.js");
const colours = require("../colours.json");
 
module.exports.run = async (bot, message, args) => {
 
message.delete()
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Vous n'avez pas la permission")
 
    let unbanMember = await bot.fetchUser(args[0])
   if(!unbanMember) return message.channel.send("La personne à unban est introuvable.")
 
   let reason = args.slice(1).join(" ")
   if(!reason) reason = "Aucune raison donnée"
   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Vérifier mes permissions")
 
    try{
        message.guild.unban(unbanMember, {reason: reason})
        message.channel.send(`${unbanMember} à été débanni du serveur`)
    } catch(e) {
        console.log(e.message)
    }
 
    let embed = new Discord.RichEmbed()
    .setColor(colours.green_dark)
    .setAuthor(`${message.guild.name} LOG`, message.guild.iconURL)
    .addField("**STAFF** :", "Débanni")
    .addField("Utilisateur ayant été débanni :", `${unbanMember.username} (${unbanMember.id})`)
    .addField("Utilisateur ayant débanni :", message.author.username)
    .addField("Raison :", reason)
    .setTimestamp()
 
    let lChannel = message.guild.channels.find(c => c.name === "logs")
    lChannel.send(embed)
}
 
module.exports.help = {
    name: "unban"
}