const Discord = require("discord.js");
const colours = require ("../colours.json")

module.exports.run = async ( bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission")
    if(!args[0]) return message.channel.send ("Mentionnez le nombre de messages à supprimer.")
    
    message.channel.bulkDelete(args[0]).then(()=> {

        message.channel.send(`Vous avez supprimer ***${args[0]}*** messages.`)
    })

}

module.exports.help = {
    name: "clear"
}