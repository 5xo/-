const { MessageEmbed } = require("discord.js");
const { ownersID } = require("../../configs/config.json");

module.exports = {
  name: "setactivitie",
  aliases: [""],
  run: async (client, message, args, colorEM, prefixN) => {
    args = message.content.split(" ").slice(1).join(" ");

    if (!ownersID.includes(message.author.id)) return message.reply("**🙄 - You can't use this command.**");
    if (args.length > 40) return message.reply("**🙄 - This name it's so long max 40**");

    await client.user.setActivity(args)

    let embed = new MessageEmbed()
      .setColor(colorEM)
      .setTitle("Bot Settings:")
      .setDescription(`Done change bot activitie to ${args}`)
      .setFooter({
        text: `Requested By: ${message.author.tag}`,
        iconURL: `${message.author.avatarURL({ dynamic: true })}`,
      });
    message.reply({ embeds: [embed] });
  },
};
