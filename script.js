'use strict';

const Script = require('smooch-bot').Script;
var reason;
var wait = require('wait');

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
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
	    
		prompt: (bot,name) => bot.say(`Tell me a little more about you? ` + `%[I\'m a recruiter](reply:recruiter) %[I\'m a hiring manager](reply:manager) %[I\'m a friend](reply:friend) %[I\'m just visiting](reply:visiting)`), 
			
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
			return bot.say('![](https://secure.gravatar.com/avatar/6df718bd56665a8d924fb58f3c23278b)')
			.then(() => bot.say('OK. Let me introduce Hans. He is currently COO at American Association for Physician Leadership, previously he was CIO there too. Hans cut his teeth as a system engineer in online services companies, as well as financial and media measurement organizations before he headed into healthcare. He\'s certified in Agile methodologies and knows how to transform organizations to efficiently use it. He understands how critical it is to not only implment the process of Agile but transform the culture too.'))
			.then(() => 'menuNew');      
		   } else if( reason.indexOf('recruiter') >= 0){
             reason = 'recruiter'
			return bot.say('![](https://secure.gravatar.com/avatar/6df718bd56665a8d924fb58f3c23278b)')
			.then(() => bot.say('OK. Let me introduce Hans. He is currently COO at American Association for Physician Leadership, previously he was CIO there too. Hans cut his teeth as a system engineer in online services companies, as well as financial and media measurement organizations before he headed into healthcare. He\'s certified in Agile methodologies and knows how to transform organizations to efficiently use it. He understands how critical it is to not only implment the process of Agile but transform the culture too.'))
			.then(() => 'menuNew');
			} else if( reason.indexOf('curious') >= 0){
             reason = 'visiting'
			return bot.say('![](https://secure.gravatar.com/avatar/6df718bd56665a8d924fb58f3c23278b)')
			.then(() => bot.say('OK. Let me introduce Hans. He is currently COO at American Association for Physician Leadership, previously he was CIO there too. Hans cut his teeth as a system engineer in online services companies, as well as financial and media measurement organizations before he headed into healthcare. He\'s certified in Agile methodologies and knows how to transform organizations to efficiently use it. He understands how critical it is to not only implment the process of Agile but transform the culture too.'))
            .then(() => 'menuNew');
			 } else { 
     
	   return('menuNew');
	   }
	   
        }
            
	},
	
	
menuNew: {

			
	prompt: (bot,name) => bot.say('What more can I tell you about Hans?' + `%[His Work](reply:work) %[His Thoughts](reply:thoughts) %[More Info](reply:info)`), 
			
		receive: (bot, message) => {
        var menu = message.text;
        var lmenu = menu.toLowerCase();
			
			if ( lmenu.indexOf('info') >= 0){
		
		return('info');
		//	.then(() => 'info');
//			prompt: (bot,name) => bot.say('What more can I tell you about Hans?' + `%[Email Hans](reply:email) %[Text Hans](reply:text) %[Get Hans\' contact info](http://goo.gl/V2CrZR)` + '\nOr menu to return to the main menu'),
	//			receive: (bot, message2) => {
		//	var innermenu = message2.text;
			//var linnermenu = innermenu.toLowerCase();
		//	if ( linnermenu.indexOf('email') >= 0){
				
//				return bot.say('Hans\' email is hans.zetterstrom@gmail.com')
//				.then(() => 'nextMenu');
				
//			}
//			else if ( linnermenu.indexOf('text') >= 0){
//				
//				return bot.say('Hans\' sms # is 813-408-4511')
//				.then(() => 'nextMenu');
//				
//			} else if ( linnermenu.indexOf('menu') >= 0){
//				
//				return ('menuNew');
//				
//			}
	//			
	//			//return bot.say('OK. Click on either of these links' + `%[Import Hans\' contact info](http://goo.gl/V2CrZR) %[Hans\' Gravatar Profile](http://goo.gl/EbEPb5)`)
	//			.then(() => 'nextMenu');
			} 
			else if ( lmenu.indexOf('james') >= 0){
				return bot.say('I\'m version 1.0, I was created in August 2016 by Hans Zetterstrom.\nI was created and then customized on Smooch using the Smoochbot framework.\nI tie into Twilio for SMS.\nMy code runs out of Heroku and the code itself is in github.') 
			.then(() => 'nextMenu');
			}
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
				.then(() => bot.say('Why not tweet @HansZed and let him know we\'re talking?\n Just click this link and I\'ll create a tweet for you.' + `%[Tweet Hans](https://goo.gl/TzFtyP)`))
				//.then(() => bot.say('Or you can Follow @HansZed by clicking the button/link' + `%[Follow Hans](https://twitter.com/intent/follow\?screen\_name\=hanszed`))
				.then(() => bot.say('Or you can follow @HansZed via the link below' + `%[Follow Hans](https://goo.gl/rnkPq9)`))
				.then(() => bot.say('Connect with Hans on' + `%[LinkedIn](https://www.linkedin.com/in/hanszetterstrom)`))
				.then(() => 'nextMenu');
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
	
nextMenu:{
	
	prompt: (bot) => bot.say('Say Menu at any time to go to the Main Menu'),
	
	receive: (bot,message) => {
		   var yn = message.text;
		   var lyn = yn.toLowerCase();
		   if ( lyn.indexOf('menu') >= 0){
			   return('menuNew');
			 
		   } else {
			   return('waitHere');
		   }
	   }
	
},

info: {


//prompt: (bot) => bot.say(`What more can I tell you about Hans? ` + `%[Email Hans](reply:email) %[Text Hans](reply:text)` ),
prompt: (bot) => bot.say(`What more can I tell you about Hans? ` + '%[Follow Hans](https://goo.gl/rnkPq9)' ),
//+ `%[Email Hans](reply:email) %[Text Hans](reply:text)`
//bot.say(`%[Contact Info](https://www.google.com)` + '\nOr say menu to return to the main menu'),
//bot.say('What more can I tell you about Hans?' + `%[Email Hans](reply:email) %[Text Hans](reply:text) %[Get Hans\' contact info](http://goo.gl/V2CrZR)` + '\nOr menu to return to the main menu'),
 			receive: (bot, message2) => {
			var innermenu = message2.text;
			var linnermenu = innermenu.toLowerCase();
			if ( linnermenu.indexOf('email') >= 0){
				
				return bot.say('Hans\' email is hans.zetterstrom@gmail.com');
//				.then(() => 'nextMenu');
				
			}
			else if ( linnermenu.indexOf('text') >= 0){
				
				var twilio = require('twilio');
 
				// Find your account sid and auth token in your Twilio account Console.
				//var client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
 
				// Send the text message.
				client.sendMessage({
				to: '813-408-4511',
				from: '312-313-4267',
				body: 'Hello from Twilio!'
				});
			return bot.say('We sent an SMS to Hans');

}
}
},
waitHere: {
	
	receive: (bot, message) => {
		var menucall = message.text;
		var lmenucall = menucall.toLowerCase();
		if ( lmenucall.indexOf('menu') >= 0){
			   return('menuNew');
			 
		   } else {
			   return('waitHere');
		   }
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

//unused code here
//else  if ( lmenu.indexOf('analogy') >= 0){ 
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
			 //return bot.setProp('reason', reason)
	//  return bot.getProp('name')
    //	.then((name) => bot.say(`Excellent ${name}, I\'ll be sure to remember that on future visits`))
       //   .then(() => 'menuNew');
	   				//prompt: (bot) => bot.say(`OK! ${name}.\n Let\'s get down to work. ` +
				//`%[Import Hans\' contact info](http://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b.vcf) %[Hans\' Gravatar Profile](https://en.gravatar.com/6df718bd56665a8d924fb58f3c23278b)`))
				
				 // `How can I assist? %[See Hans Linkedin Profile](reply:LinkedIn) %[Hans Resume](reply:Resume)`))
		//return bot.getProp('name')
		
		// .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
          //              'teach me how to do anything else!'))
		
		
				//prompt: (bot) => bot.say(`OK!\n Let\'s get down to work. ` +
	//prompt: (bot,name) => bot.say('What more can I tell you about Hans?' + `%[Contact](reply:contact) %[AboutJames](reply:james) %[Tweet](reply:tweet)`), 
		//	prompt: (bot,name) => bot.say(`Let me know what information you\'d like to see. ` +
				//`%[Contact Hans](reply:Contact) %[Random Hans Analogy](reply:Analogy) %[Hans\' Latest Tweet](reply:Tweet)`), 