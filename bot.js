//google sheet stuff
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var doc = new GoogleSpreadsheet('1WPD5PPkaL-gbSuho0gxZttJQTuW8fMfJ2uN4dHulG4g');
//var doc = new GoogleSpreadsheet('1Q47r52ICYGl2QQo5x45N3pzKOdO9lz9hGCb5hF6aeWc'); //copy
var sheet;
var creds = require('./client_secret.json');

// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  if(command === "getusers") {
	  if(message.author.id != (177107237053923328 || 184327765070315521 || 162610908307259392))
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights");
		doc.useServiceAccountAuth(creds, function (err) {
		doc.getInfo(function(err, info) {
			message.channel.send ("Dumping user data into roster sheet. Might take a while...");
			sheet = info.worksheets[1];
				sheet.getCells({
					'min-row': 2,
					'max-row': 40,
					'min-col': 2,
					'max-col': 3,
					'return-empty': true
				}, function(err, cells) {
					var i;
						client.guilds.get(message.guild.id).fetchMembers().then(r => {
							var j=0;
						r.members.array().forEach(r => {
							cells[j].value=r.user.id;
							cells[j].save();
							j++;
							cells[j].value=r.user.username;
							cells[j].save();
							j++;
							});
						});		
				});
			});
		});
  }
  else if(command === "help") {
	  var txt=""
	  txt=txt+"```diff\n"
	  txt=txt+"-          User Commands: \n\n\n"
	  txt=txt+"+          "+config.prefix+"yes \n"
	  txt=txt+"           Put your attendance on 'yes' for next woe \n\n"
	  txt=txt+"+          "+config.prefix+"no \n"
	  txt=txt+"           Put your attendance on 'no' for next woe \n\n"
	  txt=txt+"+          "+config.prefix+"check \n"
	  txt=txt+"           Checks your attendance status for next woe \n\n"
	  txt=txt+"+          "+config.prefix+"build \n"
	  txt=txt+"           Gets you a build for next woe (if it is available) \n\n"
	  txt=txt+"+          "+config.prefix+"comment \n"
	  txt=txt+"           Lets you put a comment on the roster sheet \n\n"
	  txt=txt+"+          "+config.prefix+"devo \n"
	  txt=txt+"           Gets you your devo targets ***not ready yet*** \n\n"
	  txt=txt+"+          "+config.prefix+"pt \n"
	  txt=txt+"           Gets you party setup if you are a party leader ***not ready yet*** \n\n"
	  txt=txt+"+          "+config.prefix+"gstats (guildname) \n"
	  txt=txt+"           Gets you woe stats of specified guild ***will be ready after first woe*** \n\n"
	  txt=txt+"+          "+config.prefix+"pstats (playername) \n"
	  txt=txt+"           Gets you woe stats of specified player ***will be ready after first woe*** \n\n"
	  txt=txt+"-          Admin Commands: \n\n\n"
	  txt=txt+"+          "+config.prefix+"getusers \n"
	  txt=txt+"           Gets all users from server into roster sheet. Use ONLY when creating attendance from scratch. \n\n"
	  txt=txt+"+          "+config.prefix+"cleanusers \n"
	  txt=txt+"           Cleans all users on roster sheet. \n\n"
	  txt=txt+"+          "+config.prefix+"forceyes @username \n"
	  txt=txt+"           Forces 'yes' for specified user. \n\n"
	  txt=txt+"+          "+config.prefix+"forceno @username \n"
	  txt=txt+"           Forces 'no' for specified user. \n\n"
	  txt=txt+"+          "+config.prefix+"add @username \n"
	  txt=txt+"           Adds specified user into roster sheet. \n\n"
	  txt=txt+"+          "+config.prefix+"remove @username \n"
	  txt=txt+"           Removes specified user into roster sheet. \n\n"
	  txt=txt+"+          "+config.prefix+"purge (1-100) \n"
	  txt=txt+"           Purges from 1 to 100 messages on channel. \n\n\n\n"
	  txt=txt+"```"
	  txt=txt+"If you want some new commands or something doesnt work - DM clepto"
	return message.author.send(txt);
  }
  else if(command === "cleanusers") {
	  if(message.author.id != (177107237053923328 || 184327765070315521 || 162610908307259392))
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights");
		let guilds = client.guilds.array();
		doc.useServiceAccountAuth(creds, function (err) {
		doc.getInfo(function(err, info) {
			message.channel.send ("Cleaning user data in roster sheet. Might take a while...");
			sheet = info.worksheets[1];
				sheet.getCells({
					'min-row': 2,
					'max-row': 40,
					'min-col': 2,
					'max-col': 4,
					'return-empty': true
				}, function(err, cells) {
					var i;
					for (i = 0; i < cells.length; i++) {
							cells[i].value = '';
							//cells[i].save();
					}
					sheet.bulkUpdateCells(cells);						
				});
			});
		});
  }
  else if(command === "cleanatt") {
	  if(message.author.id != (177107237053923328 || 184327765070315521 || 162610908307259392))
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights");
		let guilds = client.guilds.array();
		doc.useServiceAccountAuth(creds, function (err) {
		doc.getInfo(function(err, info) {
			message.channel.send ("Cleaning attendance data in roster sheet...");
			sheet = info.worksheets[1];
				sheet.getCells({
					'min-row': 2,
					'max-row': 40,
					'min-col': 4,
					'max-col': 4,
					'return-empty': true
				}, function(err, cells) {
					var i;
					for (i = 0; i < cells.length; i++) {
							cells[i].value = '';
							//cells[i].save();
					}
					sheet.bulkUpdateCells(cells);						
				});
			});
		});
  }
  else if(command === "ping") {
	  if(message.author.id != 177107237053923328)
      return message.reply("Sorry, i'm still in debug mode and respond only to clepto :clown:");
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  else if(command === "say") {
	  if(message.author.id != 177107237053923328)
      return message.reply("Sorry, i'm still in debug mode and respond only to clepto :clown:");
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  else if(command === "yes") {
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 2,
				'max-col': 4,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == message.author.id)
					{
						cells[i+2].value = 'yes';
						cells[i+2].save();
						//return message.author.send("Your message here.");
						return message.reply("I've set your attendance to **'yes'**. ```fix\n "+config.prefix+"build\n``` command is used to get you a build for woe (if someone bothered to make it :clown:)");
					}
				}
			return message.reply("You are not in the roster :slight_frown: Ask someone with access rights to add you.");				
			});
		});
	});
  }
  
  else if(command === "comment") {
	const comment = args.join(" ");
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 2,
				'max-col': 6,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == message.author.id)
					{
						cells[i+4].value = comment;
						cells[i+4].save();
						return message.reply("I've set your comment.");
					}
				}
			return message.reply("You are not in the roster :slight_frown: Ask someone with access rights to add you.");				
			});
		});
	});
  }
  
   else if(command === "build") {
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 2,
				'max-col': 5,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == message.author.id)
					{
						if (cells[i+3].value == '') {
							return message.reply("Build is not ready");
						}
						else {
							message.reply("Sending build. Check your DM.");
							return message.author.send(cells[i+3].value);
						}
					}
				}
			return message.reply("You are not in the roster :slight_frown: Ask someone with access rights to add you.");				
			});
		});
	});
  }
  else if(command === "check") {
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 2,
				'max-col': 4,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == message.author.id)
					{
						if (cells[i+2].value == 'yes')
						return message.reply("Your attendance status is set to: **'"+cells[i+2].value+"'** ```fix\n "+config.prefix+"build\n``` command is used to get you a build for woe (if someone bothered to make it :clown:)");
						if (cells[i+2].value == 'no')
						return message.reply("Your attendance status is set to: **'"+cells[i+2].value+"'**");
						else
						return message.reply("Your attendance status is not set yet. Use ```fix\n "+config.prefix+"yes or "+config.prefix+"no\n``` commands to set it");
					}
				}
			return message.reply("You are not in the roster :slight_frown: Ask someone with access rights to add you.");				
			});
		});
	});
  }
  
  else if(command === "fcheck") {
	  if(message.author.id != (177107237053923328 || 184327765070315521 || 162610908307259392))
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights");
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
    return message.reply("Please mention a valid member of this server");
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 2,
				'max-col': 4,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == member.user.id)
					{
						if (cells[i+2].value == 'yes')
						return message.channel.send("<@"+member.user.id+"> attendance status is set to: **'"+cells[i+2].value+"'**");
						if (cells[i+2].value == 'no')
						return message.channel.send("<@"+member.user.id+"> attendance status is set to: **'"+cells[i+2].value+"'**");
						else
						return message.channel.send("<@"+member.user.id+"> attendance status is not set yet. Use ```fix\n "+config.prefix+"yes or "+config.prefix+"no\n``` commands to set it");
					}
				}
			return message.reply("You are not in the roster :slight_frown: Ask someone with access rights to add you.");				
			});
		});
	});
  }
  
  else if(command === "no") {
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 2,
				'max-col': 4,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == message.author.id)
					{
						cells[i+2].value = 'no';
						cells[i+2].save();
						return message.reply("I've set your attendance to **'no'**.");
					}
				}
			return message.reply("You are not in the roster :slight_frown: Ask someone with access rights to add you.");				
			});
		});
	});
  }
  
  else if(command === "forceyes") {
	if(message.author.id != (177107237053923328 || 184327765070315521 || 162610908307259392))
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights");

   // if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      //return message.reply("Sorry, you don't have permissions to use this :smile:");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
    return message.reply("Please mention a valid member of this server");
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 2,
				'max-col': 4,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == member.user.id)
					{
						cells[i+2].value = 'yes';
						cells[i+2].save();
						return message.channel.send("<@"+member.user.id+"> is forced to go to woe :joy:");
					}
				}
			return message.channel.send("<@"+member.user.id+"> is not in the roster :slight_frown: Ask someone with access rights to add you.");				
			});
		});
		});
  }
  
  else if(command === "forceno") {
	if(message.author.id != (177107237053923328 || 184327765070315521 || 162610908307259392))
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights");

   // if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      //return message.reply("Sorry, you don't have permissions to use this :smile:");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
    return message.reply("Please mention a valid member of this server");
	var done = 0;
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 2,
				'max-col': 4,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == member.user.id)
					{
						cells[i+2].value = 'no';
						cells[i+2].save();
						return message.channel.send("<@"+member.user.id+"> is forcefully removed from woe :cry:");
					}
				}
			return message.channel.send("<@"+member.user.id+"> is not in the roster :slight_frown: Ask someone with access rights to add you.");				
			});
		});
		});
  }
  
   else if(command === "add") {
	   if(message.author.id != (177107237053923328 || 184327765070315521 || 162610908307259392))
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights");

   // if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      //return message.reply("Sorry, you don't have permissions to use this :smile:");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
    return message.reply("Please mention a valid member of this server");
	var done = 0;
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 2,
				'max-col': 2,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == member.user.id)
					{
						return message.channel.send("<@"+member.user.id+"> is already in the roster :thinking:");
					}
				}
				sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 2,
				'max-col': 3,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == "")
					{
						cells[i].value=member.user.id;
						cells[i].save();
						i++;
						cells[i].value=member.user.username;
						cells[i].save();
						return message.reply(" added <@"+member.user.id+"> to the roster :smile: (id: "+member.user.id+")");	
					}
				}				
			});
			});
		});
		});
  }
  
  else if(command === "remove") {
	   if(message.author.id != (177107237053923328 || 184327765070315521 || 162610908307259392))
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights");

   // if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      //return message.reply("Sorry, you don't have permissions to use this :smile:");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
    return message.reply("Please mention a valid member of this server");
	var done = 0;
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 2,
				'max-col': 4,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == member.user.id)
					{
						cells[i].value="";
						cells[i].save();
						i++;
						cells[i].value="";
						cells[i].save();
						i++;
						cells[i].value="";
						cells[i].save();
						return message.reply(" removed <@"+member.user.id+"> from the roster :smile: (id: "+member.user.id+")");	
					}
				}
				return message.channel.send("<@"+member.user.id+"> is not in the roster :thinking:");
			});
		});
		});
  }
  
  else if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
   if(message.author.id != (177107237053923328 || 184327765070315521 || 162610908307259392))
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights");
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  else {
	  message.reply(" you are doing something wrong :slight_smile: use ```fix\n "+config.prefix+"help\n``` command for info!");
  }
});

client.login(config.token);