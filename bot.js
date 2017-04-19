var Discordie;
try { Discordie = require("../"); } catch(e) {}
try { Discordie = require("discordie"); } catch(e) {}

const Events = Discordie.Events;
const bot = new Discordie({autoReconnect: true});

bot.connect({
  token: 'YOUR TOKEN HERE'
});

bot.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log('Connected as: ' + bot.User.username);
});

bot.Dispatcher.on(Events.MESSAGE_CREATE, e => {
  if (e.message.channel.isPrivate) {
      console.log(`(PM) ${e.message.author.name}: ${e.message.content}`);
  } else {
      console.log(`(${e.message.guild.name}:${e.message.channel.name}) ${e.message.author.username}: ${e.message.content}`);
  }
  
  if(e.message.content == 'PING'){
    e.message.channel.sendMessage('PONG');
  }

  /*var users = e.message.mentions;
  var user = client.Users.find(u => u.username == “<username>”);
  e.message.channel.sendMessage(user.mention + ", user mentioned.");
  if(find(u => users == “<username>”);){
    e.message.channel.sendMessage('what do you want ' + user.monetion + '?');
  }*/

  if (e.message.content == '[mentionme]') {
    var user = e.message.author;
    e.message.channel.sendMessage(user.nickMention + ", example mention");
  }
});
