const { MessageEmbed } = require("discord.js");
const { ownersID } = require("../../configs/config.json");

module.exports = {
  name: "setname",
  aliases: [""],
  run: async (client, message, args, colorEM, prefixN) => {
    args = message.content.split(" ").slice(1).join(" ");

    if (!ownersID.includes(message.author.id))
      return message.reply("**🙄 - You can't use this command.**");
    if (args.length > 15)
      return message.reply("**🙄 - This name it's so long max 3**");

    await client.user.setUsername(args);

    let embed = new MessageEmbed()
      .setColor(colorEM)
      .setTitle("Bot Settings:")
      .setDescription(`Done change bot name to ${args}`)
      .setFooter({
        text: `Requested By: ${message.author.tag}`,
        iconURL: `${message.author.avatarURL({ dynamic: true })}`,
      });
    message.reply({ embeds: [embed] });
  },
};
