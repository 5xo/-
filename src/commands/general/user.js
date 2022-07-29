const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'user',
    aliases: ['u'],
    description: 'Shows the info user',
    run: async (client, message, args, colorEM, prefixN) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!user) return message.reply({content:":face_with_monocle: - I can't find this member"})


        let roles = user.roles.cache.map(role => role.toString()).join(",");
        let highestRole = user.roles.highest

        if (roles.length > 50) {
            roles = "There is so much roles to show."
        }
        let bot = `${user.user.bot ? 'Yes' : 'No'}`
        let nick_name = `${user.displayName ? user.displayName : 'yok'}`
        const embed = new MessageEmbed()
            .setColor(colorEM)
            .setAuthor({ name: `${nick_name}`, iconURL: `${user.user.avatarURL({dynamic: true})}` })
            .addFields(
                { name: "Joined Discord :", value: `**<t:${Math.floor(user.user.createdAt/1000.0)}:R>**` },
                { name: "Joined Server :", value: `**<t:${Math.floor(user.joinedAt/1000.0)}:R>**` }
                )
            .setThumbnail(user.user.avatarURL({ dynamic: true, size:512 }))
            .setTimestamp()
            .setFooter({ text: `Requested By: ${message.author.tag}`, iconURL: `${message.author.avatarURL({dynamic: true})}`});
        message.reply({ embeds: [embed] })

    }
}


