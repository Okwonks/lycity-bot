var Botkit = require('botkit');

var controller = Botkit.twilioipmbot();
var bot = controller.spawn({
  TWILIO_IPM_SERVICE_SID: process.env.TWILIO_IPM_SERVICE_SID,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY: process.env.TWILIO_API_KEY,
  TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  identity: process.env.BOT_NAME,
  autojoin: true
});
controller.hears(['.*'], 'message_received', function(bot, message) {
  bot.reply(message, message.watsonData.output.text.join('\n'));
});

module.exports.controller = controller;
module.exports.bot = bot;
