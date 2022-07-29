const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "move",
    aliases: [""],
    run: async (client, message, args, colorEM, prefixN) => {
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("**🙄 - You Don't have a permission to use this command.**");
  
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      
        if(!member) return message.reply("**🙄 - Please mentions a member or press member id.**");
        if(!member.voice.channel) return message.reply("**❌ - The member you mentioned is not a voice channel.**");
      
        if(!message.member.voice.channel) return message.reply("**😕 - Please join voice channel to move this member**");
      console.log(message.member.voice.channel.id)
        member.voice.setChannel(message.member.voice.channel.id);
        let embed = new MessageEmbed()
            .setColor(colorEM)
            .setDescription(`**✅ - Done move ${member} to your voice channel**`)
            message.reply({embeds: [embed]})
    },
};