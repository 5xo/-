const { MessageEmbed } = require('discord.js');



module.exports = {
  name: "unlock",
  run: async (client, message, args, colorEM, prefixN) => {
    let Permssion = new MessageEmbed().setColor("#FF0000").setDescription("**🙄 | You don't have `'MANAGE_CHANNELS'` Permssion**")
    if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({embeds: [Permssion]});

    message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: true
    });
    const embed = new MessageEmbed()
    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.avatarURL({dynamic: true})}`})
    .setColor(colorEM)
    .setDescription(`> ✅ **This Channel Has unLocked**`)
    .setFooter({ text: `${message.guild.name}`, iconURL: `${message.guild.iconURL({dynamic: true})}` });
    message.reply({ embeds: [embed] })
  }
}