# Guildmaster

A [Discord](https://discordapp.com) bot using [Discord.js](https://discord.js.org). This was a personal project of mine that I created for the many different games I've played to keep myself up-to-date with gaming news, events, and some other tools I've found helpful and other members of my guild(s) found helpful. I've had several people ask me about it so I decided to open source the project so others can benefit.


## Getting Started

These instructions assume you have some understanding of the terminal.
If you're on Windows, you may need to install [Cygwin](https://www.cygwin.com/) or something similar.

First, you'll want to clone the project and open the project directory.
```
git clone https://github.com/Bounnoy/Guildmaster.git

cd Guildmaster
```

Next, download and install [Node.js](https://nodejs.org) and [NPM](https://www.npmjs.com/).
Then, install the project's dependencies.
```
npm install
```

Rename **config-default.json** to **config.json** and edit the contents of the file with your own credentials.
See below for configuration options.

```
mv config-default.json config.json

vim config.json
```

Run the bot.
```
npm start
```

### Configuration

#### Command Prefixes
The default configuration allows the bot to respond to **!, +, $**. If you want to change the behavior, then edit the appropriate section in the **config.json** file.

#### Discord

In order for this app to run, you must first [create a bot](https://discordapp.com/developers/applications/) and obtain a token. In **config.json**, add your token:
```json
{
  "auth": {
    "discord": {
      "token": ""
    }
  }
}
```

#### Facebook

To pull news from Facebook pages, you must first [create an app](https://developers.facebook.com/) and obtain a client ID/secret. In **config.json**, add your client ID/secret:
```json
{
  "auth": {
    "facebook": {
      "clientID": "",
      "clientSecret": ""
    }
  }
}
```

#### Mongo Database

The app will store news into the database to save some API calls. Download and install [Mongo DB](https://www.mongodb.com/). The default configuration should work just fine, but if you do anything different you'll need to change it in the **config.json** file.
