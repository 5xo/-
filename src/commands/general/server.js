const {MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');


module.exports = {
    name: "server",
    aliases: ["s"],
    run: async (client, message, args, colorEM, prefixN) => {
        let boosts = message.guild.premiumSubscriptionCount;
        var boostlevel = 0;
        if (boosts >= 2) boostlevel = "1";
        if (boosts >= 7) boostlevel = "2";
        if (boosts >= 14) boostlevel = "3 / ∞";
        const owner = await message.guild.fetchOwner();
        const channels = message.guild.channels.cache;
        const presenceCache = message.guild.presences.cache;
        const online = presenceCache.filter((persence) => persence.status != "offline").size;
        let embed = new MessageEmbed()
            .setColor(colorEM)
            .setThumbnail(message.guild.iconURL({dynamic: true, size:512}))
            .setTimestamp()
            .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
            .addFields(
                {
                  name: "🆔 Server ID:",
                  value: `${message.guildId}`,
                  inline: true,
                },
                {
                    name:"📅 Created On:",
                    value:`**<t:${Math.floor(message.guild.createdTimestamp/1000.0)}:R>**`,
                    inline:true
                },
                {
                    name:"👑 Owned by:",
                    value:`${owner}`,
                    inline:true
                },
                {
                    name:`👥 Members (${message.guild.memberCount})`,
                    value:`**${online}** Online\n**${message.guild.premiumSubscriptionCount}** Boosts ✨`,
                    inline:true
                },
                {
                    name:`💬 Channels (${message.guild.channels.cache.size})`,
                    value:`**${channels.filter(channel => channel.type == 'GUILD_TEXT').size}** Text | **${channels.filter(channel => channel.type == 'GUILD_VOICE').size}** Voice`,
                    inline:true
                },
                {
                    name:"✨ More",
                    value:`Roles: **${message.guild.roles.cache.size}**\nEmojis: **${message.guild.emojis.cache.size}**\nBoost level:  **${boostlevel}**`,
                    inline:true
                },
            )
            .setImage()
            .setFooter({ text: `Requested By: ${message.author.tag}`, iconURL: `${message.author.avatarURL({dynamic: true})}`});
        message.reply({ embeds: [embed] })
    },
};