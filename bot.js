var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var doc = new GoogleSpreadsheet('1WPD5PPkaL-gbSuho0gxZttJQTuW8fMfJ2uN4dHulG4g');
//var doc = new GoogleSpreadsheet('1Q47r52ICYGl2QQo5x45N3pzKOdO9lz9hGCb5hF6aeWc'); //copy
var sheet;
var creds = require('./client_secret.json');

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if ((message.author.id == 444) || (message.author.id == 177107237053923328) || (message.author.id == 184327765070315521) || (message.author.id == 162610908307259392))
	var admin=1
else
	var admin=0

  if(command === "gstat") {
	  //&woe_date=1554584400
	  //var url = 'https://ragnarok.life/?server=Ragnarok.Life&module=ranking&action=woerank&woe_date=1554584400&opt=0&ser=0&ord=0';
	  var url = 'https://ragnarok.life/?module=ranking&action=woerank&woe_date=1554584400&opt=101&server=Ragnarok.Life&buscar=';
	  gname = args.join("+");
	  url+=gname;
	  var kills, deaths, top, done, recv, supc, supw, healc, healw, emp, bar, stone, guard, demp, dbar, dstone, dguard, hp, sp, ygem, rgem, bgem, arrow, ad, poison, spirit, zeny, gypsy, gypsyd,hw,ganb;
		kills=deaths=top=done=recv=supc=supw=healc=healw=emp=bar=stone=guard=demp=dbar=dstone=dguard=hp=sp=ygem=rgem=bgem=arrow=ad=poison=spirit=zeny=gypsyd=ganb=0;
		request(url, function (error, response, body) {
			const $ = cheerio.load(body);
			fullname = $("#ladder_div table.battlerank-table:nth-child(1) tr.battlerank-header td:nth-child(3)").text().trim();
			var i;
			$("#ladder_div table.battlerank-table").each (function () {
				i=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Gypsy")
					gypsy = 1;
				else
					gypsy = 0;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "High Wizard")
					hw = 1;
				else
					hw = 0;
				$("table.stat-table", this).each (function () {
					$(".text-primary", this).each (function () { 
					if (i==1)
						kills+=parseInt($(this).html().replace(/,/g, ''));
					if (i==2) {
						if (gypsy==1)
							gypsyd+=parseInt($(this).html().replace(/,/g, ''));
						else
							deaths+=parseInt($(this).html().replace(/,/g, ''));
					}
					if (i==3)
						top+=parseInt($(this).html().replace(/,/g, ''));
					if (i==4)
						done+=parseInt($(this).html().replace(/,/g, ''));
					if (i==5)
						recv+=parseInt($(this).html().replace(/,/g, ''));
					if (i==6)
						supc+=parseInt($(this).html().replace(/,/g, ''));
					if (i==7)
						supw+=parseInt($(this).html().replace(/,/g, ''));
					if (i==8)
						healc+=parseInt($(this).html().replace(/,/g, ''));
					if (i==9)
						healw+=parseInt($(this).html().replace(/,/g, ''));
					if (i==10)
						emp+=parseInt($(this).html().replace(/,/g, ''));
					if (i==11)
						bar+=parseInt($(this).html().replace(/,/g, ''));
					if (i==12)
						stone+=parseInt($(this).html().replace(/,/g, ''));
					if (i==13)
						guard+=parseInt($(this).html().replace(/,/g, ''));
					if (i==14)
						demp+=parseInt($(this).html().replace(/,/g, ''));
					if (i==15)
						dbar+=parseInt($(this).html().replace(/,/g, ''));
					if (i==16)
						dstone+=parseInt($(this).html().replace(/,/g, ''));
					if (i==17)
						dguard+=parseInt($(this).html().replace(/,/g, ''));
					if (i==18)
						hp+=parseInt($(this).html().replace(/,/g, ''));
					if (i==19)
						sp+=parseInt($(this).html().replace(/,/g, ''));
					if (i==20)
						if (hw == 1)
							ganb+=parseInt($(this).html().replace(/,/g, ''));
						ygem+=parseInt($(this).html().replace(/,/g, ''));
					if (i==21)
						rgem+=parseInt($(this).html().replace(/,/g, ''));
					if (i==22)
						bgem+=parseInt($(this).html().replace(/,/g, ''));
					if (i==23)
						arrow+=parseInt($(this).html().replace(/,/g, ''));
					if (i==24)
						ad+=parseInt($(this).html().replace(/,/g, ''));
					if (i==25)
						poison+=parseInt($(this).html().replace(/,/g, ''));
					if (i==26)
						spirit+=parseInt($(this).html().replace(/,/g, ''));
					if (i==27)
						zeny+=parseInt($(this).html().replace(/,/g, ''));
					i++;
					});
				}); 
			});
kills = kills.toLocaleString();
deaths = deaths.toLocaleString();
done = done.toLocaleString();
recv = recv.toLocaleString();
ad = ad.toLocaleString();
hp = hp.toLocaleString();
sp = sp.toLocaleString();
ganb = ganb.toLocaleString();
gypsyd = gypsyd.toLocaleString();
var spaces=" ";
var offset;
var gap="";
spaces = " ";
var txt = "```diff\n"
txt+="-GUILD STATS FOR: "+fullname+"\n\n\n"
txt+="--- Basic info:\n";
txt+="!kills:             ";
txt+="deaths:             ";
txt+="damage done:        ";
txt+="received:           \n";
offset = 20 - kills.toString().length;
gap=spaces.repeat(offset);
txt+=kills+gap;
offset = 20 - deaths.toString().length;
gap=spaces.repeat(offset);
txt+=deaths+gap;
offset = 20 - done.toString().length;
gap=spaces.repeat(offset);
txt+=done+gap;
offset = 20 - recv.toString().length;
gap=spaces.repeat(offset);
txt+=recv+gap;
txt+="\n\n--- Additional stuff:\n";
txt+="!ad used:           ";
txt+="hp potions:         ";
txt+="sp potions:         ";
txt+="ganb used:          ";
txt+="gypsy deaths:       \n";
offset = 20 - ad.toString().length;
gap=spaces.repeat(offset);
txt+=ad+gap;
offset = 20 - hp.toString().length;
gap=spaces.repeat(offset);
txt+=hp+gap;
offset = 20 - sp.toString().length;
gap=spaces.repeat(offset);
txt+=sp+gap;
offset = 20 - ganb.toString().length;
gap=spaces.repeat(offset);
txt+=ganb+gap;
offset = 20 - gypsyd.toString().length;
gap=spaces.repeat(offset);
txt+=gypsyd+gap;
txt+="\n```";
return message.channel.send(txt);
});
	  return;
	  
  }
  
  else if(command === "help") {
	  var txt=""
	  txt=txt+"```diff\n"
	  txt=txt+"-          User Commands: \n\n\n"
	  txt=txt+"+          "+config.prefix+"woeinfo \n"
	  txt=txt+"           Displays basic woe info \n\n"
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
	  txt=txt+"           Gets you your devo targets \n\n"
	  txt=txt+"+          "+config.prefix+"party \n"
	  txt=txt+"           Gets you party setup if you are a party leader \n\n"
	  txt=txt+"+          "+config.prefix+"gstats (guildname) \n"
	  txt=txt+"           Gets you woe stats of specified guild ***will be ready after first woe - pulls from ragnarok.life as for now*** \n\n\n"
	  txt=txt+"-          Admin Commands: \n\n\n"
	  txt=txt+"+          "+config.prefix+"getusers \n"
	  txt=txt+"           Gets all users from server into roster sheet. Use ONLY when creating attendance from scratch. \n\n"
	  txt=txt+"+          "+config.prefix+"cleanusers \n"
	  txt=txt+"           Cleans all users on roster sheet. \n\n"
	  txt=txt+"+          "+config.prefix+"forceyes @username \n"
	  txt=txt+"           Forces 'yes' for specified user. \n\n"
	  txt=txt+"+          "+config.prefix+"forceno @username \n"
	  txt=txt+"           Forces 'no' for specified user. \n\n"
	  txt=txt+"+          "+config.prefix+"fcheck @username \n"
	  txt=txt+"           Forces attendance check on specified user. \n\n"
	  txt=txt+"+          "+config.prefix+"cdevo @username \n"
	  txt=txt+"           Checks devo targets of specified user. \n\n"
	  txt=txt+"+          "+config.prefix+"cparty (1-2) \n"
	  txt=txt+"           Checks party setup of specified party. \n\n"
	  txt=txt+"+          "+config.prefix+"add @username \n"
	  txt=txt+"           Adds specified user into roster sheet. \n\n"
	  txt=txt+"+          "+config.prefix+"remove @username \n"
	  txt=txt+"           Removes specified user from roster sheet. \n\n"
	  txt=txt+"+          "+config.prefix+"purge (1-100) \n"
	  txt=txt+"           Purges from 1 to 100 messages on channel. \n\n\n\n"
	  txt=txt+"```"
	  txt=txt+"If you want some new commands or something doesnt work - DM clepto"
	  message.reply("Sending commands info. Check your DM.");
	return message.author.send(txt);
  }
  if(command === "woeinfo") {
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[0];
			sheet.getCells({
				'min-row': 5,
				'max-row': 36,
				'min-col': 15,
				'max-col': 22,
				'return-empty': true
			}, function(err, cells) {
				var i;
				var spaces=" ";
				var offset;
				spaces = " ";
				var txt="```diff\n";
				txt=txt+"+PARTY LEADERS: \n\n";
				txt=txt+"-ingame name:           name:\n";
				offset = 20 - cells[141].value.length;
				spaces = spaces+spaces.repeat(offset);
				txt=txt+"\n1. "+cells[141].value+spaces;
				spaces=" ";
				txt=txt+cells[141-5].value;
				offset = 20 - cells[143].value.length;
				spaces = spaces+spaces.repeat(offset);
				txt=txt+"\n2. "+cells[143].value+spaces;
				spaces=" ";
				txt=txt+cells[143-5].value;
				txt=txt+"\n\n-Check party setup with ?party command!";
				txt=txt+"```";
				txt=txt+"```diff\n";
				txt=txt+"+PALADINS: \n\n";
				txt=txt+"-ingame name:           name:\n";
				var i;
				var k=0;
					for (i = 0; i < cells.length; i++) {
						if (cells[i].value.substring(0, 7) == 'Paladin') {
							k++;
							offset = 20 - cells[i+141].value.length;
							spaces = spaces+spaces.repeat(offset);
							txt=txt+"\n"+k+". "+cells[i+141].value+spaces;
							spaces=" ";
							txt=txt+cells[i+141-5].value;
						}
					}
				txt=txt+"\n\n-Check your devo targets with ?devo command!";
				txt=txt+"```";
				return message.channel.send(txt);
			});
	});
	});
  }
  else if(command === "getusers") {
	  if (admin == 0)
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights\n You can check available commands using: ```fix\n "+config.prefix+"help\n```");
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
  else if(command === "cleanusers") {
	  if (admin == 0)
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights\n You can check available commands using: ```fix\n "+config.prefix+"help\n```");
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
	  if (admin == 0)
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights\n You can check available commands using: ```fix\n "+config.prefix+"help\n```");
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
						if (cells[i+2].value == 'yes') {
							var reply = "Your attendance status is set to **'yes'**. Use following commands to get more info:";
							reply=reply+"```fix\n"+config.prefix+"build - used to get you a build for woe (if someone bothered to make it :clown:)\n";
							reply=reply+config.prefix+"devo - check your devo targets (only for pallies)\n";
							reply=reply+config.prefix+"party - check your party setup (only for party leaders)\n";
							reply=reply+config.prefix+"check - check your attendance status\n";
							reply=reply+config.prefix+"comment - put your comment on the roster sheet\n";
							reply=reply+config.prefix+"no - sets your attendance status on no (not recommended :smile:)\n```";
						
							return message.reply(reply);
						}
						if (cells[i+2].value == 'no')
						return message.reply("Your attendance status is set to: **'"+cells[i+2].value+"'** :cry:");
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
	  if (admin == 0)
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights\n You can check available commands using: ```fix\n "+config.prefix+"help\n```");
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
			return message.reply("<@"+member.user.id+"> is not in the roster :slight_frown: ");				
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
						var reply = "I've set your attendance to **'yes'**. Use following commands to get more info:";
						reply=reply+"```fix\n"+config.prefix+"build - used to get you a build for woe (if someone bothered to make it :clown:)\n";
						reply=reply+config.prefix+"devo - check your devo targets (only for pallies)\n";
						reply=reply+config.prefix+"party - check your party setup (only for party leaders)\n";
						reply=reply+config.prefix+"check - check your attendance status\n";
						reply=reply+config.prefix+"comment - put your comment on the roster sheet\n";
						reply=reply+config.prefix+"no - sets your attendance status on no (not recommended :smile:)\n```";
					
						return message.reply(reply);
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
						return message.reply("I've set your attendance to **'no'** :cry:");
					}
				}
			return message.reply("You are not in the roster :slight_frown: Ask someone with access rights to add you.");				
			});
		});
	});
  }
  
  else if(command === "forceyes") {
	if (admin == 0)
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights\n You can check available commands using: ```fix\n "+config.prefix+"help\n```");
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
	if (admin == 0)
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights\n You can check available commands using: ```fix\n "+config.prefix+"help\n```");
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
	   if (admin == 0)
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights\n You can check available commands using: ```fix\n "+config.prefix+"help\n```");
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
				'max-col': 3,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == member.user.id)
						return message.channel.send("<@"+member.user.id+"> is already in the roster :thinking:");
				}
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
  }
  
  else if(command === "remove") {
	   if (admin == 0)
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights\n You can check available commands using: ```fix\n "+config.prefix+"help\n```");
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
  
  else if (command === "devo")
  {
	var name="";
	var pal="";
doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		name="";
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 1,
				'max-col': 2,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == message.author.id)
					{
						name=cells[i-1].value;	
						sheet = info.worksheets[0];
							sheet.getCells({
								'min-row': 5,
								'max-row': 36,
								'min-col': 15,
								'max-col': 22,
								'return-empty': true
							}, function(err, cells) {
								var i;
								for (i = 0; i < cells.length; i++) {
									if ((cells[i].value == name) && (cells[i+1].value.substring(1, 2) == 'P'))
									{
										if (pal == "") {
											pal = cells[i+1].value;
											pal = pal.substring(0, 1);
										}
									}
								}
								if (pal == "")
									return message.reply("You are not a paladin or you're not in the party setup yet :frowning:");
								var k = 1;
								var spaces=" ";
								var txt="```diff\n";
								txt=txt+"+DEVO TARGETS: \n\n";
								txt=txt+"-name:                  class:               priority:\n";
								for (i = 0; i < cells.length; i++) {
									if ((cells[i].value.substring(0, 1) == pal))
									{ 
										if ((cells[i].value.substring(1, 2) == 'X') || (cells[i].value.substring(1, 2) == 'T')){
											var offset = 20 - cells[i+4].value.length;
											spaces = spaces+spaces.repeat(offset);
											txt=txt+k+'. '+cells[i+4].value+spaces;
											spaces = " ";
											offset = 20 - cells[i-137].value.length;
											spaces = spaces+spaces.repeat(offset);
											txt=txt+cells[i-137].value+spaces;
											spaces = spaces+spaces.repeat(offset);
											if (cells[i].value.substring(1, 2) == 'X')
												txt=txt+"HIGH\n";
											if (cells[i].value.substring(1, 2) == 'T')
												txt=txt+"NORMAL\n";
											k++;
											spaces=" ";
										}
									}
								}
								if (k==1)
									return message.reply("There are no devo tragets for you? :thinking:");
								else {
									message.channel.send("Sending devo targets. Check DM.");
									txt=txt+"```";
									return message.author.send(txt);
								}
							});
					}
				}
				if (name == "")
					return message.reply("You are not in the roster :frowning:");
			});
		});
});
  }
  
  
  else if (command === "cdevo")
  {
	if (admin == 0)
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights\n You can check available commands using: ```fix\n "+config.prefix+"help\n```");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
    return message.reply("Please mention a valid member of this server");
	var name="";
	var pal="";
doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		name="";
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 1,
				'max-col': 2,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == member.user.id)
					{
						name=cells[i-1].value;	
						sheet = info.worksheets[0];
							sheet.getCells({
								'min-row': 5,
								'max-row': 36,
								'min-col': 15,
								'max-col': 22,
								'return-empty': true
							}, function(err, cells) {
								var i;
								for (i = 0; i < cells.length; i++) {
									if ((cells[i].value == name) && (cells[i+1].value.substring(1, 2) == 'P'))
									{
										if (pal == "") {
											pal = cells[i+1].value;
											pal = pal.substring(0, 1);
										}
									}
								}
								if (pal == "")
									return message.reply("<@"+member.user.id+"> is not a paladin or is not in the party setup yet :frowning:");
								var k = 1;
								var spaces=" ";
								var txt="```diff\n";
								txt=txt+"+DEVO TARGETS: \n\n";
								txt=txt+"-name:                  class:               priority:\n";
								for (i = 0; i < cells.length; i++) {
									if ((cells[i].value.substring(0, 1) == pal))
									{ 
										if ((cells[i].value.substring(1, 2) == 'X') || (cells[i].value.substring(1, 2) == 'T')){
											var offset = 20 - cells[i+4].value.length;
											spaces = spaces+spaces.repeat(offset);
											txt=txt+k+'. '+cells[i+4].value+spaces;
											spaces = " ";
											offset = 20 - cells[i-137].value.length;
											spaces = spaces+spaces.repeat(offset);
											txt=txt+cells[i-137].value+spaces;
											spaces = spaces+spaces.repeat(offset);
											if (cells[i].value.substring(1, 2) == 'X')
												txt=txt+"HIGH\n";
											if (cells[i].value.substring(1, 2) == 'T')
												txt=txt+"NORMAL\n";
											k++;
											spaces=" ";
										}
									}
								}
								if (k==1)
									return message.reply("There are no devo tragets for you? :thinking:");
								else {
									message.channel.send("Sending devo targets of <@"+member.user.id+">. Check DM.");
									txt=txt+"```";
									return message.author.send(txt);
								}
							});
					}
				}
				if (name == "")
					return message.reply("<@"+member.user.id+"> is not in the roster :frowning:");
			});
		});
});
  }
  
  
  
  else if (command === "party")
  {
	var name="";
	var pt=0;
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		name="";
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 1,
				'max-col': 2,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == message.author.id)
					{
						name=cells[i-1].value;	
						sheet = info.worksheets[0];
							sheet.getCells({
								'min-row': 5,
								'max-row': 36,
								'min-col': 15,
								'max-col': 22,
								'return-empty': true
							}, function(err, cells) {
								var i;
								if (((cells[136].value == name) || (cells[138].value == name)))
								{
									pt=1;
									var spaces=" ";
									var txt="```diff\n";
									txt=txt+"+PARTY SETUP: \n\n";
									txt=txt+"-name:                   class:\n";
									var k=0;
									message.channel.send("Sending party setup. Check DM.");
								for (i = 0; i < cells.length; i++) {
									if (cells[i].value == name) {
										var lead = i+5;
										var i = lead;
										for (i; i < cells.length; i+=8) {
											k++;
											var offset = 20 - cells[i].value.length;
											spaces = spaces+spaces.repeat(offset);
											if (k < 10)
												spaces=spaces+" ";
											txt=txt+k+". "+cells[i].value+spaces+cells[i-141].value+"\n";
											spaces=" ";
										}
									}
								}
							}
							if (pt == 1)
							{
								txt=txt+"```";
								return message.author.send(txt);
							}
							else
								return message.reply("You are not a party leader :thinking:");
							});
					}
				}
				if (name == "")
					return message.reply("You are not in the roster :frowning:");
			});
		});
});
}
else if (command === "cparty")
  {
	if (admin == 0)
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights\n You can check available commands using: ```fix\n "+config.prefix+"help\n```");
    const p = parseInt(args[0], 10);
	if (!p || p < 1 || p >2)
		return message.reply("Provide valid party number (1 or 2)");
	var name="";
	var pt=0;
	doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[0];
			sheet.getCells({
				'min-row': 5,
				'max-row': 36,
				'min-col': 15,
				'max-col': 22,
				'return-empty': true
			}, function(err, cells) {
				var i;
				if (p == 1)
					name = cells[136].value;
				if (p == 2)
					name = cells[138].value;
				var spaces=" ";
				var txt="```diff\n";
				txt=txt+"+PARTY SETUP: \n\n";
				txt=txt+"-name:                   class:\n";
				var k=0;
				message.channel.send("Sending party setup. Check DM.");
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == name) {
						var lead = i+5;
						var i = lead;
						for (i; i < cells.length; i+=8) {
							k++;
							var offset = 20 - cells[i].value.length;
							spaces = spaces+spaces.repeat(offset);
							if (k < 10)
								spaces=spaces+" ";
							txt=txt+k+". "+cells[i].value+spaces+cells[i-141].value+"\n";
							spaces=" ";
						}
					}
				}
				txt=txt+"```";
				return message.author.send(txt);
			});
	});
	});
}

  else if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  else if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  else if(command === "purge") {
   if (admin == 0)
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights\n You can check available commands using: ```fix\n "+config.prefix+"help\n```");
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  else {
	  message.reply(" you are doing something wrong :slight_smile: use ```fix\n "+config.prefix+"help\n``` command for info!");
  }
});

client.login(config.token);