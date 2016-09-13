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
			 return bot.getProp('name')
			.then((name) => bot.say(`Excellent ${name}, It\'s nice to meet a mutual friend.`))
			.then(() => 'menuNew');
             } else if( reason.indexOf('manager') >= 0){
             reason = 'manager'
			return bot.say('![](https://secure.gravatar.com/avatar/6df718bd56665a8d924fb58f3c23278b?s=80)')
			.then(() => bot.say('OK. Let me introduce Hans. He is currently COO at American Association for Physician Leadership, previously he was CIO there too. Hans cut his teeth as a system engineer in online services companies, as well as financial and media measurement organizations before he headed into healthcare. He\'s certified in Agile methodologies and knows how to transform organizations to efficiently use it. He understands how critical it is to not only implment the process of Agile but transform the culture too.'))
			.then(() => 'menuNew');      
		   } else if( reason.indexOf('recruiter') >= 0){
             reason = 'recruiter'
			return bot.say('![](https://secure.gravatar.com/avatar/6df718bd56665a8d924fb58f3c23278b?s=80)')
			.then(() => bot.say('OK. Let me introduce Hans. He is currently COO at American Association for Physician Leadership, previously he was CIO there too. Hans cut his teeth as a system engineer in online services companies, as well as financial and media measurement organizations before he headed into healthcare. He\'s certified in Agile methodologies and knows how to transform organizations to efficiently use it. He understands how critical it is to not only implment the process of Agile but transform the culture too.'))
			.then(() => 'menuNew');
			} else if( reason.indexOf('curious') >= 0){
             reason = 'curious'
			return bot.say('![](https://secure.gravatar.com/avatar/6df718bd56665a8d924fb58f3c23278b?s=80)')
			.then(() => bot.say('OK. Let me introduce Hans. He is currently COO at American Association for Physician Leadership, previously he was CIO there too. Hans cut his teeth as a system engineer in online services companies, as well as financial and media measurement organizations before he headed into healthcare. He\'s certified in Agile methodologies and knows how to transform organizations to efficiently use it. He understands how critical it is to not only implment the process of Agile but transform the culture too.'))
            .then(() => 'menuNew');
			 } else { 
      //return bot.setProp('reason', reason)
	//  return bot.getProp('name')
    //	.then((name) => bot.say(`Excellent ${name}, I\'ll be sure to remember that on future visits`))
       //   .then(() => 'menuNew');
	   return('menuNew');
	   }
        }
            
	},
	
	
menuNew: {

				//prompt: (bot) => bot.say(`OK! ${name}.\n Let\'s get down to work. ` +
				//`%[Import Hans\' contact info](http://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b.vcf) %[Hans\' Gravatar Profile](https://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b)`))
				
				 // `How can I assist? %[See Hans Linkedin Profile](reply:LinkedIn) %[Hans Resume](reply:Resume)`))
		//return bot.getProp('name')
		
		// .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
          //              'teach me how to do anything else!'))
		
		
				//prompt: (bot) => bot.say(`OK!\n Let\'s get down to work. ` +
					
	prompt: (bot,name) => bot.say(`%[Contact](reply:contact) %[Analogy](reply:analogy) %[Tweet](reply:tweet)`), 
			
		receive: (bot, message) => {
        var menu = message.text;
        var lmenu = menu.toLowerCase();
		
			//	prompt: (bot,name) => bot.say(`Let me know what information you\'d like to see. ` +
				//`%[Contact Hans](reply:Contact) %[Random Hans Analogy](reply:Analogy) %[Hans\' Latest Tweet](reply:Tweet)`), 
			
			if ( lmenu.indexOf('contact') >= 0){
				return bot.say('OK. Click on either of these links' + `%[Import Hans\' contact info](http://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b.vcf) %[Hans\' Gravatar Profile](https://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b)`)
				.then(() => 'menuNew');
			} //else  if ( lmenu.indexOf('analogy') >= 0){ 
			//	var RNDNUM = Math.floor(Math.random() * 11);
			//	if (RNDNUM = 1) {
			//		return bot.say('Random Analogy 1 ' + RNDNUM)
			//		 .then(() => 'menuNew');
			//	} else if (RNDNUM = 2) {
			//		return bot.say('Random Analogy 2 ' + RNDNUM)
			//		 .then(() => 'menuNew');
			//	} else if (RNDNUM = 3) {
			//		return bot.say('Random Analogy 3 ' + RNDNUM)
			//		 .then(() => 'menuNew');
			//	} 
			//} 
		else if ( lmenu.indexOf('tweet') >= 0){
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
				//`%[Follow Hans](https://twitter.com/intent/follow\?screen\_name\=hanszed`
			//	.then(() => bot.say('Why not tweet @HansZed and let him know we\'re talking? Just click this link and I\'ll create a tweet for you.' + '%[Tweet Hans](https://twitter.com/intent/tweet?text=Chatbots%20are%20taking%20over.%20James%20-%20Virtual%20Assistant%20to%20%40HansZed%20and%20I%20are%20chatting...)')
				.then(() => bot.say('Why not tweet @HansZed and let him know we\'re talking? Just click this link and I\'ll create a tweet for you.' + `%[Tweet Hans](https://twitter.com/intent/tweet\?text=Right\%20now\%20I\'m\%20talking\%20to\%20James\%20\-\%20Personal\%20Assistant\%20to\%20\%40HansZed\%20Try\%20it\%20by\%20texting\%20\(312\)313\-4267\(Hans\))`))
				//.then(() => bot.say('Or you can Follow @HansZed by clicking the button/link' + `%[Follow Hans](https://twitter.com/intent/follow\?screen\_name\=hanszed`))
				.then(() => bot.say('Or you can follow @HansZed by clicking on the link/button' + `%[Follow Hans](https://twitter.com/intent/follow\?screen\_name=hanszed)`))
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