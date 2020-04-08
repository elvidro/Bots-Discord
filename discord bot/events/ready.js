const Discord = require("discord.js")
 
module.exports = bot => {
    console.log(`Pasadena BOT: Online`);
 
    let statuses = [
        "Pasadena Vibes"
    ]
 
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "PLAYING"})
    }, 5000)
}

