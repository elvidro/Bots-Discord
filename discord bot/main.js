const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const config = require("./config.json")
const colours = require ("./colours.json")

require("./util/eventHandler")(bot)

bot.commands = new Discord.Collection();

bot.login(config.token);

fs.readdir("./cmds/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Aucune commande trouvée")
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${f} Ok !`);
        bot.commands.set(props.help.name, props)
    })
})

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = bot.commands.get(command.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, args)

});

bot.on('guildMemberAdd', member => {

    let newEmbed = new Discord.RichEmbed()
    .setDescription(member.user.username  +  " **Bienvenu sur Pasadena Vibes !** ")
    .setFooter('Nous somme désormais ' + member.guild.memberCount)
    .setColor('#F5CBA7')
    member.guild.channels.get("694329343312396378").sendMessage(newEmbed)
})
