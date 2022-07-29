const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: [""],
    run: async (client, message, args, colorEM, prefixN) => {
        let pingBot = client.ws.ping;
        let good;
        if(pingBot > 200) good = "Bad";
        if(pingBot < 200) good = "Not Bad";
        if(pingBot < 50) good = "Very Good";
        const m = await message.reply({content: "PONG!🏓"}).then( async(sha) => { sha.delete({timeout: 5000}); });
        let embed = new MessageEmbed()
            .setColor(colorEM)
            .setTitle('Time Taken:')
            .setDescription(`⏱️ **WS:** ${pingBot}ms 📶 ${good}\n⌛ **MSG:** ${Date.now() - message.createdTimestamp}ms.`)
            .setFooter({text:` Requested By: ${message.author.tag}`, iconURL: `${message.author.avatarURL({dynamic: true})}`});
            message.reply({embeds: [embed]})
    },
};