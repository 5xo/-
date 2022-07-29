const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "help",
    aliases: [""],
    run: async (client, message, args, colorEM, prefixN) => {
        let embed = new MessageEmbed()
            .setColor(colorEM)
            .setAuthor({name:'Help List:', iconURL: client.user.avatarURL()})
            .setThumbnail(client.user.avatarURL({size:512}))
            .addFields(
                { name: "Genral Command:", value: `${prefixN}ping, ${prefixN}avatar, ${prefixN}help, ${prefixN}user, ${prefixN}sever` },
                { name: "Admin Command:", value: `${prefixN}ban, ${prefixN}unban, ${prefixN}lock, ${prefixN}unlock, ${prefixN}role, ${prefixN}move, ${prefixN}clear` },
                { name: "Developers Command:", value: `${prefixN}setname, ${prefixN}setavatar, ${prefixN}setactivitie` }
            )
            .setFooter({text:`Requested By: ${message.author.tag}`, iconURL: `${message.author.avatarURL({dynamic: true})}`});
            message.author.send({embeds: [embed]}).catch(err => console.log("Error - ", err))
    },
};