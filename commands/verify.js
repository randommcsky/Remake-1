const fs = require("fs");
const Database = require("../user/database");
exports.run = (client, message, args) => {
  const db = new Database("./user/" + message.author.id, "money");
  db.set(`money`, "0")
  const role = message.guild.roles.cache.find(r => r.name == "Member");
  if (message.channel.id === '811755148027756613') {
    message.delete()
    message.member.roles.add(role)
  fs.mkdir(`./user/user/${message.author.id}`, function(err) {
    if (err) {
      console.log(err)
  } else {
    console.log(`New user named @ ${message.author.username} successfully created.`)
  }
})
  }
}
exports.config = {
  aliases: ["verify"]
}