var irc = require('irc');

var config = require('./config');

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
        bot.say(config.channel, "STACHO!!");
    }

});

// gimme a cat
bot.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);

    var called = false;

    if (!called && message.match(/gimme a cat/i) != null) {
    	commands.cat(to);
        called = true;
    }

    if (!called && message.match(/meow/i) != null) {
    	commands.emoji(to);
        called = true;
    }

    if (!called && message.match(/^!pokemon|^!pokeman|^!pokeymans/i) != null) {
    	commands.pokemon(to, message);
        called = true;
    }

    // if (message.toLowerCase() == "!chans") {
    // 	console.log(bot.chans);
    // }

});

bot.addListener('error', function(message) {
    console.log('error: ', message);
});

// bot.addListener('+mode', function(channel, by, mode, argument, message) {
// 	console.log(channel, by, mode, argument, message);

// 	bot.whois(config.config['nick'], function(info) {
// 		console.log(info);

// 		if (tools.isOp(info)) {
// 			console.log('I am op');
// 		}
// 	});
// });

// bot.addListener('-mode', function(channel, by, mode, argument, message) {
// 	console.log(channel, by, mode, argument, message);

// 	bot.whois(config.config['nick'], function(info) {
// 		console.log(info);

// 		if (tools.isOp(info)) {
// 			// bot.say(config.channel, 'I am op');
// 			console.log('I am op');
// 		} else {
// 			console.log('I am not op');
// 		}
// 	});
// });
