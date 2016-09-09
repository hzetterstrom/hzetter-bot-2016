'use strict';

const Script = require('smooch-bot').Script;
var reason;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
        //http://0.gravatar.com/avatar/a7d49a9a2ab6e952e760ebddacd9be50
		return bot.say('![](https://secure.gravatar.com/avatar/a7d49a9a2ab6e952e760ebddacd9be50)')
		.then(() => bot.say('Hi! I\'m James, Hans\' virtual assistant! Hans sends his regards and his apologies he couldn\'t be with us at the moment.'))
                .then(() => 'askName');

		}
    },

    askName: {
        prompt: (bot) => bot.say('Before we begin, tell me a little about yourself. What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
            .then(() => bot.say('It\'s nice to meet you ' + name))
                .then(() => 'Reason');
        }
    },
	
Reason: {
	    
		prompt: (bot,name) => bot.say(`What brings you here today? ` + `%[I\'m a recruiter](reply:recruiter) %[I\'m a hiring manager](reply:manager) %[I\'m a friend](reply:friend) %[I\'m just curious](reply:curious)`), 
			
		receive: (bot, message) => {
        var ureason = message.text;
        reason = ureason.toLowerCase();
				
            if( reason.indexOf('friend') >= 0){
             reason = 'friend'
             } else if( reason.indexOf('manager') >= 0){
             reason = 'manager'
             } else if( reason.indexOf('recruiter') >= 0){
             reason = 'recruiter'
             } else if( reason.indexOf('curious') >= 0){
             reason = 'curious'
             }       
      //return bot.setProp('reason', reason)
	  return bot.getProp('name')
    	.then((name) => bot.say(`Excellent ${name}, I\'ll be sure to remember that on future visits`))
          .then(() => 'start');
        }
            
	},
	
customMsg: {

//	return bot.getProp('reason')
//	if (reason == "friend") {
//	prompt: (bot) => bot.say('Any friend of Hans is a friend of mine, ' + name)
//	.then (() => 'menuNew');
//	} else if {
//	return bot.say('![](https://secure.gravatar.com/avatar/6df718bd56665a8d924fb58f3c23278b?s=160)')
//	.then(() => bot.say('OK. Let me introduce Hans. He is currently COO at American Association for Physician Leadership, previously he was CIO there too. Hans cut his teeth as a system engineer in online services companies, as well as financial and media measurement organizations before he headed into healthcare. He\'s certified in Agile methodologies and knows how to transform organizations to efficiently use it. He understands how critical it is to not only implment the process of Agile but transform the culture too.')
//	.then(() => 'menuNew');
//	}
    
},
	
menuNew: {

				//prompt: (bot) => bot.say(`OK! ${name}.\n Let\'s get down to work. ` +
				//`%[Import Hans\' contact info](http://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b.vcf) %[Hans\' Gravatar Profile](https://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b)`))
				
				 // `How can I assist? %[See Hans Linkedin Profile](reply:LinkedIn) %[Hans Resume](reply:Resume)`))
		//return bot.getProp('name')
		
		// .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
          //              'teach me how to do anything else!'))
		
		
				//prompt: (bot) => bot.say(`OK!\n Let\'s get down to work. ` +
				
		
				prompt: (bot,name) => bot.say(`Let me know what information you\'d like to see. ` +
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
			
			]; // RSS Feeds can be comma delimited
	
	
  // loop through our list of RSS feed urls
  for (var j = 0; j < urls.length; j++) {

    // fetch rss feed for the url:
    feed(urls[j], function(err, articles) {

      // loop through the list of articles returned
     for (var i = 0; i < articles.length; i++) {
		 
var content = articles[i].content;
var link = articles[i].link;

return bot.say("@HansZed tweeted " +  content + "\n"+ link + "\n")


     } //  end inner for loop
    }); // end call to feed (feed-read) method
  } // end urls for loop
	
				}
			
			
	//OPEN CALENDAR
	//Resume
	//LAST ARTICLES
	//ABOUT Hans
		}
			  
        
    },

	
	customMsg: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'menunew');
        }
    }
});