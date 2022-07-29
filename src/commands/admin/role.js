const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "role",
    aliases: [""],
    run: async (client, message, args, colorEM, prefixN) => {
        if (!message.member.permissions.has("MANAGE_ROLES"))
        return message.reply("**😕 - You do have permission to use this command**");
        if (!message.guild.me.permissions.has("MANAGE_ROLES"))
        return message.reply(
          "**😕 - I require `MANAGE ROLES` permission to change users roles.**"
        );
    
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    
        if(!args[0]) return message.reply("😕 **- You must mention someone to give a role**");
        if(!args[1]) return message.reply("😕 **- You must mention role.**");
    
        if(!user) return message.reply("🙄 **- i can't find this user please try again later**");
        if(!role) return message.reply("🙄 **- i can't find this role please try again later**");
    
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.reply("🙄 **- You can't give this user role because higher then yours or same role.**");
        if(message.member.roles.highest.position <= role.position) return message.reply("🙄 **- You can't give this role to this user.**")
    
        await user.roles.add(role.id).catch(err => console.log("Error - ", err))

        message.reply({embeds: [new MessageEmbed().setColor(colorEM).setDescription(`**✅ - Done Give ${role} To ${user}**`)]})
    },
};