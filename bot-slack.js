var Botkit = require('botkit');

var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: process.env.SLACK_TOKEN
});

controller.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
  bot.reply(message, message.watsonData.output.text.join('\n'));
});

module.exports.controller = controller;
module.exports.bot = bot;
