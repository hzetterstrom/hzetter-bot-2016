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
			
			bot.say('![](https://secure.gravatar.com/avatar/a7d49a9a2ab6e952e760ebddacd9be50)')
			
			var promise = new Promise(function(resolve, reject) {
			setTimeout(function () {
				console.log("i am james");
			bot.say('Hi! I\'m James. I\'m Hans\' virtual assistant. Hans sends his regards and his apologies he couldn\'t be with us at the moment.');
			resolve();
			}, 5000);
			});
			return promise.then(function(){
				var promise = new Promise(function(resolve, reject) {
			setTimeout(function () {
			console.log("pointless promise");
			resolve();
			}, 5000);
			});
			return promise.then(function(){
				console.log('done with start promise');
				return'askName';});	
			});
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
	prompt: (bot,name) => bot.say(`Have you and Hans met before? (yes/no)`),	
	receive: (bot, message) => {
        var ureason = message.text;
        reason = ureason.toLowerCase();
		
				
            if( reason.indexOf('yes' || 'yea' || 'yeah' || 'y' || 'yep' || 'we are') >= 0){
			 var uname = bot.getProp('name')
			 
			 var promise = new Promise(function(resolve, reject) {
			setTimeout(function () {
			bot.say(`Excellent ${uname}, It\'s nice to meet a mutual acquaintance.`)
			resolve();
			}, 5000);
			});
			return promise.then(function(){
			console.log('done with Reason promise');
			return'menuTop';	
			}); 
			 
			 
			 
			//.then((uname) => bot.say(`Excellent ${uname}, It\'s nice to meet a mutual acquaintance.`))
			//return('menuTop');
             } else {
			 bot.say('![](https://pbs.twimg.com/profile_images/760110879979499520/HpX5-Q1K.jpg)')
			 
			
			 
			 var promise = new Promise(function(resolve, reject) {
			setTimeout(function () {
				console.log('intro stuff');
			bot.say('OK. Well since you\'re not acquainted with him... Hans is an operations and technology leader. He advocates simplicity and loves to make complex things more simple. He has a genuine dislike for process for the sake of it. In his spare time (not exactly copious) he collects classic pinball and arcade machines.')
			//bot.say('Before we begin, tell me a little about yourself. What\'s your name?');
			resolve();
			}, 5000);
			});
			return promise.then(function(){
				var promise = new Promise(function(resolve, reject) {
			setTimeout(function () {
			console.log("pointless promise");
			resolve();
			}, 5000);
			});
			return promise.then(function(){
			console.log('outside reason promise');
			return'quickIntro';
			});	
			 });
			 }
		   } 
	
},

quickIntro: {
	prompt: (bot,name) => bot.say(`I\'d like to be able to introduce the two of you, can I ask you a couple of questions? (yes/no)`),	
	receive: (bot, message) => {
        var ureason = message.text;
        reason = ureason.toLowerCase();
	
				
            if( reason.indexOf('yes' || 'yea' || 'yeah' || 'y' || 'yep' || 'we are' ||'sure') >= 0){
			return('whereyoufrom');
			} else {
			return('menuTop');
			}
			 
	}	 
	
},

whereyoufrom: {
	
	
	prompt: (bot,name) => bot.say(`Where are you from? (or skip)`),	
	receive: (bot, message) => {
        var ureason = message.text;
        reason = ureason.toLowerCase();
		
		if( reason.indexOf('skip') >= 0){
			return('menuTop');
			} else {
			return bot.say('I love ' + reason + '! So nice this time of year.')
			.then(() => 'whatyoudo');
			}
	}
	
},

whatyoudo: {
	
	
	prompt: (bot,name) => bot.say(`What do you do for work? (or skip)`),	
	receive: (bot, message) => {
        var ureason = message.text;
        reason = ureason.toLowerCase();
		
		if( reason.indexOf('skip') >= 0){
			return('menuTop');
		} else {
		return bot.say('OK, thanks. I\'ll share that with Hans.')
		.then(() => 'menuTop');
		}
	}
	
},
	
menuTop: {
	
		prompt: (bot,name) => bot.say('What would you like to know about Hans?' + `%[His Experience](reply:experience) %[His Thoughts](reply:thoughts) %[More Info](reply:info)`), 
			
		receive: (bot, message) => {
        var menu = message.text;
        var lmenu = menu.toLowerCase();
			
			if ( lmenu.indexOf('info') >= 0){
			return('infoTop');
			} else if ( lmenu.indexOf('experience') >= 0){
			return('experience');
			} else if ( lmenu.indexOf('thoughts') >= 0){
			return('thoughts');
			}else if ( lmenu.indexOf('start') >= 0){
			return('start');
			}  else {
				return bot.say(`Sorry, Hans hasn't taught me how to do that yet, but he\'ll no doubt get right on it`)
				.then(() => 'menuTop');
			}
		}			
},

experience: {
	prompt: (bot,name) => bot.say('Hans has worked on some cool things. Check out what he\'s worked on most recently.' + `%[Skills](reply:skills) %[Latest Projects](reply:projects) %[Linkedin](reply:linkedin) %[Resume](reply:resume) %[Main Menu](reply:menu)`), 
			
		receive: (bot, message) => {
        var menu = message.text;
        var lmenu = menu.toLowerCase();
			
			if ( lmenu.indexOf('skills') >= 0){
			return  bot.say(`Hans considers his primary skills to be:\n•	Team Leadership & Development\n•	Strategic Planning\n•	Enterprise Architecture\n•	Driving Innovation\n•	Agile Methodologies`)
			.then(() => 'experience');
			} else if ( lmenu.indexOf('projects') >= 0){
			return bot.say(`Hans\' latest experiences include:\n`)	
			.then(() => bot.say(`•	Created Kanban room to visually represent organizational decisions and KPI performance. \n`))
			.then(() => bot.say(`•	Implemented Agile SDLC methodologies  and initiated a team culture devoted to the Agile Manifesto.\n`))
			//.then(() => bot.say(`•	Reorganized company structure to create Product Managers using business model canvases, product roadmaps, qualitative research methods, and KPI management that resulted in more autonomy and a customer-centered focus.\n`))
			.then(() => 'experience');
				
				
			} else if ( lmenu.indexOf('resume') >= 0){
			return bot.say(`%[Hans\' resume](https://goo.gl/x5fqqo)`)
			.then(() => 'experience');		
			} else if ( lmenu.indexOf('linkedin') >= 0){
				return bot.say('Connect with Hans on' + `%[LinkedIn](https://www.linkedin.com/in/hanszetterstrom)`)
				.then(() => 'experience');
				}
			else if ( lmenu.indexOf('menu') >= 0){
				return('menuTop');
			} else if ( lmenu.indexOf('main') >= 0){
				return('menuTop');
			} else {
				return bot.say(`Sorry, Hans hasn't taught me how to do that yet, but he\'ll no doubt get right on it`)
				.then(() => 'experience');
			}
		}
},

thoughts: {
	//latest tweets
	//his articles/writing
	//hans' linkedin
	
	
	prompt: (bot,name) => bot.say('See what Hans has been talking about' + `%[Latest tweets](reply:tweets) %[Latest articles](reply:articles) %[Main Menu](reply:menu)`), 
			
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
				//for (var i = 0; i < articles.length; i++) {
				for (var i = 0; i < 2; i++) {
		 
				var title = articles[i].title;
				var content = articles[i].content;
				var link = articles[i].link;

				bot.say(`Hans\' latest articles on medium include:\n` +  title + "\n"+ link + "\n")
				//.then(() => 'thoughts');
				} //  end inner for loop
			}); // end call to feed (feed-read) method
			
			var promise = new Promise(function(resolve, reject) {
			setTimeout(function () {
			console.log('out of articles');
			resolve();
			}, 5000);
			});
			return promise.then(function(){
				return'thoughts';});	
			
			
			} // end urls for loop
				return('thoughts');
				}  else if ( lmenu.indexOf('menu') >= 0){
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
				//for (var i = 0; i < articles.length; i++) {
				for (var i = 0; i < 3; i++) {
				var content = articles[i].content;
				var link = articles[i].link;

			 bot.say("@HansZed tweeted " +  content + "\n"+ link + "\n")
			 
				} //  end inner for loop
			}); // end call to feed (feed-read) method
			var promise = new Promise(function(resolve, reject) {
			setTimeout(function () {
			bot.say('You can follow Hans on Twitter by clicking this link ' + `%[Follow Hans](https://goo.gl/rnkPq9)`);
			//bot.say('Before we begin, tell me a little about yourself. What\'s your name?');
			resolve();
			}, 5000);
			});
			return promise.then(function(){
				return'thoughts';});	
			
			} // end urls for loop
			} else {
				
				return bot.say(`Sorry, Hans hasn't taught me how to do that yet, but he\'ll no doubt get right on it`)
				.then(() => 'thoughts');
			}
		
			return('thoughts');
	}		
},

infoTop:{
	prompt: (bot,name) => bot.say(`%[Contact](reply:contact) %[About James](reply:James) %[Main Menu](reply:menu)`), 
			
		receive: (bot, message) => {
        var menu = message.text;
        var lmenu = menu.toLowerCase();
			
			if ( lmenu.indexOf('contact') >= 0){
				return bot.say(`%[Main Menu](reply:menu) %[Email Hans](reply:email) %[Text Hans](reply:text)` ) 
			.then(() => 'info');
			} 
			else if ( lmenu.indexOf('james') >= 0){
				
			var promise = new Promise(function(resolve, reject) {
			setTimeout(function () {
			bot.say('I\'m version 1.0, I was created in August 2016 by Hans Zetterstrom.\nI was created and then customized on Smooch using the Smoochbot framework.')
			resolve();
			}, 5000);
			});
			
			return promise.then(function(){
			var promise = new Promise(function(resolve, reject) {
			setTimeout(function () {
			bot.say('I\'m not yet tied into an NLP framework so I am primarily menu-driven.\nI tie into Twilio for SMS.')
			resolve();
			}, 5000);
			});
			
			return promise.then(function(){
				var promise = new Promise(function(resolve, reject) {
			setTimeout(function () {
			bot.say('\nMy code runs out of Heroku and my code is in github.')
			resolve();
			}, 5000);
			});
			
			return promise.then(function(){
				var promise = new Promise(function(resolve, reject) {
			setTimeout(function () {
			bot.say('Why not tweet @HansZed and let him know we\'re talking?\n Just click this link and I\'ll create a tweet for you.' + `%[Tweet Hans](https://goo.gl/TzFtyP)`)
			resolve();
			}, 5000);
			});
			return promise.then(function(){
				var promise = new Promise(function(resolve, reject) {
			setTimeout(function () {
			console.log("pointless promise");
			resolve();
			}, 5000);
			});
			return promise.then(function(){
				console.log("I am in the last return");
				return'infoTop';});	
			
			});
			});	
			});	
			});	
				
				
		//	 ') my
		//	var promise = new Promise(function(resolve, reject) {
		//	setTimeout(function () {
		//		console.log("i am james");
		//	bot.say('Hi! I\'m James. I\'m Hans\' virtual assistant. Hans sends his regards and his apologies he couldn\'t be with us at the moment.');
		//	resolve();
		//	}, 5000);
		//	});
			
			
			
			
			
			} else if ( lmenu.indexOf('menu') >= 0){
				return('menuTop');
			} else if ( lmenu.indexOf('main') >= 0){
				return('menuTop');
			} else {
				
				return bot.say(`Sorry, Hans hasn't taught me how to do that yet, but he\'ll no doubt get right on it`)
				.then(() => 'infoTop');
			}
			return('infotop');
		}
},

info: {

prompt: (bot) => bot.say( 'Great, he\'d love to hear from you. Here\'s' + '%[Hans\' contact info\:](http://goo.gl/V2CrZR)'),

 			receive: (bot, message2) => {
			var innermenu = message2.text;
			var linnermenu = innermenu.toLowerCase();
			if ( linnermenu.indexOf('email') >= 0){
				
				return bot.say('Hans\' email is hans.zetterstrom@gmail.com')
				.then(() => 'infoTop');
				
			}
			else if ( linnermenu.indexOf('text') >= 0){
			return('sendSMS');
				

			} else if ( linnermenu.indexOf('menu') >= 0){
				return('menuTop');
			} else if ( linnermenu.indexOf('main') >= 0){
				return('menuTop');
			} else {
				
				return bot.say(`Sorry, Hans hasn't taught me how to do that yet, but he\'ll no doubt get right on it`)
				.then(() => 'infoTop');
			}
			return('infoTop');
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
				
				var client = twilio('SK9bb10c5f10fd26aeba606647bcc9e3c0', 'BhhuXf6lZq4NqgL6UpAhm5sbrChVii8I');
 
 
 
 
				// Send the text message.
				client.sendMessage({
				to: '813-408-4511',
				from: '312-313-4267',
				body: message3.text
				});
			return bot.say('OK. I sent a text to Hans. He usually replies pretty quickly.')
			.then(() => 'infoTop');
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
		
		
	