const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const doc = new GoogleSpreadsheet('1xmcvAWDdlpyb2WA19s3L2aXt5guEmMV6fG_KYQbVhWU');
//const doc = new GoogleSpreadsheet('1Q47r52ICYGl2QQo5x45N3pzKOdO9lz9hGCb5hF6aeWc'); //test sheet
var sheet;
const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require('moment');


//!!! IMPORTANT STUFF !!!
//FOR 32 ROW, 8 COL PULL - IT WILL CHANGE WHEN CHANGING SIZES OF PARTY WINDOWS
//UPPER LEFT CORNER SHOULD HAVE CLASS NAMES
//LOWER LEFT CORNER SHOULD HAVE NAMES
//LOWER LEFT CORNER SHOULD HAVE INGAME NAMES
//UPPER RIGHT WHATEVER (doesnt read from it)

const ptl1 = 136; //party leader1 NAME cell (not ingame)
const ptl2 = 138; //party leader2 NAME cell (not ingame)
const icgap = 141; //gap in cells between ingame name and class
const ingap = 5; //ingame name and name
const idgap = 4; //ingame name and devo symbol 
const cngap = icgap-ingap; //class and name
const cdgap = icgap-idgap; //class and devo symbol

//const config = require("./config.json"); //for local deploy
//const creds = require('./client_secret.json'); //for local deploy
var pkey = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCePbSWPBO0YinZ\nyBHAb/bSZ9wK0hUiNsIPNtg2l66lo';
pkey+='PsXQeoiC2qZvTlR0QcfAI553n0ciDxCgYBs\nJbI9pk76xRnp/bItqByDbiCUY+dE8y6cTfP3kMIR3GLrCSWf2N3X4udPmeTTDAAq\n0xvNBkeYNzTj4K0IzL2rffkJqFMtpM3';
pkey+='VJYn1G6+1cj8xzWJ7KXpm3NwwNYbxOkDc\nqiLY4NcYjzPdMjAKXXfslpKWi8p5M/L7aWe1cVt4Vs4e/thMrly8U8beT7J9vpTO\nfm7CUm5bKSaX5BSmIYYq7g2ime71FzCqd6';
pkey+='Re0BLqS7To7B/3faS/p7XqIYW1y2O7\n7BK7yMs/AgMBAAECggEAL/byOyugqWer2dh8EQGfJi3XE+yT/VftwKDWLs4RYSEH\nmwgeyQz+1fT2X+dlKi+IAEbBU5mz8lDAtYdDnM';
pkey+='5BWF/QOA3vKUmwwuHpvDEAE/VG\nZph2X88gFDviO+382pPowpyDkqxKIPKdRl3RKndB0lDBlmUu7eDpiQbZKuU7uTSm\nCACxupBjAe2L1TnbWvl7u0THqyjAanKVK57J03kjhCEA';
pkey+='ol6YNubu2lmGsh/7dcMJ\njZaUvgBccMKAYUp6Cq8JPdy3Lktn+JBqfn5taaeZtwVGQHKCB/7eKVp37yTMADcm\n3ny9X4RDLTYUzB4nuW0v7U7LWfidJ3GaxoMvQPcyQQKBgQDTnshXM';
pkey+='nc202qVPTkZ\n3UA0DSYr8LR6V9DBILL5JM0xSH0TGEVKLPfkqv6C1WFPFhreNF0O+BNGsaCGGsyJ\nepcbaXpqSzYMx13e3bCa6MJCmBED0w0vRDDew5EeN3YhYXJqEOUuNZKJ41iQvUW';
pkey+='t\nptQdGYspWKw1lhN4la8cpe+34QKBgQC/bSm+dv6OyWido2vFudOW/M4DxPgeGOPk\nQAgns9ut/hiwxsqCBd92qAcbrfSh8sF1Xs28xh3O3N2Samexw8+hWIuw8hHY5mB3\nEPH2vyui';
pkey+='gfatfO7iq3l5GRRQN7ln/Qta6HINdsKi0h9ocXWoj9KOt6rM0Bbmu76K\nJcMHEYZnHwKBgBtNJd2SBi1NkzeTwXUjxS+x7pXGpRIPmEACPvTDmbFc/73h6LaM\nHKMkqFcqvjYczPST3tmai';
pkey+='aoaKnKCrJaj+TCxJ/jkoSF+6w5gnXMuyjkbMz7CELZj\nXsauhl9WmmfuEXu7mEWg5bniWb+6m22u0zi53elEplr3dKWe8guJIOchAoGBALhJ\nqrdvrY/fPLUOYDHhvV8NkHQ2izvGcJcMQg2';
pkey+='e7K2sAy8kok7cwo5kIzu1k97Zav/I\nvj6vaID/RtyvTZbo0RoeuZUm5qGu4E2gZaFL2AFCJy5MKVrVBEPeLh0wGHGRPf5N\n64ckvyqrKYuON1yI4Yd+MJOu/W0yb7RluEU0zPS3AoGAHJ4kR';
pkey+='qf20yQKnHl9FfHv\nkn++FqTOnGIZVxWqZH77OpxkdRzETzLEIGIjAt0E9x3NxYtaC/Ttyq1U1ZPFfhXr\nDIh/ZS2FQXwkU53PLMBksqesk0GqwpI2mq7LXuscb0p3lsIxrDtBAp5kgn+a66Dm';
pkey+='\nDFZuJwSI1xrcaRvy1JF8Pv8=\n-----END PRIVATE KEY-----\n';
const creds = {
  "type": "service_account",
  "project_id": "attendance-254008",
  "private_key_id": process.env.pkeyid,
  "private_key": pkey,
  "client_email": "clepto@attendance-254008.iam.gserviceaccount.com",
  "client_id": "107710444065339479409",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/clepto%40attendance-254008.iam.gserviceaccount.com"
};
const config = {
"token": process.env.token,
"prefix": "?"
} 

//STUFF 
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

const week = 168; //helper numbers for date calculation
const weeksec = 604800000;
client.on("message", async message => {
	var admin = 0;
	var displaydate=0;
	if(message.author.bot) return; //dont respond to own messages
	if(message.content.indexOf(config.prefix) !== 0) return; //ignore messages without prefix
	var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	if ((message.author.id == 444) || (message.author.id == 177107237053923328) || (message.author.id == 184327765070315521) || (message.author.id == 162610908307259392)) //admin ids
		admin=1;

if (command === "bot-status") {
	client.user.setActivity(`${config.prefix}h for commands`);
	return message.channel.send(`Bot is serving ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
}
//BG RANKS 
else if(command === "bgranks" || command === "bg") { 
if (!args[0])
	return message.channel.send('Provide class name with this command');
var job = args[0].toLowerCase();
var jobid, jobtext;
if (job == 'gunslinger' || job == 'slinger') {
	jobid = '24';
	jobtext = 'GUNSLINGERS';
}
else if (job == 'ninja') {
	jobid = '25';
	jobtext = 'NINJAS';
}
else if (job == 'lk' || job == 'lord') {
	jobid = '4008';
	jobtext = 'LORD KNIGHTS';
}
else if (job == 'hp' || job == 'priest') {
	jobid = '4009';
	jobtext = 'HIGH PRIESTS';
}
else if (job == 'wiz' || job == 'wizard'|| job == 'hw') {
	jobid = '4010';
	jobtext = 'WIZARDS';
}
else if (job == 'ws' || job == 'whitesmith'|| job == 'smith') {
	jobid = '4011';
	jobtext = 'WHITESMITHS';
}
else if (job == 'snip' || job == 'sniper') {
	jobid = '4012';
	jobtext = 'SNIPERS';
}
else if (job == 'sinx' || job == 'assassin') {
	jobid = '4013';
	jobtext = 'ASSASSIN CROSSES';
}
else if (job == 'pala' || job == 'paladin' || job == 'pal') {
	jobid = '4015';
	jobtext = 'PALADINS';
}
else if (job == 'champ' || job == 'champion') {
	jobid = '4016';
	jobtext = 'CHAMPIONS';
}
else if (job == 'prof' || job == 'professor') {
	jobid = '4017';
	jobtext = 'PROFESSORS';
}
else if (job == 'stalker' || job == 'stalk') {
	jobid = '4018';
	jobtext = 'STALKERS';
}
else if (job == 'chem' || job == 'creo' || job == 'creator' || job == 'biochem'){
	jobid = '4019';
	jobtext = 'CHEMS';
}
else if (job == 'clown') {
	jobid = '4020';
	jobtext = 'CLOWNS';
}
else if (job == 'gyp' || job == 'gypsy'){
	jobid = '4021';
	jobtext = 'GYPSIES';
}
else if (job == 'sl' || job == 'linker'){
	jobid = '4049';
	jobtext = 'SOUL LINKERS';
}
else
	return message.channel.send('Provide valid class name (ninja, gunslinger, lk, hp, hw, ws, snip, sinx, pala, champ, prof, stalk, chem, clown, gypsy, sl)');
const m = await message.channel.send("Pulling data...");
var offset;
var gap="";
var name,guild,w,l,r,k,d,top,done,recv;
var url = 'http://ragnaland.com/?module=ranking&action=bg&jobclass='+jobid;
var txt = "```diff\n"
var j=1;
var section=0;
txt+="-BG RANKS FOR: "+jobtext+"\n"
txt+="!name:                   ";
txt+="guild:                   ";
txt+="W:   ";
txt+="L:   ";
txt+="W%:  ";
txt+="K:     ";
txt+="D:     ";
txt+="TOP:     ";
txt+="DONE:         ";
txt+="RECV:    \n";
		request(url, function (error, response, body) {
			const $ = cheerio.load(body);
			$("div.rankingbg > div > table").each (function () {
				name=$("> tbody > tr:nth-child(1) > th:nth-child(2) > span", this).text().trim();
				offset = 25 - name.length;
				gap=" ".repeat(offset);
				txt+=name+gap;	
				guild=$("> tbody > tr:nth-child(2) > th", this).text().trim();
				offset = 25 - guild.length;
				gap=" ".repeat(offset);
				txt+=guild+gap;
				w = $("> tbody > tr:nth-child(3) table table tr:nth-child(1) td:nth-child(1) table tr:nth-child(2) td:nth-child(1)", this).text().trim().replace(/[^0-9]/gi, '');
				offset = 5 - w.length;
				w=parseFloat(w);
				gap=" ".repeat(offset);
				txt+=w+gap;	
				l = $("> tbody > tr:nth-child(3) table table tr:nth-child(1) td:nth-child(1) table tr:nth-child(2) td:nth-child(3)", this).text().trim().replace(/[^0-9]/gi, '');
				offset = 5 - l.length;
				l=parseFloat(l);
				gap=" ".repeat(offset);
				txt+=l+gap;
				r=w/(w+l)*100;
				r=r.toFixed(0)
				offset = 5 - r.length;
				gap=" ".repeat(offset);
				txt+=r+gap;		
				k = $("> tbody > tr:nth-child(3) table table tr:nth-child(2) td:nth-child(1) table tr:nth-child(2) td:nth-child(1)", this).text().trim().replace(/[^0-9]/gi, '');
				offset = 7 - k.length;
				k=parseFloat(k);
				gap=" ".repeat(offset);
				txt+=k+gap;		
				d = $("> tbody > tr:nth-child(3) table table tr:nth-child(2) td:nth-child(1) table tr:nth-child(2) td:nth-child(2)", this).text().trim().replace(/[^0-9]/gi, '');
				offset = 7 - d.length;
				d=parseFloat(d);
				gap=" ".repeat(offset);
				txt+=d+gap;			
				top = parseFloat($("> tbody > tr:nth-child(3) table table tr:nth-child(2) td:nth-child(2) table tr:nth-child(2) td:nth-child(1)", this).text().trim().replace(/[^0-9]/gi, ''));
				top = top.toLocaleString().split(',').join('.');
				offset = 9 - top.length;
				gap=" ".repeat(offset);
				txt+=top+gap;
				done = parseFloat($("> tbody > tr:nth-child(3) table table tr:nth-child(2) td:nth-child(2) table tr:nth-child(2) td:nth-child(2)", this).text().trim().replace(/[^0-9]/gi, ''));
				done = done.toLocaleString().split(',').join('.');
				offset = 14 - done.length;
				gap=" ".repeat(offset);
				txt+=done+gap;				
				recv = parseFloat($("> tbody > tr:nth-child(3) table table tr:nth-child(2) td:nth-child(2) table tr:nth-child(2) td:nth-child(3)", this).text().trim().replace(/[^0-9]/gi, ''));
				recv = recv.toLocaleString().split(',').join('.');
				txt+=recv;
				txt+='\n';	
				j++;
				if (j>10) {
					txt+="```";
					if (section>0)
						message.channel.send(txt);
					else
						 m.edit(txt);
					txt="";
					j=1;
					txt+="```diff\n"
					section++;
				}
			});
			txt+="```";
			if (section == 0 && j!=1)
				m.edit(txt);
			else if (j!=1)
				return message.channel.send(txt);
		});
return
}
//WOE GUILD STATS 
else if(command === "gstats" || command === "gs") { 
var woedate=1554584400; //default for tests
  //var url = 'https://ragnarok.life/?server=Ragnarok.Life&module=ranking&action=woerank&woe_date=1554584400&opt=0&ser=0&ord=0';
if (args[0] === "-w" && args[1] != "") {
	var firstwoe= new Date('2019-04-06 23:00').getTime();
	today = new Date().getTime();
	var diff = Math.abs(today - firstwoe);
	diff = Math.trunc(diff/weeksec);
	var wbehind = parseInt(args[1]);
	diff = diff-wbehind;
	diff=(diff*weeksec)+firstwoe;
	diff=diff/1000;
	woedate=diff;
	args=args.splice(2);
	var d = new Date(0);
	d.setUTCSeconds(diff+3600); // fix date from 23:00 to 0:00
	d=d.toString();
	displaydate=1;
  }
if (args[0] === "-d" && args[1] != "") {
	var dwoe = new Date(args[1]);
	//dwoe.setHours(dwoe.getHours() - 3); //for local
	dwoe.setHours(dwoe.getHours() - 1); // need to set 23:00
	dwoe=dwoe/1000;
	woedate=dwoe;
	args=args.splice(2);
	var d = new Date(0);
	d.setUTCSeconds(dwoe+3600); // go back to 0:00
	d=d.toString();
	displaydate=1;
  }
//if (!args[0])
	//return message.channel.send("Write part of a guild name you want stats of.");
	/*
	var firstwoe= new Date('2019-04-06 23:00').getTime();
	today = new Date().getTime();
	var diff = Math.abs(today - firstwoe);
	diff = Math.trunc(diff/weeksec); // cut off to full weeks
	diff=(diff*weeksec)+firstwoe;
	diff=diff/1000;
	woedate=diff;

	today.setHours(today.getHours() - 3); //for time adjust if needed
	FOR CURRENT WOE!!!!*/ 
var url = 'https://ragnarok.life/?module=ranking&action=woerank&woe_date='+woedate+'&opt=101&server=Ragnarok.Life&buscar=';
const m = await message.channel.send("Pulling data...");
if (!args[0]) { //list guild names when no args provided
	var txt = "```diff\n"
	if (displaydate!=0)
		txt+="-ARCHIVE WOE DATE: "+d+"\n\n"
	txt+="-GUILDS PARTICIPATED IN WOE:\n"
	request(url, function (error, response, body) {
		const $ = cheerio.load(body);
		var gnames = [];
		gnames.push($("#ladder_div table.battlerank-table:nth-child(1) tr.battlerank-header td:nth-child(3)").text().trim()); //get first guild name
		if (gnames[0] == "") //if first is blank it means no guilds participated
			return m.edit("No guilds participated in selected woe :frowning:");
		$("#ladder_div table.battlerank-table").each (function () { //check rest of guild names
			$("tr.battlerank-header td:nth-child(3)", this).each (function () {
				for (var i = 0; i < gnames.length; i++) { //check if guildname is already there
					if ($(this).text().trim() == gnames[i]) //break out of loop if guild name is found
						break;
					if (i+1 == gnames.length) { //add new name if it wasnt found
						gnames.push($(this).text().trim());
						txt+=$(this).text().trim()+"\n";
					}
				}
			});
		});		
		txt+='```';
		message.channel.send('Guild name was not provided - listed all guilds that participated in selected woe.');
		return m.edit(txt);
	});
	return
}
gname = args.join("+");
url+=gname;
var rlk=rhp=rhw=rhwfs=rws=rsnip=rsin=rpal=rchamp=rprof=rdlp=rstalk=rchem=rspp=rclown=rgyp=rslinger=rninja=rtaek=rsg=rlinker=0; //roster vars
var gypsy,hw,sniper,chem,prof; //class checks
var stat=kills=deaths=top=done=recv=supc=supw=healc=healw=emp=bar=stone=guard=demp=dbar=dstone=dguard=hp=sp=ygem=rgem=bgem=arrow=ad=poison=spirit=zeny=gypsyd=ganb=chemd=sniperd=sarrow=dispel=disp=0; //stat vars
	request(url, function (error, response, body) {
		const $ = cheerio.load(body);
		fullname = $("#ladder_div table.battlerank-table:nth-child(1) tr.battlerank-header td:nth-child(3)").text().trim(); //guild full name
		if (fullname == "")
			return m.edit("No players found with guild name containing **"+gname+"** :frowning:");
		var i;
		$("#ladder_div table.battlerank-table").each (function () {
			i=1;
			//classname checks for roster composition and class-specific stats
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
			
			//get stats	
			$("table.stat-table", this).each (function () {
				$(".text-primary", this).each (function () { 
				if (i<6 || (i>17 && i<25)) //ignore not needed stats
					stat = parseFloat($(this).html().replace(/,/g, ''));
				if (i==1) {
					kills+=stat;
				}
				if (i==2) {
					if (gypsy==1)
						gypsyd+=stat; //gypsy deaths
					else
						deaths+=stat;
				}
				if (i==3) {
					top+=stat;
				}
				if (i==4) {
					if ((chem==1) && (stat > 500000)) { //check for dd chem
						chemd+=stat;
						rchem+=1;
						rspp=rspp-1;
					}
					if ((hw==1) && (stat < 500000)) { //check for fs wiz
						rhwfs+=1;
						rhw=rhw-1;
					}
					if (sniper==1)
						sniperd+=stat;
					done+=stat;
				}
				if (i==5) {
					
					recv+=stat;
				}
				/*if (i==6) supc+=stat;
				if (i==7) supw+=stat;
				if (i==8) healc+=stat;
				if (i==9) healw+=stat;
				if (i==10) emp+=stat;
				if (i==11) bar+=stat;
				if (i==12) stone+=stat;
				if (i==13) guard+=stat;
				if (i==14) demp+=stat;
				if (i==15) dbar+=stat;
				if (i==16) dstone+=stat;
				if (i==17) dguard+=stat; */
				if (i==18) {
					hp+=stat;
				}
				if (i==19) {				
					sp+=stat;
				}
				if (i==20) {						
					if (hw == 1) 
						ganb+=stat;
					if (prof == 1)
						disp=stat;
					ygem+=stat;
				}
				if (i==21) {						
					rgem+=stat;
				}
				if (i==22) {						
					if ((prof == 1) && (stat <500)) { //check for dispel prof (shouldnt have more than 500 blue gems used)
						dispel+=disp;
						rprof+=1;
						rdlp=rdlp-1;
					}
					bgem+=stat;
				}
				if (i==23) {						
					if (sniper == 1)
						sarrow+=stat;
					arrow+=stat;
				}
				if (i==24) {
					ad+=stat;
				}
				/*if (i==25) poison+=stat;
				if (i==26) spirit+=stat;
				if (i==27) zeny+=stat; */
				i++;
				});
			}); 
		});
//dmg per fas and dmg per ad
var fas = sniperd/sarrow;
var add = chemd/ad;
//formatting stuff
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
var offset;
var gap="";
var txt = "```diff\n"
if (displaydate!=0)
	txt+="-ARCHIVE WOE DATE: "+d+"\n\n"
txt+="-GUILD STATS FOR: "+fullname+"\n\n\n"
txt+="--- Basic info:\n";
txt+="!kills:             ";
txt+="deaths:             ";
txt+="damage done:        ";
txt+="received:           \n";
offset = 20 - kills.length; //calculates spaces for text formatting
gap=" ".repeat(offset);
txt+=kills+gap;
offset = 20 - deaths.length;
gap=" ".repeat(offset);
txt+=deaths+gap;
offset = 20 - done.length;
gap=" ".repeat(offset);
txt+=done+gap;
offset = 20 - recv.length;
gap=" ".repeat(offset);
txt+=recv+gap;
txt+="\n\n--- Additional stuff:\n";
txt+="!ad used:           ";
txt+="hp potions:         ";
txt+="sp potions:         ";
txt+="gypsy deaths:       \n";
offset = 20 - ad.length;
gap=" ".repeat(offset);
txt+=ad+gap;
offset = 20 - hp.length;
gap=" ".repeat(offset);
txt+=hp+gap;
offset = 20 - sp.length;
gap=" ".repeat(offset);
txt+=sp+gap;
offset = 20 - gypsyd.length;
gap=" ".repeat(offset);
txt+=gypsyd+gap;
txt+="\n\n!dmg per ad:        ";
txt+="dmg per fas:        ";
txt+="ganb used:          ";
txt+="dispel used:        \n";
offset = 20 - add.length;
gap=" ".repeat(offset);
txt+=add+gap;
offset = 20 - fas.length;
gap=" ".repeat(offset);
txt+=fas+gap;
offset = 20 - ganb.length;
gap=" ".repeat(offset);
txt+=ganb+gap;
offset = 20 - dispel.length;
gap=" ".repeat(offset);
txt+=dispel+gap;

txt+="\n\n--- Roster composition:\n";
txt+="+class:                        count:\n";
if (rlk > 0)txt+="Lord Knight:                   "+rlk+"\n";
if (rhp > 0)txt+="High Priest:                   "+rhp+"\n";
if (rhw > 0)txt+="DD High Wizard:                "+rhw+"\n";
if (rhwfs > 0)txt+="FS High Wizard:                "+rhwfs+"\n";
if (rws > 0)txt+="Whitesmith:                    "+rws+"\n";
if (rsnip > 0)txt+="Sniper:                        "+rsnip+"\n";
if (rsin > 0)txt+="Assassin Cross:                "+rsin+"\n";
if (rpal > 0)txt+="Paladin:                       "+rpal+"\n";
if (rchamp > 0)txt+="Champion:                      "+rchamp+"\n";
if (rprof > 0)txt+="Dispel Prof:                   "+rprof+"\n";
if (rdlp > 0)txt+="DLP Prof:                      "+rdlp+"\n";
if (rstalk> 0)txt+="Stalker:                       "+rstalk+"\n";
if (rchem > 0)txt+="DD Chem:                       "+rchem+"\n";
if (rspp > 0)txt+="SPP Chem:                      "+rspp+"\n";
if (rclown > 0)txt+="Clown:                         "+rclown+"\n";
if (rgyp > 0)txt+="Gypsy:                         "+rgyp+"\n";
if (rslinger > 0)txt+="Gunslinger:                    "+rslinger+"\n";
if (rninja > 0)txt+="Ninja:                         "+rninja+"\n";
if (rtaek > 0)txt+="Taekwon:                       "+rtaek+"\n";
if (rsg > 0)txt+="Star Gladiator:                "+rsg+"\n";
if (rlinker > 0)txt+="Soul Linker:                   "+rlinker+"\n";
var total = rlk+rhp+rhw+rhwfs+rws+rsnip+rsin+rpal+rchamp+rprof+rdlp+rstalk+rchem+rspp+rclown+rgyp+rslinger+rninja+rtaek+rsg+rlinker;
txt+="+TOTAL:                        "+total+"\n";
txt+="\n```";
return m.edit(txt);
});
return
}

else if (command === 'compare' || command === 'cmp')
{
var woedate=1554584400; //default for tests
  //var url = 'https://ragnarok.life/?server=Ragnarok.Life&module=ranking&action=woerank&woe_date=1554584400&opt=0&ser=0&ord=0';
if (args[0] === "-w" && args[1] != "") {
	var firstwoe= new Date('2019-04-06 23:00').getTime();
	today = new Date().getTime();
	var diff = Math.abs(today - firstwoe);
	diff = Math.trunc(diff/weeksec);
	var wbehind = parseInt(args[1]);
	diff = diff-wbehind;
	diff=(diff*weeksec)+firstwoe;
	diff=diff/1000;
	woedate=diff;
	args=args.splice(2);
	var d = new Date(0);
	d.setUTCSeconds(diff+3600); // fix date from 23:00
	d=d.toString();
	displaydate=1;
  }
if (args[0] === "-d" && args[1] != "") {
	var dwoe = new Date(args[1]);
	//dwoe.setHours(dwoe.getHours() - 3); //for local
	dwoe.setHours(dwoe.getHours() - 1); // need to set 23:00
	dwoe=dwoe/1000;
	woedate=dwoe;
	args=args.splice(2);
	var d = new Date(0);
	d.setUTCSeconds(dwoe+3600); // go back to 0:00
	d=d.toString();
	displaydate=1;
  }
	/*
	var firstwoe= new Date('2019-04-06 23:00').getTime();
	today = new Date().getTime();
	var diff = Math.abs(today - firstwoe);
	diff = Math.trunc(diff/weeksec); // cut off to full weeks
	diff=(diff*weeksec)+firstwoe;
	diff=diff/1000;
	woedate=diff;

	today.setHours(today.getHours() - 3); //for time adjust if needed
	FOR CURRENT WOE!!!!*/ 
var job = args[0].toLowerCase();
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
if (job == 'wiz' || job == 'wizard' || job == 'hw') {
	job = 'wiz';
	jobid = '4010';
	jobtext = 'DD WIZARDS:';
}
var url = 'https://ragnarok.life/?module=ranking&action=woerank&woe_date='+woedate+'&opt='+jobid+'&server=Ragnarok.Life';
var name,dd,guild;
kills=deaths=top=done=recv=hp=sp=ygem=bgem=arrow=add=ad=donef=0;
var offset;
var gap="";
var txt="```diff\n";
if (displaydate!=0)
	txt+="-ARCHIVE WOE DATE: "+d+"\n\n"
txt+="-COMPARING "+jobtext+"\n\n"
txt+="!name:                   ";
txt+="guild:                   ";
txt+="K:   ";
txt+="D:   ";
if (job == 'wiz')txt+="top dmg:    ";
txt+="dmg done:    ";
txt+="received:    ";
if (job == 'wiz')txt+="ganb used:\n";
if (job == 'snip') {
	txt+="fas used:  ";
	txt+="dmg/fas:\n";
}
if (job == 'chem') {
	txt+="ad used:  ";
	txt+="dmg/ad:\n";
}
request(url, function (error, response, body) {
	var section=0;
	const $ = cheerio.load(body);
	var i;
	var j=1;
	$("#ladder_div table.battlerank-table").each (function () {
		i=1;
		name=$(".battlerank-header td:nth-child(4) b > b",this).text(); //need to check twice for name since longer names use singe b instead of 2
		 if (name == "")
			 name=$(".battlerank-header td:nth-child(4) b",this).text();
		guild=$(".battlerank-header td:nth-child(3)",this).text().trim();
		if ((parseInt($("div.row div.col-10 div.row div.col-7 tr:nth-child(2) td:nth-child(2) .text-primary", this).html().replace(/,/g, ''))) < 500000) //check for dd (dmg over 500k)
			dd=0;
		else
			dd=1;
		if (dd == 1) {
			offset = 25 - name.length;
			gap=" ".repeat(offset);
			txt+=name+gap;
			offset = 25 - guild.length;
			gap=" ".repeat(offset);
			txt+=guild+gap;
		}
		$("table.stat-table", this).each (function () {
			$(".text-primary", this).each (function () { 
			if (dd == 1) {
				if (i==1) {
					kills=parseInt($(this).html());
					kills = kills.toLocaleString().split(',').join('.');
					offset = 5 - kills.length;
					gap=" ".repeat(offset);
					txt+=kills+gap;
				}
				if (i==2) {
					deaths=parseInt($(this).html());
					deaths = deaths.toLocaleString().split(',').join('.');
					offset = 5 - deaths.length;
					gap=" ".repeat(offset);
					txt+=deaths+gap;
				}
				if (i==3 && job == 'wiz') {
					top=parseInt($(this).html().replace(/,/g, ''));
					top = top.toLocaleString().split(',').join('.');
					offset = 12 - top.length;
					gap=" ".repeat(offset);
					txt+=top+gap;
				}
				if (i==4) {
					donef=parseFloat($(this).html().replace(/,/g, ''));
					done = donef.toLocaleString().split(',').join('.');
					offset = 13 - done.length;
					gap=" ".repeat(offset);
					txt+=done+gap;
				}
				if (i==5) {
					recv=parseInt($(this).html().replace(/,/g, ''));
					recv = recv.toLocaleString().split(',').join('.');
					offset = 13 - recv.length;
					gap=" ".repeat(offset);
					txt+=recv+gap;
				}
				if (i==20 && job == 'wiz') {
					ygem=parseInt($(this).html().replace(/,/g, ''));
					ygem = ygem.toLocaleString().split(',').join('.');
					txt+=ygem+'\n';
					j++;
				}
				if (i==23 && job == 'snip') {
					arrow=parseFloat($(this).html().replace(/,/g, ''));
					fas=donef/arrow;
					arrow = arrow.toLocaleString().split(',').join('.');
					fas = Math.round(fas);
					fas = fas.toLocaleString().split(',').join('.');
					offset = 11 - arrow.length;
					gap=" ".repeat(offset);
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
					gap=" ".repeat(offset);
					txt+=ad+gap;
					txt+=add;
					txt+="\n";
					j++;
				}
				if (i==25) {
					if (j>10) {
						txt+="```";
						if (section>0)
							message.channel.send(txt);
						else
							m.edit(txt);
						txt="";
						j=1;
						txt+="```diff\n"
						section++;
					}
				}
			}
			i++;
			});
		}); 
	});
txt+="```";
if (section == 0 && j!=1)
	m.edit(txt);
else if (j!=1)
	return message.channel.send(txt);
});
return
}
  
else if(command === "help" || command === "h") {
	var txt="```diff\n";
	txt+="-USER COMMANDS: \n\n\n"
	txt+=""+config.prefix+"woeinfo (alternative: "+config.prefix+"wi)\n"
	txt+="+Displays basic woe info \n\n"
	txt+=""+config.prefix+"yes \n"
	txt+="+Put your attendance on 'yes' for next woe \n\n"
	txt+=""+config.prefix+"no \n"
	txt+="+Put your attendance on 'no' for next woe \n\n"
	txt+=""+config.prefix+"check \n"
	txt+="+Checks your attendance status for next woe \n\n"
	txt+=""+config.prefix+"build \n"
	txt+="+Gets you a build for next woe (if it is available) \n\n"
	txt+=""+config.prefix+"comment (alternative: "+config.prefix+"cmt)\n"
	txt+="+Lets you put a comment on the roster sheet \n\n"
	txt+=""+config.prefix+"devo \n"
	txt+="+Gets you your devo targets \n\n"
	txt+=""+config.prefix+"party (alternative: "+config.prefix+"pt)\n"
	txt+="+Gets you party setup if you are a party leader \n\n"
	txt+=""+config.prefix+"gstats (guildname - can be just a part of it) (alternative: "+config.prefix+"gs)\n"
	txt+="+Gets you woe stats of specified guild ***will be ready after first woe - pulls from ragnarok.life as for now***\n---ex. '?gstats worst', '?gs 'pique', '?gs worst players', '?gstats love' \n"
	txt+="+You can use this command to get archive woe data aswell using -d and -w options. -w specifies how many weeks ago from current date woe occured and -d lets you provide exact date of woe\n"
	txt+="---ex. '?gs -w 3 guildname' (pulls woe from 3 weeks ago for specified guildname), '?gs -d 2019-09-08 guildname' (woe from 08 september 2019 for guildname - format is RRRR-MM-DD) \n\n"
	txt+=""+config.prefix+"compare (dd class) (alternative: "+config.prefix+"cmp)\n"
	txt+="+Compares DD classes stats (use command with class name ***will be ready after first woe - pulls from ragnarok.life as for now***\n---ex. '?cmp chem', '?compare sniper', '?compare creo', '?cmp wiz' \n"
	txt+="+You can use this command to get archive woe data aswell using -d and -w options (usage is the same as ?gstats)\n\n"
	txt+=""+config.prefix+"bgranks (class) (alternative: "+config.prefix+"bg)\n"
	txt+="+Pulls data from BG rankings\n---ex. '?bg chem', '?bgranks sniper', '?bgranka creo', '?bg wiz' \n"
	txt+="```"
	message.author.send(txt);
	txt="```diff\n"
	txt+="-ADMIN COMMANDS: \n\n\n"
	txt+=""+config.prefix+"getusers (alternative: "+config.prefix+"gusers)\n"
	txt+="+Gets all users from server into roster sheet. Use ONLY when creating attendance from scratch. \n\n"
	txt+=""+config.prefix+"cleanusers (alternative: "+config.prefix+"cusers)\n"
	txt+="+Cleans all users on roster sheet. \n\n"
	txt+=""+config.prefix+"forceyes @username (alternative: "+config.prefix+"fyes)\n"
	txt+="+Forces 'yes' for specified user. \n\n"
	txt+=""+config.prefix+"forceno @username (alternative: "+config.prefix+"fno)\n"
	txt+="+Forces 'no' for specified user. \n\n"
	txt+=""+config.prefix+"fcheck @username \n"
	txt+="+Forces attendance check on specified user. \n\n"
	txt+=""+config.prefix+"cdevo @username \n"
	txt+="+Checks devo targets of specified user. \n\n"
	txt+=""+config.prefix+"devoall (alternative: "+config.prefix+"dall)\n"
	txt+="+Checks all devo targets. \n\n"
	txt+=""+config.prefix+"cparty (1-2 or leave empty for both) (alternative: "+config.prefix+"cpt)\n"
	txt+="+Checks party setup of specified party. \n\n"
	txt+=""+config.prefix+"add @username \n"
	txt+="+Adds specified user into roster sheet. \n\n"
	txt+=""+config.prefix+"remove @username (alternative: "+config.prefix+"rmv)\n"
	txt+="+Removes specified user from roster sheet. \n\n"
	txt+=""+config.prefix+"purge (1-100) \n"
	txt+="+Purges from 1 to 100 messages on channel. \n\n\n\n"
	txt+="```"
	txt+="If you want some new commands or something doesnt work - DM clepto"
	message.reply("Sending commands info. Check your DM.");
	return message.author.send(txt);
}

/*if(command === "woeinfo" || command === "wi") {
	const m = await message.channel.send("Checking roster sheet...");
doc.useServiceAccountAuth(creds, function (err) {
doc.getInfo(function(err, info) {
	sheet = info.worksheets[0];
		sheet.getCells({
			'min-row': 5,
			'max-row': 5,
			'min-col': 20,
			'max-col': 20,
			'return-empty': true
		}, function(err, cells) {
			var gap="";
			var offset;
			var txt="```diff\n";
			var woetime = moment(cells[0].value);
			woetime.utcOffset(1);
			txt+='Central Europe\n';
			txt+=woetime.toString();
			woetime.utcOffset(2);
			txt+='Moscow\n';
			txt+=woetime.toString();
			woetime.utcOffset(-4);
			txt+='São Paulo\n';
			txt+=woetime.toString();
			woetime.utcOffset(-5);
			txt+='New York\n';
			txt+=woetime.toString();
			txt+="\n\n";
			//return m.edit(txt);
		}); 
		sheet.getCells({
			'min-row': 5,
			'max-row': 36,
			'min-col': 15,
			'max-col': 22,
			'return-empty': true
		}, function(err, cells) {
			var i;
			var gap="";
			var offset;
			//var txt="```diff\n";
			txt+="+PARTY LEADERS: \n\n";
			txt+="-ingame name:           name:\n";
			offset = 21 - cells[ptl1+ingap].value.length; //party leader 1 ingame name
			gap = " ".repeat(offset);
			txt+="\n1. "+cells[ptl1+ingap].value+gap;
			txt+=cells[ptl1].value; //party leader 1 name
			offset = 21 - cells[ptl2+ingap].value.length;
			gap = " ".repeat(offset);
			txt+="\n2. "+cells[ptl2+ingap].value+gap;
			txt+=cells[ptl2].value;
			txt+="\n\n-Check party setup with ?party command!";
			txt+="```";
			txt+="```diff\n";
			txt+="+PALADINS: \n\n";
			txt+="-ingame name:           name:\n";
			var k=0;
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value.substring(0, 7) == 'Paladin') {
						k++;
						offset = 21 - cells[i+icgap].value.length; //ingame name
						gap = " ".repeat(offset);
						txt+="\n"+k+". "+cells[i+icgap].value+gap;
						txt+=cells[i+cngap].value; //class name
					}
				}
			txt+="\n\n-Check your devo targets with ?devo command!";
			txt+="```";
			return m.edit(txt);
		});
});
});
} */

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
						reply+="```fix\n"+config.prefix+"build - used to get you a build for woe (if someone bothered to make it :clown:)\n";
						reply+=config.prefix+"devo - check your devo targets (only for pallies)\n";
						reply+=config.prefix+"party - check your party setup (only for party leaders)\n";
						reply+=config.prefix+"check - check your attendance status\n";
						reply+=config.prefix+"comment - put your comment on the roster sheet\n";
						reply+=config.prefix+"no - sets your attendance status on no (not recommended :smile:)\n```";
					
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
					reply+="```fix\n"+config.prefix+"build - used to get you a build for woe (if someone bothered to make it :clown:)\n";
					reply+=config.prefix+"devo - check your devo targets (only for pallies)\n";
					reply+=config.prefix+"party - check your party setup (only for party leaders)\n";
					reply+=config.prefix+"check - check your attendance status\n";
					reply+=config.prefix+"comment - put your comment on the roster sheet\n";
					reply+=config.prefix+"no - sets your attendance status on no (not recommended :smile:)\n```";
				
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
	sheet = info.worksheets[1];
		sheet.getCells({ //check for id in bot sheet
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
						sheet.getCells({ //get all 3 party tables (classes, names, in-game names)
							'min-row': 5,
							'max-row': 36,
							'min-col': 15,
							'max-col': 22,
							'return-empty': true
						}, function(err, cells) {
							for (i = 0; i < cells.length; i++) {
								if ((cells[i].value == name) && (cells[i+1].value.substring(1, 2) == 'P')) //check for pallies (1P, 2P, 3P ...)
								{
										pal = cells[i+1].value;
										pal = pal.substring(0, 1);
								}
							}
							if (pal == "")
								return m.edit("<@"+message.author.id+">, You are not a paladin or you're not in the party setup yet :frowning:");
							var k = 1;
							var gap = "";
							var txt="```diff\n";
							txt+="+DEVO TARGETS: \n\n";
							txt+="-name:                  class:               priority:\n";
							for (i = 0; i < cells.length; i++) {
								if ((cells[i].value.substring(0, 1) == pal)) //find devo targets (same number before P,T or X)
								{ 
									if ((cells[i].value.substring(1, 2) == 'X') || (cells[i].value.substring(1, 2) == 'T')){ //devo symbol
										var offset = 21 - cells[i+idgap].value.length;
										gap = " ".repeat(offset);
										txt+=k+'. '+cells[i+idgap].value+gap; //name
										offset = 21 - cells[i-cdgap].value.length; //class
										gap = " ".repeat(offset);
										txt+=cells[i-cdgap].value+gap;
										if (cells[i].value.substring(1, 2) == 'X')
											txt+="HIGH\n";
										if (cells[i].value.substring(1, 2) == 'T')
											txt+="NORMAL\n";
										k++;
									}
								}
							}
							if (k==1)
								return m.edit("<@"+message.author.id+">, There are no devo targets for you? :thinking:");
							else {
								m.edit("Sending devo targets. Check DM.");
								txt+="```";
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
							for (i = 0; i < cells.length; i++) {
								if ((cells[i].value == name) && (cells[i+1].value.substring(1, 2) == 'P'))
								{
										pal = cells[i+1].value;
										pal = pal.substring(0, 1);
								}
							}
							if (pal == "")
								return m.edit("<@"+member.user.id+"> is not a paladin or is not in the party setup yet :frowning:");
							var k = 1;
							var gap='';
							var txt="```diff\n";
							txt+="+DEVO TARGETS: \n\n";
							txt+="-name:                  class:               priority:\n";
							for (i = 0; i < cells.length; i++) {
								if ((cells[i].value.substring(0, 1) == pal))
								{ 
									if ((cells[i].value.substring(1, 2) == 'X') || (cells[i].value.substring(1, 2) == 'T')){
										var offset = 21 - cells[i+idgap].value.length;
										gap = " ".repeat(offset);
										txt+=k+'. '+cells[i+idgap].value+gap;
										offset = 21 - cells[i-cdgap].value.length;
										gap = " ".repeat(offset);
										txt+=cells[i-cdgap].value+gap;
										if (cells[i].value.substring(1, 2) == 'X')
											txt+="HIGH\n";
										if (cells[i].value.substring(1, 2) == 'T')
											txt+="NORMAL\n";
										k++;
									}
								}
							}
							if (k==1)
								return m.edit("There are no devo targets for <@"+member.user.id+">? :thinking:");
							else {
								m.edit("Sending devo targets of <@"+member.user.id+">. Check DM.");
								txt+="```";
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
else if(command === "devoall" || command === "dall") {
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
			var gap="";
			var offset;
			var k=1;
			var pals = [];
			var palsn = [];
			var palsign = [];
			var txt="";
			for (i = 0; i < cells.length; i++){
				if (cells[i].value.substring(0, 7) == 'Paladin') {
					pals.push(cells[i+cdgap].value); //get all devo symbols for pals
					palsn.push(cells[i+cngap].value); //get all pallies names
					palsign.push(cells[i+icgap].value); //get all pallies ingame names
				}
			}
			for (var j = 0; j < pals.length; j++) {
				txt+="```diff\n";
				txt+="+DEVO TARGETS FOR: "+palsign[j]+" ("+palsn[j]+")\n\n";
				txt+="-name:                  class:               priority:\n";
				for (i = 0; i < cells.length; i++) {
					if ((cells[i].value.substring(0, 1) == pals[j].substring(0, 1)))
					{ 
						if ((cells[i].value.substring(1, 2) == 'X') || (cells[i].value.substring(1, 2) == 'T')){
							var offset = 21 - cells[i+idgap].value.length;
							gap = " ".repeat(offset);
							txt+=k+'. '+cells[i+idgap].value+gap;
							offset = 21 - cells[i-cdgap].value.length;
							gap = " ".repeat(offset);
							txt+=cells[i-cdgap].value+gap;
							if (cells[i].value.substring(1, 2) == 'X')
								txt+="HIGH\n";
							if (cells[i].value.substring(1, 2) == 'T')
								txt+="NORMAL\n";
							k++;
						}
					}
				}
				txt+="```\n";
				k=1;
			}
			m.edit("Sending all devo targets. Check DM.");
			return message.author.send(txt);
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
	sheet = info.worksheets[1];
		sheet.getCells({ //check for id in bot sheet
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
						sheet.getCells({ //get all 3 party tables (classes, names, in-game names)
							'min-row': 5,
							'max-row': 36,
							'min-col': 15,
							'max-col': 22,
							'return-empty': true
						}, function(err, cells) {
							if (((cells[ptl1].value == name) || (cells[ptl2].value == name))) //leader name cells
							{
								pt=1;
								var txt="```diff\n";
								txt+="+PARTY SETUP: \n\n";
								txt+="-name:                   class:\n";
								var k=0;
								m.edit("Sending party setup. Check DM.");
							for (i = 0; i < cells.length; i++) {
								if (cells[i].value == name) {
									i+=ingap; //sets cell on ingame name
									for (i; i < cells.length; i+=8) { //ROWS LENGTH - IMPORTANT!!!
										k++;
										var offset = 21 - cells[i].value.length;
										gap = " ".repeat(offset);
										if (k < 10)
											gap+=" ";
										txt+=k+". "+cells[i].value+gap+cells[i-icgap].value+"\n"; //class name
									}
								}
							}
						}
						if (pt == 1)
						{
							txt+="```";
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
if (p < 1 || p >2)
	return message.reply("Provide valid party number (1 or 2)");
const m = await message.channel.send("Checking roster sheet...");
var name=[];
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
			if (p == 1 || !p)
				name.push(cells[ptl1].value);
			if (p == 2 || !p)
				name.push(cells[ptl2].value);
			var gap='';
			var txt='';
			var k=0;
			m.edit("Sending party setup. Check DM.");
			for (var j = 0; j < name.length; j++) {
				txt+="```diff\n";
				if (j==0 && p!=2) txt+="+1ST PARTY SETUP: \n\n";
				if (j==1 || p==2) txt+="+2ND PARTY SETUP: \n\n";
				txt+="-name:                   class:\n";
				for (i = 0; i < cells.length; i++) {
					if (cells[i].value == name[j]) {
						i+=ingap;
						for (i; i < cells.length; i+=8) { //ROWS LENGTH - IMPORTANT!!!
							k++;
							var offset = 21 - cells[i].value.length;
							gap = " ".repeat(offset);
							if (k < 10)
								gap+=" ";
							txt+=k+". "+cells[i].value+gap+cells[i-icgap].value+"\n";
						}
					}
				}
				txt+="```";
				k=0;
			}
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