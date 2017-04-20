var Discordie;
try { Discordie = require("../"); } catch(e) {}
try { Discordie = require("discordie"); } catch(e) {}

try {
	var Auth = require("./Auth.json");
} catch (e){
	console.log("Please create an auth.json like Auth.json.example with a bot token");
	process.exit();
}

const Events = Discordie.Events;
const bot = new Discordie({autoReconnect: true});

bot.connect({
  token: Auth.bot_token
});

bot.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log("Serving in " + bot.Guilds.length + " servers");
  console.log('Connected as: ' + bot.User.username);
  bot.User.setGame("Five-Multiplayer | " + bot.Guilds.length +" Servers");
});

bot.Dispatcher.on(Events.MESSAGE_CREATE, e => {
  if (e.message.channel.isPrivate) {
      console.log(`(PM) ${e.message.author.username}: ${e.message.content}`);
  } else {
      console.log(`(${e.message.guild.name}:${e.message.channel.name}) ${e.message.author.username}: ${e.message.content}`);
  }

  if(e.message.content == 'ping') {
    e.message.channel.sendMessage('pong');
  }

  if (bot.User.isMentioned(e.message)) {
		  var user = e.message.author;
      e.message.channel.sendMessage('what do you want ' + user.nickMention + '?');
  }

  if (e.message.content == 'a!help') {
    var user = e.message.author;
    e.message.channel.sendMessage(user.nickMention + ", You need help?");
  }
});
/*
bot.Disconnected({
	console.log("Disconnected!");
	process.exit(1);
});
*/
