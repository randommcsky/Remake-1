const fs = require("fs");
const Math = require("mathjs");
const Database = require("../user/database");
exports.run = (client, message, args) => {
  const db = new Database("./user/" + message.author.id, "money");
  let user = message.mentions.members.first() 
  const aa = new Database("./user/" + user.id, "money");
  let member = db.get("money") 
  if(!user){
    return message.channel.send("Please remember to mention someone")
  }

if (!args[1]) {
      return message.channel.send("Specify an amount to pay")
  }
if (args[1] === "0") {
      return message.channel.send("You can't pay 0")
  }

if (user.id === message.author.id) {
  return message.channel.send("You can't pay yourself")
}
if (message.content.includes('-')) { 
      return message.channel.send("You can't pay negetive")
  }

if (member < args[1]) {
      return message.channel.send("You don't have that much money")
  }
var me2;
me2 = (member -= args[1])
message.channel.send(`You have payed ${user.user.username} ${args[1]} cCoins`)
  aa.add(`money`, args[1])
  db.set(`money`, me2)
}

exports.config = {
  aliases: ["pay"]
}