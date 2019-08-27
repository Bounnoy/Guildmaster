import Discord from 'discord.js';
import Config from '../config.json';
import { MongoClient } from 'mongodb';

const bot = new Discord.Client();
let DB;

function connectToMongoDB() {
  const dbType = Config.database.type;
  const url = Config.database[dbType].connectionURL;

  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, db) => {
      if (error) {
        reject(error);
      } else {
        DB = db;
        resolve();
      }
    });
  });
}

// This checks a message to see if a command is being triggered.
// Return a dictionary with 2 fields:
// - command (String)
// - arguments (array of Strings)
function parseCommand(message) {
  const regexp = new RegExp(`^[${Config.allowedCommandPrefixes.join('')}](\\w+)\\s*((?:\\s*[\\w-]+)*)`, 'i');
  const match = message.match(regexp);
  let parsedCommand = null;
  if (match !== null) {
    parsedCommand = {
      command: match[1],
      arguments: match[2].replace(/ +/g, ' ').split(' ')
    };
  }
  return parsedCommand;
}

const commands = {
  ping() {
    return new Discord.RichEmbed()
      .setColor(15844367)
      .addField(`Ping`, `Pong!`);
  }
};

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  const mes = parseCommand(msg.content);

  if (mes !== null) {

    if (typeof commands[mes.command] === 'function') {

      const result = commands[mes.command](...mes.arguments);

      Promise.resolve(result).then((reply) => {

        function sendEmbed (embed) {
          msg.channel
            .send(embed)
            .catch((error) => {
              console.error(error);
            });
        }

        if (Array.isArray(reply)) {
          reply.forEach(sendEmbed);
        } else {
          sendEmbed(reply);
        }

      }).catch((error) => {
        console.error(error);
      });
    }
  }
});

Promise
  .all([
    connectToMongoDB()
  ])
  .then(() => {
    bot.login(Config.auth.discord.token);
  })
  .catch((error) => {
    console.error(error);
  });
