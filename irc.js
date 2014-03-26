var irc = require('irc');
var tools = require('tools');
var config = require('./config');

var bot = new irc.Client(config.server, config.nick, {
    autoConnect: false
});

bot.connect(10, function() {

	bot.join(config.channel);

	bot.whois(config.nick, function(info) {
		console.log(info);
	});

});

bot.addListener('join', function () {

});

// gimme a cat
bot.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);

    if (message.toLowerCase() == "gimme a cat") {
    	var num1 = tools.rint(100, 600);
    	var num2 = tools.rint(100, 600);
    	bot.say(to, "here you go: http://placekitten.com/" + num1 + "/" + num2);
    }

    if (message.toLowerCase() == "!chans") {
    	console.log(bot.chans);
    }

});

bot.addListener('error', function(message) {
    console.log('error: ', message);
});

bot.addListener('+mode', function(channel, by, mode, argument, message) {
	console.log(channel, by, mode, argument, message);

	bot.whois(config.nick, function(info) {
		console.log(info);

		if (tools.isOp(info)) {
			console.log('I am op');
		}
	});
});

bot.addListener('-mode', function(channel, by, mode, argument, message) {
	console.log(channel, by, mode, argument, message);

	bot.whois(config.nick, function(info) {
		console.log(info);

		if (tools.isOp(info)) {
			// bot.say(config.channel, 'I am op');
			console.log('I am op');
		} else {
			console.log('I am not op');
		}
	});
});
