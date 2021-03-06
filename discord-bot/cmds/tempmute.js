const Discord = require("discord.js");
const colours = require("../colours.json")
const ms = require("ms")
 
module.exports.run = async (bot, message, args) => {
 
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("Vous n'avez pas la permissions pour effectuer cette commande !")
    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Veuillez m'ajoutez ces permissions `MANAGE_ROLES` + `ADMINISTRATOR` pour utilisez cette commande.")
 
    let mutee = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!mutee) return message.channel.send("Veuillez mentionner la personne à mute.")
 
    let reason = args.slice(2).join(" ");
    if(!reason) reason = "Aucune raison donnée"
 
    let muterole = message.guild.roles.find(r => r.name === "Muted")
    if(!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: "Muted",
                color: colours.red_dark,
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    "READ_MESSAGES": true,
                    "SEND_MESSAGES": false,
                    "ADD_REACTIONS": false
                })
            })
        } catch(e) {
            console.log(e.stack);
        }
    }
 
    let muteTime = args[1];
    if(!muteTime) return message.channel.send("Spécifier la durée.")
 
    await mutee.addRole(muterole.id).then(() => {
        message.delete()
 
        let MuteEmbed = new Discord.RichEmbed()
        .setDescription(`TEMPMUTED - Vous avez été tempmute dans le serveur \`${message.guild.name}\` avec comme raison : **${reason}**`)
        .setColor(colours.orange)
   
        mutee.send(MuteEmbed).catch(err => console.log(err))
        message.channel.send(`${mutee.user.tag} à été mute.`)
        })
 
    let MuteLogEmbed = new Discord.RichEmbed()
    .setColor(colours.orange)
    .setAuthor(`${message.guild.name} LOG`, message.guild.iconURL)
    .addField("STAFF :", "**TEMPMUTE**")
    .addField("Utilisateur ayant été tempmute", mutee.user.username)
    .addField("Utilisateur ayant tempmute", message.author.tag)
    .addField("Raison", reason)
 
    let lChannel = message.guild.channels.find(c => c.name === "logs")
    lChannel.send(MuteLogEmbed)
 
    setTimeout(() => {
        mutee.removeRole(muterole.id)
        message.channel.send(`${mutee.user.tag} n'est plus mute.`)
        let TempMuteEmbed = new Discord.RichEmbed()
        .setDescription(`UNMUTED - Vous avez été unmute dans le serveur \`${message.guild.name}\` avec comme raison : **${reason}**`)
        .setColor(colours.green_dark)
 
        mutee.send(TempMuteEmbed)
    }, ms(muteTime))
}
 
module.exports.help = {
    name: "tempmute"
}