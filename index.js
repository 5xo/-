const { Client, Collection, Intents } = require("discord.js");
const client = new Client(clientSettingsObject());
const { token } = require("./src/configs/config.json");

module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./src/configs/config.json");

["Commandshandler", "eventshandler"].forEach((handler) => {
  require(`./src/util/${handler}`)(client);
});

function clientSettingsObject() {
  return {
    shards: "auto",
    allowedMentions: {
      parse: [],
      repliedUser: false,
    },
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: 32767,
  };
}
// process.on("unhandledRejection", (err) => {
//   console.log(`unhandled promise rejection: ${err.message}`);
// });

// client.on("messageCreate", (message) => {

// });

client.login(token);
