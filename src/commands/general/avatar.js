const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: [''],
    run: async (client, message, args, colorEM, prefixN) => {
        let server = new MessageEmbed()
            .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL()})
            .setColor(colorEM)
            .addField(":link: PNG", `[\`LINK\`](${message.guild.iconURL({format: "png", dynamic: true, size: 4096, })})`, true)
            .addField(":link: JPEG", `[\`LINK\`](${message.guild.iconURL({format: "jpg", dynamic: true, size: 4096, })})`, true)
            .addField(":link: WEBP", `[\`LINK\`](${message.guild.iconURL({format: "webp", dynamic: true, size: 4096, })})`, true)
            .setImage(message.guild.iconURL({dynamic: true, size: 4096 }))
            .setFooter({ text: `Requested By: ${message.author.tag}`, iconURL: `${message.author.avatarURL({dynamic: true})}` });
        const server_row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setStyle('LINK')
                .setLabel('Server URL')
                .setEmoji(`📎`)
                .setURL(message.guild.iconURL({ dynamic: true, size: 4096,})))
        if (args[0] === "server") return message.reply({ embeds: [server], components: [server_row] });
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!member) return message.channel.send(":face_with_monocle: - I can't find this member")
        let embed = new MessageEmbed()
            .setTitle(`${member.user.username} Avatar`)
            .setColor(colorEM)
            .addField(":link: PNG", `[\`LINK\`](${member.user.displayAvatarURL({format: "png", dynamic: true, size: 4096, })})`, true)
            .addField(":link: JPEG", `[\`LINK\`](${member.user.displayAvatarURL({format: "jpg", dynamic: true, size: 4096, })})`, true)
            .addField(":link: WEBP", `[\`LINK\`](${member.user.displayAvatarURL({format: "webp", dynamic: true, size: 4096, })})`, true)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setFooter({ text: `Requested By: ${message.author.tag}`, iconURL: `${message.author.avatarURL({dynamic: true})}` });
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setStyle('LINK')
                .setLabel('User Avatar URL')
                .setURL(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            )
        message.reply({ embeds: [embed], components: [row] });
    }
}