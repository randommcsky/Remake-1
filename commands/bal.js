const fs = require("fs");
const Database = require("../user/database");
exports.run = (client, message, args) => {
  const mention = message.mentions.users.first() || message.author
  const db = new Database("./user/" + mention, "money");
  var data = db.get("money") || "0"
  message.channel.send(mention.tag + " has " + data + " cCoins")
}
exports.config = {
  aliases: ["balence"]
}