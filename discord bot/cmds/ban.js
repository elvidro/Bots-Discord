const Discord = require("discord.js");
const colours = require("../colours.json");
 
module.exports.run = async (bot, message, args) => {

    message.delete()
 
   let bannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!bannedUser) {
       return message.channel.send("**Aucun Résultat.**")
   }
   let banReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGE_MESSAGES")) {
       return message.channel.send("Vous n'avez pas les permissions !")
   }
   if(bannedUser.hasPermission("MANAGE_MESSAGES")) {
       return message.channel.send("Vous n'avez pas banni la personne.")
   }
   let banEmbed = new Discord.RichEmbed()
   .setDescription("**BAN STAFF**")
   .setColor(colours.red_light)
   .addField("Joueur Banni", `${bannedUser} (ID: ${bannedUser.id})`)
   .addField("Personne qui vous as banni", `${message.author} (ID: ${message.author.id})`)
   .addField("Canal", message.channel)
   .addField("Raison du Ban", banReason)
 
   let banChannel = message.guild.channels.find(`name`, "logs");
   if(!banChannel) {
       return message.channel.send("Le Canal 'logs' n'a pas été trouvé. Créez-le !")
   }
   message.guild.member(bannedUser).ban(banReason)
   banChannel.send(banEmbed)
}
 
module.exports.help = {
    name: "ban"
}