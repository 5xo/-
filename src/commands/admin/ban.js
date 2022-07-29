const { MessageEmbed } = require('discord.js');
const db = require('pro.db');


module.exports = {
    name: "ban",
    run: async (client, message, args, colorEM, prefixN) => {
  let m = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let em2 = new MessageEmbed().setColor(colorEM).setDescription(`${m} **banned from the server!** ✈️`)
  
  let Permssion = new MessageEmbed().setColor("#FF0000").setDescription("**🙄 | You don't have `'BAN_MEMBERS'` Permssion**")
  if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply({ embeds: [Permssion] }).then(m => setTimeout(()=>m.delete(),5000));

  if (!m) return message.reply({content:'🤔 - **Mention the person who will be banned.**'})
  if (m.id === client.user.id) return message.reply({content:"😕 - **I can't ban myself**"})
  if (m.id === message.author.id) return message.reply({content:"😕 - **You can't ban yourself**"})
  if (message.member.roles.highest.position <= m.roles.highest.position) return message.reply({content:"😕 - **i can't ban this member because my role**"})
  try {
    await m.ban({ reason: `By: ${message.author.tag} | Reason: ${args.slice(1).join(' ') ? args.slice(1).join(' ') : 'I can\'t find a reason'}` })
      .then(message.reply({
        embeds:[em2]
      }))
    db.add(`Ban.${m.id}`, 1);
    await db.push(`cvBan.${m.id}`, `official: <@${message.author.id}>   |   Reason: \`${args.slice(1).join(' ') ? args.slice(1).join(' ') : 'I can\'t find a reason.'}\``)
  } catch (error) {
    message.reply({content:'something is wrong.'})
    console.log(error)
  }
}
}