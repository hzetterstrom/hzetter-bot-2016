'use strict';

const Script = require('smooch-bot').Script;
var NEWBIE = 0;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
		return bot.say('![](https://secure.gravatar.com/avatar/6df718bd56665a8d924fb58f3c23278b.jpg)')
		.then(() => bot.say('Hi! I\'m Hans\' virtual assistant! Hans sends his regards and his apologies he couldn\'t be with us at the moment.'))
                .then(() => 'askName');

		}
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => 'menunew');
        }
    },
	
	
menunew: {

				//prompt: (bot) => bot.say(`OK! ${name}.\n Let\'s get down to work. ` +
				//`%[Import Hans\' contact info](http://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b.vcf) %[Hans\' Gravatar Profile](https://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b)`))
				
				 // `How can I assist? %[See Hans Linkedin Profile](reply:LinkedIn) %[Hans Resume](reply:Resume)`))
		//return bot.getProp('name')
		
		// .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
          //              'teach me how to do anything else!'))
		
		
				//prompt: (bot) => bot.say(`OK!\n Let\'s get down to work. ` +
				
				
				
		
				prompt: (bot,name) => bot.say(`It\'s nice to meet you.\n Let me know what information you\'d like to see. ` +
				`%[Contact Hans](reply:Contact) %[Random Hans Analogy](reply:Analogy) %[Hans\' Latest Tweets](reply:Tweets)`), 
				
				
				receive: (bot, message) => {
				var BOTMSG = message.text;
				var LBOTMSG = BOTMSG.toLowerCase();
				
			
			if (LBOTMSG == "contact") {
				return bot.say(`%[Import Hans\' contact info](http://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b.vcf) %[Hans\' Gravatar Profile](https://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b)`)
				//NEWBIE+=1
				.then(() => 'menureturn');
			} else if (LBOTMSG == "analogy") {
				var RNDNUM = Math.floor(Math.random() * 11);
				if (RNDNUM = 1) {
					return bot.say('Random Analogy 1 ' + RNDNUM)
					 .then(() => 'menureturn');
				} else if (RNDNUM = 2) {
					return bot.say('Random Analogy 2 ' + RNDNUM)
					 .then(() => 'menureturn');
				} else if (RNDNUM = 3) {
					return bot.say('Random Analogy 3 ' + RNDNUM)
					 .then(() => 'menureturn');
				} 
				//return bot.say('outside OK')
			} else if (LBOTMSG == "tweets") {
			var feed = require('feed-read'),  // require the feed-read module
			urls = [
			"https://zapier.com/engine/rss/1617716/hanszed-tw1"
			
			]; // Example RSS Feeds
	
	
  // loop through our list of RSS feed urls
  for (var j = 0; j < urls.length; j++) {

    // fetch rss feed for the url:
    feed(urls[j], function(err, articles) {

      // loop through the list of articles returned
     for (var i = 0; i < articles.length; i++) {

        // stream article title (and what ever else you want) to client
 //       displayArticle(res, articles[i]);

        // check we have reached the end of our list of articles & urls
        if( i === articles.length-1 && j === urls.length-1) {
			return bot.say("TWEETS DONE!")
 //         res.end("</body>\n</html>"); // end http response
      } // else still have rss urls to check
     } //  end inner for loop
    }); // end call to feed (feed-read) method
  } // end urls for loop
	
					return bot.say("TWEET TWEET")
				}
			
			


			
	//TWITTER
	//OPEN CALENDAR
	//Resume
	//LAST ARTICLES
	//ABOUT Hans
		}
			  
        
    },
menureturn: {

				//prompt: (bot) => bot.say(`OK! ${name}.\n Let\'s get down to work. ` +
				//`%[Import Hans\' contact info](http://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b.vcf) %[Hans\' Gravatar Profile](https://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b)`))
				
				 // `How can I assist? %[See Hans Linkedin Profile](reply:LinkedIn) %[Hans Resume](reply:Resume)`))
		//return bot.getProp('name')
		
		// .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
          //              'teach me how to do anything else!'))
		
		
				//prompt: (bot) => bot.say(`OK!\n Let\'s get down to work. ` +
		
        //receive: (bot, message) => {
        //    return bot.getProp('name')
        //        .then((name) => bot.say(`Hello again, ${name}!`))
        //        .then(() => 'finish');
        //}
		
				prompt: (bot,name) => bot.say(`Welcome Back.\n Let me know what information you\'d like to see. ` +
				`%[Contact Hans](reply:Contact) %[Random Hans Analogy](reply:Analogy)`), 
				
				
				receive: (bot, message) => {
				var BOTMSG = message.text;
				var LBOTMSG = BOTMSG.toLowerCase();
				
			
			if (LBOTMSG == "contact") {
				return bot.say(`%[Import Hans\' contact info](http://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b.vcf) %[Hans\' Gravatar Profile](https://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b)`)
				.then(() => 'menureturn');
			} else if (LBOTMSG == "analogy") {
			var RNDNUM = Math.floor((Math.random()*3) +1);
				if (RNDNUM === 1) {
					return bot.say('Random Analogy 1 ' + RNDNUM)
					 .then(() => 'menureturn');
				} else if (RNDNUM === 2) {
					return bot.say('Random Analogy 2 ' + RNDNUM)
					 .then(() => 'menureturn');
				} else if (RNDNUM === 3) {
					return bot.say('Random Analogy 3 ' + RNDNUM)
					 .then(() => 'menureturn');
				} else if (LBOTMSG == "twitter") {
					var request = new XMLHttpRequest();
					request.open("GET", "https://zapier.com/engine/rss/1617716/hanszed-tw1", false);
					request.send();
					var xml = request.responseXML;
					var items = xml.getElementsByTagName("item");

					for(var i = 0; i < items.length; i++) {
					var item = items[i];
  
					var description = item.getElementsByTagName("description");
					var links = item.getElementsByTagName("link");
  
				//	for(var k = 0; k < links.length; k++) {
       //console.log(description[k].childNodes[0].nodeValue);
					var description$i = description[i].childNodes[0].nodeValue;
      //console.log(description$k)
					//}
					//for(var j = 0; j < links.length; j++) {
      // console.log(links[j].childNodes[0].nodeValue);
					var links$i = links[i].childNodes[0].nodeValue;
					//}
				}

					return bot.say($links1 + $description1)
					.then(() => bot.say($links2 + $description2))
					.then(() => bot.say($links3 + $description3))
					
				}
				return bot.say('outside OK')
			}
			
			


			
	//TWITTER
	//OPEN CALENDAR
	//Resume
	//LAST ARTICLES
	//ABOUT Hans
		}
			  
        
    },
	
	finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'menunew');
        }
    }
});