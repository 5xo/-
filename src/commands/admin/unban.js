const { MessageEmbed } = require('discord.js');

const db = require('pro.db');

module.exports = {
    name: "unban",
    run: async (client, message, args, colorEM, prefixN) => {
    let m = await client.users.fetch(args[0]) || message.guild.members.cache.get(args[0]) || message.member
    let em2 = new MessageEmbed().setColor(colorEM).setDescription(`${m} **unbanned!** 🛬`)
    let Permssion = new MessageEmbed().setColor("#FF0000").setDescription("**🙄 | You don't have `'MANAGE_CHANNELS'` Permssion**")
    if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({embeds: [Permssion]});
    if (!m) return message.reply({content:'user?'}).then(m => m.delete({ timeout: 5000 }))
    try {
        await message.guild.members.unban(m.id, { reason: `By: ${message.author.tag} | Reason: ${args.slice(1).join(' ') ? args.slice(1).join(' ') : 'I can\'t find a reason'}` }).catch()
        message.reply({ embeds: [em2] })
        await db.add(`other.${m.id}`, 1)

    } catch(error) {
        console.log(error)

    }
}

};