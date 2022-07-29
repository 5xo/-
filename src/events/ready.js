const { mainprefix } = require("../configs/config.json");
const db = require("pro.db");
require("colors");

module.exports = async (client) => {
  console.log(`[CLIENT] ${client.user.username} is Online!`.green);
  let activitie = await db.get("activitie");
  if (!activitie) activitie = `${mainprefix}help`
  client.user.setPresence({
    activities: [{ name: activitie, type: "PLAYING" }],
  });
};
