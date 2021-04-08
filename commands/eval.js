const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config.json');
const auth = require('../auth.json');

module.exports = {
  name: 'eval',
  description: 'Evaluates JS code',
  execute(message, args) {
    function clean(text) {
      if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
        return text;
    }
    const footer = (`Command executed by ${message.author.username}#${message.author.discriminator} | Bot by xMdb#7897`);
    const noperms = new Discord.MessageEmbed().setColor('#FF0000').setDescription(`${message.author}, you do not have the correct permissions to use this command.`).setTimestamp().setFooter("Bot by xMdb#7897");
    if (message.author.id !== config.ownerID) {
      message.channel.send(noperms);
      return
    }
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      if (evaled.includes(bot.token)) {
        evaled = evaled.replace(bot.token, "undefined");

        if (evaled.includes(bot.token)) {
          evaled = evaled.replace(bot.token, "undefined");
        }
      }

      if (evaled.includes(auth.token)) {
        evaled = evaled.replace(auth.token, "undefined");

        if (evaled.includes(auth.token)) {
          evaled = evaled.replace(auth.token, "undefined");
        }
      }

      if (evaled.includes('auth.token')) {
        evaled = evaled.replace('auth.token', "undefined");

        if (evaled.includes('auth.token')) {
          evaled = evaled.replace('auth.token', "undefined");
        }
      }

      const evalEmbed = new Discord.MessageEmbed().setTitle('Evaluate - Completed').setColor('#3A783F').setDescription(`\`\`\`${clean(evaled)}\`\`\``).setTimestamp().setFooter(footer);
      message.channel.send(evalEmbed);
    } finally { process.on('unhandledRejection', error => {
      console.error('Unhandled promise rejection:', error);
      message.channel.send(`${message.author}, an error has occured.`);
      const errorEmbed = new Discord.MessageEmbed().setTitle('Evaluate - Error').setColor('#ff0000').setDescription(`\`\`\`${clean(error)}\`\`\``).setTimestamp().setFooter(footer);
      message.channel.send(errorEmbed);
    });
      message.channel.send(`${message.author}, an error has occured.`);
      const errorEmbed = new Discord.MessageEmbed().setTitle('Evaluate - Error').setColor('#ff0000').setDescription(`\`\`\`${clean(error)}\`\`\``).setTimestamp().setFooter(footer);
      message.channel.send(errorEmbed);
    }
  }
}