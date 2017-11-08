var Botkit = require('botkit');
var express = require('express');

var router = express.Router();
var Request = require('request');

var controller = Botkit.facebookbot({
  access_token: process.env.FB_ACCESS_TOKEN,
  verify_token: process.env.FB_VERIFY_TOKEN
});

var reply_message = {
  sender_action: "typing_on"
}

var reply_stop = {
  sender_action: "typing_off"
}

var bot = controller.spawn();

controller.hears('(.*)', 'message_received', function(bot, message) {
  console.log(message.watsonData.input.text);
  userInput = message.watsonData.input.text; // targeting the users input
  bot.reply(message, message.watsonData.output.text.join('\n'));
  botReply = message.watsonData.output.text[0]; // targets the specific watson reply
  console.log(botReply);
  if(botReply == 'Okay. Working on it' || botReply == 'Give me a moment.') {
    console.log("Work on api call");
    useGeniusApi(userInput);
    console.log(useGeniusApi);
  }
});

function handleGeniusResponse(userInput) {
   let response;
   if (userInput.text) {
    //  response = 
   }
}

function useGeniusApi(userInput) {
  // This will help in making calls to genius API
  Request({
    "method": "GET",
    "uri": "https://api.genius.com/search?q=" + userInput,
    "qs": {"Authorization": process.env.GENIUS_API_KEY}
  }, (error, res, body) => {
    console.log(body);
    if(!error && res.statusCode == 200) {
      console.log('Working!');
    } else {
      console.error("Unable to send message:" + error);
    }
  });
}

module.exports.controller = controller;
module.exports.bot = bot;
