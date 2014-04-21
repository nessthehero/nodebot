var irc = require('irc');

var config = require('./config');

var megahal = require('jsmegahal');

var hal = new megahal(4);

var bot = new irc.Client(config.config['server'], config.config['nick'], {
	autoConnect: false,
	floodProtection: true,
	floodProtectionDelay: 1000,
	stripColors: true,
	realName: 'nodebot by ian'
});

var commands = require('./commands').init(bot);

bot.connect(10, function() {

	bot.join(config.config['channel']);

	bot.whois(config.config['nick'], function(info) {
		console.log(info);
	});

});

bot.addListener('join', function (channel, nick, message) {

	if (nick.toLowerCase() === "sstacho") {
		bot.say(config.config['channel'], "STACHO!!");
	}

});

// gimme a cat
bot.addListener('message', function (from, to, message) {
	console.log(from + ' => ' + to + ': ' + message);

	var called = false;

	message += '.';

	var removeName = message.replace(/catbot/i, '');

	if (!called && message.match(/gimme a cat/i) !== null) {
		commands.cat(to);
		called = true;
	}

	if (!called && message.match(/meow/i) !== null) {
		commands.emoji(to);
		called = true;
	}

	if (!called && message.match(/^!pokemon|^!pokeman|^!pokeymans/i) !== null) {
		commands.pokemon(to, message);
		called = true;
	}

	if (!called && message.match(/catbot/i) !== null) {
		bot.say(config.config['channel'], hal.getReplyFromSentence(removeName));
		called = true;
	}

	hal.addMass(removeName);

});

bot.addListener('raw', function(message) {
	console.log('raw: ', message);
});

bot.addListener('error', function(message) {
	console.log('error: ', message);
});

// bot.addListener('+mode', function(channel, by, mode, argument, message) {
//  console.log(channel, by, mode, argument, message);

//  bot.whois(config.config['nick'], function(info) {
//      console.log(info);

//      if (tools.isOp(info)) {
//          console.log('I am op');
//      }
//  });
// });

// bot.addListener('-mode', function(channel, by, mode, argument, message) {
//  console.log(channel, by, mode, argument, message);

//  bot.whois(config.config['nick'], function(info) {
//      console.log(info);

//      if (tools.isOp(info)) {
//          // bot.say(config.channel, 'I am op');
//          console.log('I am op');
//      } else {
//          console.log('I am not op');
//      }
//  });
// });
