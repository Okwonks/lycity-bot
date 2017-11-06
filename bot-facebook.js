var Botkit = require('botkit');

var controller = Botkit.facebookbot({
  access_token: process.env.FB_ACCESS_TOKEN,
  verify_token: process.env.FB_VERIFY_TOKEN
});

var reply_message = {
  sender_action: "typing_on"
}

var bot = controller.spawn();
controller.hears('(.*)', 'message_received', function(bot, message) {
  bot.reply(message, reply_message, message.watsonData.output.text.join('\n'));
});

module.exports.controller = controller;
module.exports.bot = bot;
