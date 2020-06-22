const Discord = require('discord.io');
const logger = require('winston');
const auth = require('./auth.json');
const { stream } = require('winston');

//Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

//Initialize the Discord bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
})

bot.on('message', function (user, userID, channelID, message, evt) {
    //Going to debug issues with the Jon bot with some console logging.
    console.log("Message from " + user + "(" + userID + ")");
    console.log(message);

    //Look for the messages Jon would typically respond to
    var jonResponse = false;
    var i, j;

    var math = Math.floor((Math.random() * 10));
    var jonResponses = ["I can probably play after 10 or so tonight I guess", "I will probably be on later tonight at some point, but not rn", "Ill prob be later anyway, like 8 or 9 earliest", "I might be on after", "I will be on whenever I can, not sure exactly when but probably not too late", "Wait, so what are we doing tonight?", "I'll likely be on tomorow but not for that long, I'll likely be on longer wednesday", "I'll probably be on in an hour ish then, I'll probably be on until ~12 is my guess", "Ill prob be on around then (maybe closer to 8)", "Well, I'll probably join vc and play planet coaster or something for a while and if anyone wants to play something then I'll be in vc"];

    var keyWords = ["play", " r6", " cs"];
    
    //For now, placeholder ! test
    if (message.substring(0, 4) == 'jon ') {
        jonResponse = true;

        var args = message.substring(4).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        //Commands
        switch(cmd) {
            //!ping
            case 'help':
                console.log("jon help was found in the message.");
                bot.sendMessage({
                    to: channelID,
                    message: 'Hello, I am Jonathon. I play Rainbow Six Siege and a few other games.\n\n:flag_gb: jon help - List of commands for the Jon bot\n:flag_gb: jon ask - Ask Jon a question!\n:flag_gb: jon rate - Ask Jon to rate something!\n:flag_gb: Suggest new features to <@!373299931986919435> as this bot is currently a WIP :flag_gb:'
                });
                break;
            case 'ask':
                console.log("jon ask was found in the message.");
                var whichResponse = Math.floor((Math.random() * 7));
                var jonQResponses = ["Honestly, yes", "Well I guess that's a no then", "No shit", "Maybe...", "Don't think so", "Sure sure", "Possibly"];
                bot.sendMessage({
                    to: channelID,
                    message: jonQResponses[whichResponse]
                });
                break;
            case 'rate':
                console.log("jon rate was found in the message.");
                var ratingDecision = Math.floor((Math.random() * 11));

                var messageString;

                //Making this fix quickly
                if(args[0] === 'undefined') {
                    messageString = "You didn't give me anything to rate!";

                    bot.sendMessage({
                        to: channelID,
                        message: messageString
                    });
                    break;
                }
                if(args[0] === 'undefined') {
                    break;
                }

                messageString = "I'd rate " + args[0] + " " + ratingDecision + "/10";

               
                if(ratingDecision == 10) {
                    ratingDecision += "!";
                } else {
                    ratingDecision += ".";
                }

                bot.sendMessage({
                    to: channelID,
                    message: messageString
                });
                break;
            default:
                break;
        }
    }

    if(userID != 723364715467636786 && jonResponse === false) {
        check:
        for(i = 0; i < keyWords.length; i++) {
            for(j = 0; j < message.length; j++) {
                if((message.substring(j, j + keyWords[i].length) === keyWords[i])) {
                    console.log("The word " + keyWords[i] + " was found in the message.");
                    bot.sendMessage({
                        to: channelID,
                        message: jonResponses[math]
                    });
                    //jonResponse = true;
                    break check;
                }
            }
        }
    }

    console.log("End of message from " + user + "(" + userID + ")");
})

function equalsIgnoreCase(string1, string2) {
    if(string1.toUpperCase() === string2.toUpperCase()) {
        return true;
    } else {
        return false;
    }
}