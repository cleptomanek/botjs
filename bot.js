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
  //client.user.setActivity('the sound of silence', { type: 'LISTENING' })
  client.user.setActivity(`${config.prefix}h for commands`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  //client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
 // client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if ((message.author.id == 444) || (message.author.id == 177107237053923328) || (message.author.id == 184327765070315521) || (message.author.id == 162610908307259392))
	var admin=1
else
	var admin=0
const week = 168;
const weeksec = 604800000;
var displaydate=0;
  if(command === "gstats" || command === "gs") {
	  var woedate=1554584400;
	  //var url = 'https://ragnarok.life/?server=Ragnarok.Life&module=ranking&action=woerank&woe_date=1554584400&opt=0&ser=0&ord=0';
	  if (args[0] === "-w" && args[1] != "") {
		  var firstwoe= new Date('2019-04-06 23:00').getTime();
			today = new Date().getTime();
			var diff = Math.abs(today - firstwoe);
			diff = Math.trunc(diff/weeksec);
			var wbehind = parseInt(args[1]);
			var arch = diff-wbehind;
			arch=(arch*weeksec)+firstwoe;
			arch=arch/1000;
			woedate=arch;
			args=args.splice(2);
			var d = new Date(0);
			d.setUTCSeconds(arch+3600);
			d=d.toString();
			displaydate=2;
	  }
	  if (args[0] === "-d" && args[1] != "") {
			var dd = new Date(args[1]);
			dd.setHours(dd.getHours() - 3);
			dd=dd/1000;
			woedate=dd;
			args=args.splice(2);
			var d = new Date(0);
			d.setUTCSeconds(dd+3600);
			d=d.toString();
			displaydate=2;
	  }
	  if (!args[0])
		  return message.channel.send("Write part of a guild name you want stats of.");
	  var url = 'https://ragnarok.life/?module=ranking&action=woerank&woe_date='+woedate+'&opt=101&server=Ragnarok.Life&buscar=';
	  gname = args.join("+");
	  const m = await message.channel.send("Pulling data...");
	  url+=gname;
	  var rlk,rhp,rhw,rhwfs,rws,rsnip,rsin,rpal,rchamp,rprof,rdlp,rstalk,rchem,rspp,rclown,rgyp,rslinger,rninja,rtaek,rsg,rlinker;
	  rlk=rhp=rhw=rhwfs=rws=rsnip=rsin=rpal=rchamp=rprof=rdlp=rstalk=rchem=rspp=rclown=rgyp=rslinger=rninja=rtaek=rsg=rlinker=0;
	  var kills, deaths, top, done, recv, supc, supw, healc, healw, emp, bar, stone, guard, demp, dbar, dstone, dguard, hp, sp, ygem, rgem, bgem, arrow, ad, poison, spirit, zeny,stat;
	  var gypsy, gypsyd,hw,ganb,sniper,chem,chemd,sniperd,sarrow,prof,dispel,disp;
		stat=kills=deaths=top=done=recv=supc=supw=healc=healw=emp=bar=stone=guard=demp=dbar=dstone=dguard=hp=sp=ygem=rgem=bgem=arrow=ad=poison=spirit=zeny=gypsyd=ganb=chemd=sniperd=sarrow=dispel=disp=0;
		request(url, function (error, response, body) {
			const $ = cheerio.load(body);
			fullname = $("#ladder_div table.battlerank-table:nth-child(1) tr.battlerank-header td:nth-child(3)").text().trim();
			if (fullname == "")
				return m.edit("No players found with guild name containing **"+gname+"** :frowning:");
			var i;
			$("#ladder_div table.battlerank-table").each (function () {
				i=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Lord Knight")
					rlk+=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "High Priest")
					rhp+=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "High Wizard") {
					hw = 1;
					rhw+=1;
				}
				else
					hw = 0;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Whitesmith")
					rws+=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Sniper") {
					sniper = 1;
					rsnip+=1;
				}
				else
					sniper = 0;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Assassin Cross")
					rsin+=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Paladin")
					rpal+=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Champion")
					rchamp+=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Professor") {
					rdlp+=1;
					prof = 1;
				}
				else
					prof = 0;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Stalker")
					rstalk+=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Creator") {
					chem = 1;
					rspp+=1;
				}
				else
					chem = 0;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Clown")
					rclown+=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Gypsy") {
					gypsy = 1;
					rgyp+=1;
				}
				else
					gypsy = 0;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Gunslinger")
					rslinger+=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Ninja")
					rninja+=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Taekwon")
					rtaek+=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Star Gladiator")
					rsg+=1;
				if ($("tr.battlerank-header td:nth-child(5)", this).text().trim() === "Soul Linker")
					rlinker+=1;
				
					
				$("table.stat-table", this).each (function () {
					$(".text-primary", this).each (function () { 
					if (i==1) {
						stat = parseInt($(this).html().replace(/,/g, ''));
						kills+=stat;
					}
					if (i==2) {
						stat = parseInt($(this).html().replace(/,/g, ''));
						if (gypsy==1)
							gypsyd+=stat;
						else
							deaths+=stat;
					}
					if (i==3) {
						stat = parseInt($(this).html().replace(/,/g, ''));
						top+=stat;
					}
					if (i==4) {
						stat = parseFloat($(this).html().replace(/,/g, ''));
						if ((chem==1) && (stat > 500000)) {
							chemd+=stat;
							rchem+=1;
							rspp=rspp-1;
						}
						if ((hw==1) && (stat < 500000)) {
							rhwfs+=1;
							rhw=rhw-1;
						}
						if (sniper==1)
							sniperd+=stat;
						done+=stat;
					}
					if (i==5) {
						stat = parseInt($(this).html().replace(/,/g, ''));
						recv+=stat;
					}
					/*if (i==6)
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
						dguard+=parseInt($(this).html().replace(/,/g, '')); */
					if (i==18) {
						stat = parseInt($(this).html().replace(/,/g, ''));
						hp+=stat;
					}
					if (i==19) {
						stat = parseInt($(this).html().replace(/,/g, ''));
						sp+=stat;
					}
					if (i==20) {
						stat = parseInt($(this).html().replace(/,/g, ''));
						if (hw == 1) 
							ganb+=stat;
						if (prof == 1)
							disp=stat;
						ygem+=stat;
					}
					if (i==21) {
						stat = parseInt($(this).html().replace(/,/g, ''));
						rgem+=stat;
					}
					if (i==22) {
						stat = parseInt($(this).html().replace(/,/g, ''));
						if ((prof == 1) && (stat <500)) {
							dispel+=disp;
							rprof+=1;
							rdlp=rdlp-1;
						}
						bgem+=stat;
					}
					if (i==23) {
						stat = parseInt($(this).html().replace(/,/g, ''));
						if (sniper == 1)
							sarrow+=stat;
						arrow+=stat;
					}
					if (i==24) {
						stat = parseFloat($(this).html().replace(/,/g, ''));
						ad+=stat;
					}
					/*if (i==25)
						poison+=parseInt($(this).html().replace(/,/g, ''));
					if (i==26)
						spirit+=parseInt($(this).html().replace(/,/g, ''));
					if (i==27)
						zeny+=parseInt($(this).html().replace(/,/g, '')); */
					i++;
					});
				}); 
			});
var fas = sniperd/sarrow;
var add = chemd/ad;
fas = Math.round(fas);
add = Math.round(add);
fas = fas.toLocaleString().split(',').join('.');
add = add.toLocaleString().split(',').join('.');
kills = kills.toLocaleString().split(',').join('.');
deaths = deaths.toLocaleString().split(',').join('.');
done = done.toLocaleString().split(',').join('.');
recv = recv.toLocaleString().split(',').join('.');
ad = ad.toLocaleString().split(',').join('.');
hp = hp.toLocaleString().split(',').join('.');
sp = sp.toLocaleString().split(',').join('.');
ganb = ganb.toLocaleString().split(',').join('.');
gypsyd = gypsyd.toLocaleString().split(',').join('.');
dispel = dispel.toLocaleString().split(',').join('.');
var spaces=" ";
var offset;
var gap="";
spaces = " ";
var txt = "```diff\n"
if (displaydate!=0)
	txt+="-ARCHIVE WOE DATE: "+d+"\n\n"
txt+="-GUILD STATS FOR: "+fullname+"\n\n\n"
txt+="--- Basic info:\n";
txt+="!kills:             ";
txt+="deaths:             ";
txt+="damage done:        ";
txt+="received:           \n";
offset = 20 - kills.length;
gap=spaces.repeat(offset);
txt+=kills+gap;
offset = 20 - deaths.length;
gap=spaces.repeat(offset);
txt+=deaths+gap;
offset = 20 - done.length;
gap=spaces.repeat(offset);
txt+=done+gap;
offset = 20 - recv.length;
gap=spaces.repeat(offset);
txt+=recv+gap;
txt+="\n\n--- Additional stuff:\n";
txt+="!ad used:           ";
txt+="hp potions:         ";
txt+="sp potions:         ";
txt+="gypsy deaths:       \n";
offset = 20 - ad.length;
gap=spaces.repeat(offset);
txt+=ad+gap;
offset = 20 - hp.length;
gap=spaces.repeat(offset);
txt+=hp+gap;
offset = 20 - sp.length;
gap=spaces.repeat(offset);
txt+=sp+gap;
offset = 20 - gypsyd.length;
gap=spaces.repeat(offset);
txt+=gypsyd+gap;
txt+="\n\n!dmg per ad:        ";
txt+="dmg per fas:        ";
txt+="ganb used:          ";
txt+="dispel used:        \n";
offset = 20 - add.length;
gap=spaces.repeat(offset);
txt+=add+gap;
offset = 20 - fas.length;
gap=spaces.repeat(offset);
txt+=fas+gap;
offset = 20 - ganb.length;
gap=spaces.repeat(offset);
txt+=ganb+gap;
offset = 20 - dispel.length;
gap=spaces.repeat(offset);
txt+=dispel+gap;

txt+="\n\n--- Roster composition:\n";
txt+="+class:                        count:\n";
if (rlk > 0)
txt+="Lord Knight:                   "+rlk+"\n";
if (rhp > 0)
txt+="High Priest:                   "+rhp+"\n";
if (rhw > 0)
txt+="DD High Wizard:                "+rhw+"\n";
if (rhwfs > 0)
txt+="FS High Wizard:                "+rhwfs+"\n";
if (rws > 0)
txt+="Whitesmith:                    "+rws+"\n";
if (rsnip > 0)
txt+="Sniper:                        "+rsnip+"\n";
if (rsin > 0)
txt+="Assassin Cross:                "+rsin+"\n";
if (rpal > 0)
txt+="Paladin:                       "+rpal+"\n";
if (rchamp > 0)
txt+="Champion:                      "+rchamp+"\n";
if (rprof > 0)
txt+="Dispel Prof:                   "+rprof+"\n";
if (rdlp > 0)
txt+="DLP Prof:                      "+rdlp+"\n";
if (rstalk> 0)
txt+="Stalker:                       "+rstalk+"\n";
if (rchem > 0)
txt+="DD Chem:                       "+rchem+"\n";
if (rspp > 0)
txt+="SPP Chem:                      "+rspp+"\n";
if (rclown > 0)
txt+="Clown:                         "+rclown+"\n";
if (rgyp > 0)
txt+="Gypsy:                         "+rgyp+"\n";
if (rslinger > 0)
txt+="Gunslinger:                    "+rslinger+"\n";
if (rninja > 0)
txt+="Ninja:                         "+rninja+"\n";
if (rtaek > 0)
txt+="Taekwon:                       "+rtaek+"\n";
if (rsg > 0)
txt+="Star Gladiator:                "+rsg+"\n";
if (rlinker > 0)
txt+="Soul Linker:                   "+rlinker+"\n";
var total = rlk+rhp+rhw+rhwfs+rws+rsnip+rsin+rpal+rchamp+rprof+rdlp+rstalk+rchem+rspp+rclown+rgyp+rslinger+rninja+rtaek+rsg+rlinker;
txt+="+TOTAL:                        "+total+"\n";
txt+="\n```";
return m.edit(txt);
});
return
}

else if (command === 'compare' || command === 'cmp')
{
var job = args[0];
if (!(job == 'chem' || job == 'creo' || job == 'creator' || job == 'biochem' || job == 'wiz'|| job == 'wizard' || job == 'snip'|| job == 'sniper'))
	return message.channel.send('Provide a valid DD class ("Creator", "Wizard" or "Sniper")');
const m = await message.channel.send("Pulling data...");
var jobid, jobtext;
if (job == 'chem' || job == 'creo' || job == 'creator' || job == 'biochem'){
	job = 'chem';
	jobid = '4019';
	jobtext = 'DD CHEMS:';
}
if (job == 'snip' || job == 'sniper') {
	job = 'snip';
	jobid = '4012';
	jobtext = 'SNIPERS:';
}
if (job == 'wiz' || job == 'wizard') {
	job = 'wiz';
	jobid = '4010';
	jobtext = 'DD WIZARDS:';
}
var url = 'https://ragnarok.life/?module=ranking&action=woerank&woe_date=1554584400&opt='+jobid+'&server=Ragnarok.Life';
var kills, deaths, top, done, recv, hp, sp, ygem, bgem, arrow, ad,name,add,dd,donef,guild;
kills=deaths=top=done=recv=hp=sp=ygem=bgem=arrow=add=ad=donef=0;
var spaces=" ";
var offset;
var gap="";
var txt="";
txt=txt+"```diff\n"
txt+="-COMPARING "+jobtext+"\n\n"
txt+="!name:                   ";
txt+="guild:                   ";
txt+="K:   ";
txt+="D:   ";
if (job == 'wiz')
txt+="top dmg:    ";
txt+="dmg done:    ";
txt+="received:    ";
if (job == 'wiz')
txt+="ganb used:\n";
if (job == 'snip') {
txt+="fas used:  ";
txt+="dmg/fas:\n";
}
if (job == 'chem') {
txt+="ad used:  ";
txt+="dmg/ad:\n";
}
request(url, function (error, response, body) {
	const $ = cheerio.load(body);
	var i;
	var j=1;
	$("#ladder_div table.battlerank-table").each (function () {
		i=1;
		name=$(".battlerank-header td:nth-child(4) b > b",this).text();
		 if (name == "")
			 name=$(".battlerank-header td:nth-child(4) b",this).text();
		guild=$(".battlerank-header td:nth-child(3)",this).text().trim();
		if ((parseInt($("div.row div.col-10 div.row div.col-7 tr:nth-child(2) td:nth-child(2) .text-primary", this).html().replace(/,/g, ''))) < 500000)
			dd=0;
		else
			dd=1;
		if (dd == 1) {
			offset = 25 - name.length;
			gap=spaces.repeat(offset);
			txt+=name+gap;
			offset = 25 - guild.length;
			gap=spaces.repeat(offset);
			txt+=guild+gap;
		}
		$("table.stat-table", this).each (function () {
			$(".text-primary", this).each (function () { 
			if (dd == 1) {
				if (i==1) {
					kills=parseInt($(this).html());
					kills = kills.toLocaleString().split(',').join('.');
					offset = 5 - kills.length;
					gap=spaces.repeat(offset);
					txt+=kills+gap;
				}
				if (i==2) {
					deaths=parseInt($(this).html());
					deaths = deaths.toLocaleString().split(',').join('.');
					offset = 5 - deaths.length;
					gap=spaces.repeat(offset);
					txt+=deaths+gap;
				}
				if (i==3 && job == 'wiz') {
					top=parseInt($(this).html().replace(/,/g, ''));
					top = top.toLocaleString().split(',').join('.');
					offset = 12 - top.length;
					gap=spaces.repeat(offset);
					txt+=top+gap;
				}
				if (i==4) {
					donef=parseFloat($(this).html().replace(/,/g, ''));
					done = donef.toLocaleString().split(',').join('.');
					offset = 13 - done.length;
					gap=spaces.repeat(offset);
					txt+=done+gap;
				}
				if (i==5) {
					recv=parseInt($(this).html().replace(/,/g, ''));
					recv = recv.toLocaleString().split(',').join('.');
					offset = 13 - recv.length;
					gap=spaces.repeat(offset);
					txt+=recv+gap;
				}
				if (i==20 && job == 'wiz') {
					ygem=parseInt($(this).html().replace(/,/g, ''));
					ygem = ygem.toLocaleString().split(',').join('.');
					txt+=ygem+'\n';
				}
				if (i==23 && job == 'snip') {
					arrow=parseFloat($(this).html().replace(/,/g, ''));
					fas=donef/arrow;
					arrow = arrow.toLocaleString().split(',').join('.');
					fas = Math.round(fas);
					fas = fas.toLocaleString().split(',').join('.');
					offset = 11 - arrow.length;
					gap=spaces.repeat(offset);
					txt+=arrow+gap;
					txt+=fas;
					txt+="\n";
					j++;
				}
				if (i==24 && job == 'chem'){
					ad=parseFloat($(this).html().replace(/,/g, ''));
					add=donef/ad;
					ad = ad.toLocaleString().split(',').join('.');
					add = Math.round(add);
					add = add.toLocaleString().split(',').join('.');
					offset = 10 - ad.length;
					gap=spaces.repeat(offset);
					txt+=ad+gap;
					txt+=add;
					txt+="\n";
					j++;
				}
				if (i==25) {
					if (j>10) {
						txt+="```";
						m.edit(txt);
						txt="";
						j=1;
						txt=txt+"```diff\n"
					}
				}
			}
			i++;
			});
		}); 
	});
txt+="```";
return message.channel.send(txt);
});
return
}
  
  else if(command === "help" || command === "h") {
	  var txt="";
	  txt=txt+"```diff\n"
	  txt=txt+"-USER COMMANDS: \n\n\n"
	  txt=txt+""+config.prefix+"woeinfo (alternative: "+config.prefix+"wi)\n"
	  txt=txt+"+Displays basic woe info \n\n"
	  txt=txt+""+config.prefix+"yes \n"
	  txt=txt+"+Put your attendance on 'yes' for next woe \n\n"
	  txt=txt+""+config.prefix+"no \n"
	  txt=txt+"+Put your attendance on 'no' for next woe \n\n"
	  txt=txt+""+config.prefix+"check \n"
	  txt=txt+"+Checks your attendance status for next woe \n\n"
	  txt=txt+""+config.prefix+"build \n"
	  txt=txt+"+Gets you a build for next woe (if it is available) \n\n"
	  txt=txt+""+config.prefix+"comment (alternative: "+config.prefix+"cmt)\n"
	  txt=txt+"+Lets you put a comment on the roster sheet \n\n"
	  txt=txt+""+config.prefix+"devo \n"
	  txt=txt+"+Gets you your devo targets \n\n"
	  txt=txt+""+config.prefix+"party (alternative: "+config.prefix+"pt)\n"
	  txt=txt+"+Gets you party setup if you are a party leader \n\n"
	  txt=txt+""+config.prefix+"gstats (guildname - can be just a part of it) (alternative: "+config.prefix+"gs)\n"
	  txt=txt+"+Gets you woe stats of specified guild ***will be ready after first woe - pulls from ragnarok.life as for now***\n---ex. '?gstats worst', '?gs 'pique', '?gs worst players', '?gstats love' \n"
	  txt=txt+"+You can use this command to get archive woe data aswell using -d and -w options. -w specifies how many weeks ago from current date woe occured and -d lets you provide exact date of woe\n"
	  txt=txt+"---ex. '?gs -w 3 guildname' (pulls woe from 3 weeks ago for specified guildname), '?gs -d 2019-09-08 guildname' (woe from 08 september 2019 for guildname - format is RRRR/MM/DD) \n\n"
	  txt=txt+""+config.prefix+"compare (dd class) (alternative: "+config.prefix+"cmp)\n"
	  txt=txt+"+Compares DD classes stats (use command with class name ***will be ready after first woe - pulls from ragnarok.life as for now***\n---ex. '?cmp chem', '?compare 'sniper', '?compare creo', '?cmp wiz' "
	  txt=txt+"```"
	  message.author.send(txt);
	  txt="```diff\n"
	  txt=txt+"-ADMIN COMMANDS: \n\n\n"
	  txt=txt+""+config.prefix+"getusers (alternative: "+config.prefix+"gusers)\n"
	  txt=txt+"+Gets all users from server into roster sheet. Use ONLY when creating attendance from scratch. \n\n"
	  txt=txt+""+config.prefix+"cleanusers (alternative: "+config.prefix+"cusers)\n"
	  txt=txt+"+Cleans all users on roster sheet. \n\n"
	  txt=txt+""+config.prefix+"forceyes @username (alternative: "+config.prefix+"fyes)\n"
	  txt=txt+"+Forces 'yes' for specified user. \n\n"
	  txt=txt+""+config.prefix+"forceno @username (alternative: "+config.prefix+"fno)\n"
	  txt=txt+"+Forces 'no' for specified user. \n\n"
	  txt=txt+""+config.prefix+"fcheck @username \n"
	  txt=txt+"+Forces attendance check on specified user. \n\n"
	  txt=txt+""+config.prefix+"cdevo @username \n"
	  txt=txt+"+Checks devo targets of specified user. \n\n"
	  txt=txt+""+config.prefix+"cparty (1-2) (alternative: "+config.prefix+"cpt)\n"
	  txt=txt+"+Checks party setup of specified party. \n\n"
	  txt=txt+""+config.prefix+"add @username \n"
	  txt=txt+"+Adds specified user into roster sheet. \n\n"
	  txt=txt+""+config.prefix+"remove @username (alternative: "+config.prefix+"rmv)\n"
	  txt=txt+"+Removes specified user from roster sheet. \n\n"
	  txt=txt+""+config.prefix+"purge (1-100) \n"
	  txt=txt+"+Purges from 1 to 100 messages on channel. \n\n\n\n"
	  txt=txt+"```"
	  txt=txt+"If you want some new commands or something doesnt work - DM clepto"
	  message.reply("Sending commands info. Check your DM.");
	return message.author.send(txt);
  }
  if(command === "woeinfo" || command === "wi") {
	 const m = await message.channel.send("Checking roster sheet...");
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
				return m.edit(txt);
			});
	});
	});
  }
  else if(command === "getusers" || command === "gusers") {
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
  else if(command === "cleanusers" || command === "cusers") {
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
  else if(command === "cleanatt" || command === "catt") {
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
  
  else if(command === "comment"  || command === "cmt") {
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
  
  else if(command === "forceyes"  || command === "fyes") {
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
  else if(command === "forceno" || command === "fno") {
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
  
  else if(command === "remove" || command === "rmv") {
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
	const m = await message.channel.send("Checking roster sheet...");
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
									return m.edit("<@"+message.author.id+">, You are not a paladin or you're not in the party setup yet :frowning:");
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
									return m.edit("<@"+message.author.id+">, There are no devo tragets for you? :thinking:");
								else {
									m.edit("Sending devo targets. Check DM.");
									txt=txt+"```";
									return message.author.send(txt);
								}
							});
					}
				}
				if (name == "")
					return m.edit("<@"+message.author.id+">, You are not in the roster :frowning:");
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
	const m = await message.channel.send("Checking roster sheet...");
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
									return m.edit("<@"+member.user.id+"> is not a paladin or is not in the party setup yet :frowning:");
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
									return m.edit("There are no devo tragets for <@"+member.user.id+">? :thinking:");
								else {
									m.edit("Sending devo targets of <@"+member.user.id+">. Check DM.");
									txt=txt+"```";
									return message.author.send(txt);
								}
							});
					}
				}
				if (name == "")
					return m.edit("<@"+member.user.id+"> is not in the roster :frowning:");
			});
		});
});
  }
  
  
  
  else if (command === "party" || command === "pt")
  {
	var name="";
	var pt=0;
	const m = await message.channel.send("Checking roster sheet...");
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
									m.edit("Sending party setup. Check DM.");
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
								return m.edit("<@"+message.author.id+">, You are not a party leader :thinking:");
							});
					}
				}
				if (name == "")
					return m.edit("<@"+message.author.id+">, You are not in the roster :frowning:");
			});
		});
});
}
else if (command === "cparty" || command === "cpt")
  {
	if (admin == 0)
      return message.reply("Sorry, you are not allowed to use admin commands :clown: Ask clepto if you think you should have rights\n You can check available commands using: ```fix\n "+config.prefix+"help\n```");
    const p = parseInt(args[0], 10);
	if (!p || p < 1 || p >2)
		return message.reply("Provide valid party number (1 or 2)");
	const m = await message.channel.send("Checking roster sheet...");
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
				m.edit("Sending party setup. Check DM.");
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