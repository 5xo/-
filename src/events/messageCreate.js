const Timeout = new Set();
const { mainprefix, COLOR } = require('../configs/config.json')
const humanizeDuration = require("humanize-duration");

module.exports = async (client , message) => {
    let prefix = mainprefix;
    let colorEM = COLOR;
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.members.fetch(message.member.id);
    if (!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    const command = client.commands.get(cmd) || client.commands.find((x) => x.aliases && x.aliases.includes(cmd));
    if (command) {
        if (command.timeout) {
            if (Timeout.has(`${message.author.id}${command.name}`)) {
                return message.reply({ content: `> ⏱️ | Please wait more **${humanizeDuration(command.timeout, { round: true })}** before using **\`${command.name}\`** command again!` })
            } else {
                command.run(client, message, args);
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        } else {
            command.run(client, message, args, colorEM, prefix)
        }
    }
}