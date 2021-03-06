const Discord = require("discord.js");
const colours = require("../colours.json")

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("Vous n'avez pas la permissions pour effectuer cette commande !")
    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Veuillez m'ajoutez ces permissions `MANAGE_ROLES` + `ADMINISTRATOR` pour utilisez cette commande.")

    let mutee = message.guild.member(message.mentions.users.first())
    if(!mutee) return message.channel.send("Veuillez mentionner la personne à mute.")

    let reason = args.slice(1).join(" ");
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
    mutee.addRole(muterole.id).then(() => {
        message.delete()

        let MuteEmbed = new Discord.RichEmbed()
        .setDescription(`MUTED - Vous avez été mute dans le serveur \`${message.guild.name}\` avec comme raison : **${reason}**`)
        .setColor(colours.orange)

        mutee.send(MuteEmbed).catch(err => console.log(err))
        message.channel.send(`${mutee.user.tag} à été mute.`)
        })

    let MuteLogEmbed = new Discord.RichEmbed()
    .setColor(colours.red_dark)
    .setAuthor(`${message.guild.name} LOG`, message.guild.iconURL)
    .addField("STAFF :", "**MUTE**")
    .addField("Utilisateur ayant été mute", mutee.user.username)
    .addField("Utilisateur ayant mute", message.author.tag)
    .addField("Raison", reason)

    let lChannel = message.guild.channels.find(c => c.name === "logs")
    lChannel.send(MuteLogEmbed)
}

module.exports.help = {
    name: "mute"
}
