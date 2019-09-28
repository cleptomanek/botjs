'use strict';

const request = require('request');
const cheerio = require('cheerio');
var url = 'https://ragnarok.life/?module=ranking&action=woerank&woe_date=1554584400&opt=101&server=Ragnarok.Life&buscar=worst';
const fs = require('fs');
var kills, deaths, top, done, recv, supc, supw, healc, healw, emp, bar, stone, guard, demp, dbar, dstone, dguard, hp, sp, ygem, rgem, bgem, arrow, ad, poison, spirit, zeny, gypsy, gypsyd,hw;
kills=deaths=top=done=recv=supc=supw=healc=healw=emp=bar=stone=guard=demp=dbar=dstone=dguard=hp=sp=ygem=rgem=bgem=arrow=ad=poison=spirit=zeny=gypsyd=0;
request(url, function (error, response, body) {
	const $ = cheerio.load(body);
	var i;
	$("#ladder_div table.battlerank-table").each (function () {
		i=1;
	//	console.log ($("tr.battlerank-header td:nth-child(5)", this).text().trim()
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
			console.log(i+" "+parseInt($(this).html()));
			if (i==1)
				kills+=parseInt($(this).html());
			if (i==2)
			{
				if (gypsy == 1)
					gypsyd+=parseInt($(this).html());
				else
					deaths+=parseInt($(this).html());
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
	console.log(done);
});
	
	
    
	//$("#ladder_div table tr:nth-child(2) table tr:nth-child(2) select:nth-child(1) option").each (function() {
    //console.log($( this ).html());
	//});