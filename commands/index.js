var tools = require('tools');
var restler = require('restler');

module.exports = {
	"bot" : null,
	"init" : function (bot) {
		this.bot = bot;
		return this;
	},
	"cat" : function (to) {

		var num1 = tools.rint(100, 600);
    	var num2 = tools.rint(100, 600);
    	this.bot.say(to, "here you go: http://placekitten.com/" + num1 + "/" + num2);

	},
	"emoji" : function (to) {

		var kitties = [
			"=^_^=",
			"::stacho::",
			"meow!"
		];

		var index = tools.rint(0, kitties.length - 1);

    	this.bot.say(to, kitties[index]);

	},
	"pokemon" : function (to, num) {

		var msg = num.split(" ");
		var b = this.bot;
		if (msg[1] != '') {
			// console.log(msg[0], parseInt(msg[1], 10));
			if (parseInt(msg[1], 10) != NaN) {
				restler.get('http://pokeapi.co/api/v1/pokemon/' + parseInt(msg[1], 10))
					.on('complete', function(data) {
						// console.log(data);
						if (typeof data.name === "undefined") {
							b.say(to, "I don't know that pokemon. =(");
						} else {
							b.say(to, "Pokemon #" + parseInt(msg[1], 10) + " is " + data.name + "!");
						}
					});
			}
		}

	}
}
