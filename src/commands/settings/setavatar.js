const { MessageEmbed } = require("discord.js");
const { ownersID } = require("../../configs/config.json");

module.exports = {
  name: "setavatar",
  aliases: [""],
  run: async (client, message, args, colorEM, prefixN) => {
    args = message.content.split(" ").slice(1).join(" ");

    if (!ownersID.includes(message.author.id))
      return message.reply("**🙄 - You can't use this command.**");
    if (!args.startsWith("https//"))
      return message.reply("**🙄 - This is not a URL**");

    await client.user.setAvatar(args);

    let embed = new MessageEmbed()
      .setColor(colorEM)
      .setTitle("Bot Settings:")
      .setThumbnail(args)
      .setDescription(`Done change bot avatar`)
      .setFooter({
        text: `Requested By: ${message.author.tag}`,
        iconURL: `${message.author.avatarURL({ dynamic: true })}`,
      });
    message.reply({ embeds: [embed] });
  },
};
