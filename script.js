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
			.then(() => 'menuTop');
             } else if( reason.indexOf('manager') >= 0){
             reason = 'manager'
			return bot.say('![](https://secure.gravatar.com/avatar/6df718bd56665a8d924fb58f3c23278b)')
			.then(() => bot.say('OK. Let me introduce Hans. He is currently COO at American Association for Physician Leadership, previously he was CIO there too. Hans cut his teeth as a system engineer in online services companies, as well as financial and media measurement organizations before he headed into healthcare. He\'s certified in Agile methodologies and knows how to transform organizations to efficiently use it. He understands how critical it is to not only implement the process of Agile but transform the culture too.'))
			.then(() => 'menuTop');      
		   } else if( reason.indexOf('recruiter') >= 0){
             reason = 'recruiter'
			return bot.say('![](https://secure.gravatar.com/avatar/6df718bd56665a8d924fb58f3c23278b)')
			.then(() => bot.say('OK. Let me introduce Hans. He is currently COO at American Association for Physician Leadership, previously he was CIO there too. Hans cut his teeth as a system engineer in online services companies, as well as financial and media measurement organizations before he headed into healthcare. He\'s certified in Agile methodologies and knows how to transform organizations to efficiently use it. He understands how critical it is to not only implement the process of Agile but transform the culture too.'))
			.then(() => 'menuTop');
			} else if( reason.indexOf('curious') >= 0){
             reason = 'visiting'
			return bot.say('![](https://secure.gravatar.com/avatar/6df718bd56665a8d924fb58f3c23278b)')
			.then(() => bot.say('OK. Let me introduce Hans. He is currently COO at American Association for Physician Leadership, previously he was CIO there too. Hans cut his teeth as a system engineer in online services companies, as well as financial and media measurement organizations before he headed into healthcare. He\'s certified in Agile methodologies and knows how to transform organizations to efficiently use it. He understands how critical it is to not only implement the process of Agile but transform the culture too.'))
            .then(() => 'menuTop');
			 } else { 
     
	   return('menuTop');
	   }
	   
        }
            
	},
	
menuTop: {
	
		prompt: (bot,name) => bot.say('What more can I tell you about Hans?' + `%[His Work](reply:work) %[His Thoughts](reply:thoughts) %[More Info](reply:info)`), 
			
		receive: (bot, message) => {
        var menu = message.text;
        var lmenu = menu.toLowerCase();
			
			if ( lmenu.indexOf('info') >= 0){
			return('infoTop');
			} else if ( lmenu.indexOf('work') >= 0){
			return('work');
			} else if ( lmenu.indexOf('thoughts') >= 0){
			return('thoughts');
			}
		}			
},

work: {
	prompt: (bot,name) => bot.say('Hans\' work' + `%[Skills](reply:skills) %[Experience](reply:experience) %[Resume](reply:resume) %[Main Menu](reply:menu)`), 
			
		receive: (bot, message) => {
        var menu = message.text;
        var lmenu = menu.toLowerCase();
			
			if ( lmenu.indexOf('skills') >= 0){
			return bot.say(`Hans considers his primary skills to be:\nAgile Methodologies\nStrategic Planning\nEnterprise Architecture\nLeading Teams\nTalent Development\n` ) 
			.then(() => 'work');
			} else if ( lmenu.indexOf('experience') >= 0){
			return bot.say(`Hans\' latest experiences include:\n`)	
			.then(() => bot.say(`•	Designed and implemented organization-wide Kanban room that visually represents impact of decision-making, team collaboration, and performance against business and product KPIs.\n`))
			.then(() => bot.say(`•	Led the change in SDLC methodologies from Waterfall to Agile, and supported process and culture to create a team devoted to the spirit of the Agile Manifesto.\n`))
			.then(() => bot.say(`•	Reorganized company structure to create Product Managers that better represent product lines using business model canvases, product roadmaps, qualitative research methods, and KPI management that resulted in more autonomy and a customer-centered focus.\n`))
			.then(() => 'work');
				
				
			} else if ( lmenu.indexOf('resume') >= 0){
			return bot.say(`%[Hans\' resume](https://goo.gl/8mBhae)`)
			.then(() => 'work');		
		} else if ( lmenu.indexOf('menu') >= 0){
				return('menuTop');
			} else if ( lmenu.indexOf('main') >= 0){
				return('menuTop');
			}
		}
},

thoughts: {
	//latest tweets
	//his articles/writing
	//hans' linkedin
	prompt: (bot,name) => bot.say('Hans\' thoughts' + `%[Latest tweet](reply:tweet) %[Latest articles](reply:articles) %[Linkedin](reply:linkedin) %[Main Menu](reply:menu)`), 
			
		receive: (bot, message) => {
        var menu = message.text;
        var lmenu = menu.toLowerCase();
			
			if ( lmenu.indexOf('article') >= 0){
				var feed = require('feed-read'),  // require the feed-read module
				urls = [
				"https://goo.gl/iscgRo"
			
				]; // RSS Feeds can be comma delimited
	
	
				// loop through our list of RSS feed urls
				for (var j = 0; j < urls.length; j++) {

				// fetch rss feed for the url:
				feed(urls[j], function(err, articles) {

				// loop through the list of articles returned
				for (var i = 0; i < articles.length; i++) {
		 
				var title = articles[i].title;
				var content = articles[i].content;
				var link = articles[i].link;

				return bot.say(`Hans\' latest articles on medium include:\n` +  title + "\n"+ link + "\n")
				//.then(() => 'thoughts');
				} //  end inner for loop
			}); // end call to feed (feed-read) method
			return('thoughts');
			} // end urls for loop
//	
				} else if ( lmenu.indexOf('linkedin') >= 0){
				return bot.say('Connect with Hans on' + `%[LinkedIn](https://www.linkedin.com/in/hanszetterstrom)`)
				.then(() => 'thoughts');
				} else if ( lmenu.indexOf('menu') >= 0){
				return('menuTop');
			} else if ( lmenu.indexOf('main') >= 0){
				return('menuTop');
			} else if ( lmenu.indexOf('tweet') >= 0){
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

				//return bot.say("@HansZed tweeted " +  content + "\n"+ link + "\n")
			 bot.say("@HansZed tweeted " +  content + "\n"+ link + "\n")
			//	.then(() => bot.say('Why not tweet @HansZed and let him know we\'re talking?\n Just click this link and I\'ll create a tweet for you.' + `%[Tweet Hans](https://goo.gl/TzFtyP)`))
				.then(() => bot.say('You can follow Hans on Twitter by clicking this link ' + `%[Follow Hans](https://goo.gl/rnkPq9)`))
				//.then(() => 'thoughts');
				} //  end inner for loop
				return('thoughts');
			}); // end call to feed (feed-read) method
			return('thoughts');
			} // end urls for loop
	return('thoughts');
			}
			return('thoughts');
}		
},

infoTop:{
	prompt: (bot,name) => bot.say(`%[Contact](reply:contact) %[About James](reply:James)`), 
			
		receive: (bot, message) => {
        var menu = message.text;
        var lmenu = menu.toLowerCase();
			
			if ( lmenu.indexOf('contact') >= 0){
				return bot.say(`%[Email Hans](reply:email) %[Text Hans](reply:text)` ) 
			.then(() => 'info');
			} 
			else if ( lmenu.indexOf('james') >= 0){
				return bot.say('I\'m version 1.0, I was created in August 2016 by Hans Zetterstrom.\nI was created and then customized on Smooch using the Smoochbot framework. I\'m not yet tied into an NLP framework so I am essentially menu-driven.\nI tie into Twilio for SMS.\nMy code runs out of Heroku and the code itself is in github.') 
			.then(() => bot.say('Why not tweet @HansZed and let him know we\'re talking?\n Just click this link and I\'ll create a tweet for you.' + `%[Tweet Hans](https://goo.gl/TzFtyP)`))
			.then(() => 'nextMenu');
			}
		}
},

info: {

prompt: (bot) => bot.say( '%[Hans\' contact info](http://goo.gl/V2CrZR)'),

 			receive: (bot, message2) => {
			var innermenu = message2.text;
			var linnermenu = innermenu.toLowerCase();
			if ( linnermenu.indexOf('email') >= 0){
				
				return bot.say('Hans\' email is hans.zetterstrom@gmail.com');
//				.then(() => 'nextMenu');
				
			}
			else if ( linnermenu.indexOf('text') >= 0){
			return('sendSMS');
				

			}
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



sendSMS: {
	prompt: (bot) => bot.say('Ok, we do can that. Whatever you send in your next message to me, I\'ll relay straight to Hans. Be sure to include a call/text back number and your name.'),
	receive: (bot,message3) => {
		
	
	var twilio = require('twilio');
 
				// Find your account sid and auth token in your Twilio account Console.
				var client = twilio('AC3ab54f75d727117dded31bb4cc42fd46', '5df6d2dabe4ebd7412bcec6c646cd25a');
 
				// Send the text message.
				client.sendMessage({
				to: '813-408-4511',
				from: '312-313-4267',
				body: message3.text
				});
			return bot.say('We sent a text to Hans. He usually replies pretty quickly.');
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
		
		
	