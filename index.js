var http = require('http');

http.createServer(function (req, res) {
  res.write("I'm alive");
  res.end();
}).listen(8080);



const Discord = require("discord.js"),
      client = new Discord.Client(),
      fs = require("fs");
const canvas = require("discord-canvas");
//Command Handler
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

const Database = require("./user/database");
//Invite create log start

//Invite create log end
fs.readdir("./commands/", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        console.log("Successfully loaded " + file)
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    });
});

client.on("message", message => {
  if (message.channel.id === '811755148027756613') {
     if (message.content === '!verify') {
       return
     }     
    message.delete()
}
})

client.on("guildMemberAdd", async member => {
  let Channel = "811755148157386782"
  if (!Channel) return;
  let Message =  `Welcome To The Server!`;
  
  if (member.user.username.length > 25) member.user.username = member.user.username.slice(0, 25) + "...";
  if (member.guild.name.length > 15) member.guild.name = member.guild.name.slice(0, 15) + "...";
  
  let Msg = Message.toLowerCase().replace("CookieMC", member.guild.name).replace("<membername>", member.user.username).replace("<membermention>", `<@${member.user.id}>`);
  let Welcomed = new canvas.Welcome();
  let Image = await Welcomed
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setGuildName("CookieMC")
  .setAvatar(member.user.displayAvatarURL({ dynamic: true, format: "png" }))
  .setMemberCount(member.guild.memberCount)
  .setBackground("https://images.wallpaperscraft.com/image/landscape_art_road_127350_1280x720.jpg")
  .toAttachment();
  
  let Attachment = new Discord.MessageAttachment(Image.toBuffer(), "Welcome.png");
  return client.channels.cache.get(Channel).send(Msg, Attachment);
});
    //Events "handler"
    fs.readdir('./events/', (err, files) => {
        if (err) console.log(err);
        files.forEach(file => {
            let eventFunc = require(`./events/${file}`);
            console.log("Successfully loaded " + file)
            let eventName = file.split(".")[0];
            client.on(eventName, (...args) => eventFunc.run(client, ...args));
        });
});

client.on("ready", () => console.log("Online!"));
client.login("ODE0NjUzNDIxNTg3OTIyOTc1.YDg_Hw.51AZuiDM1BfvMfBKRwlXDdAG6nc")