/*var date = new Date('2019-04-07');
date.setHours(date.getHours() - 3);

console.log(date.getTime()/1000);
const week = 168;
date.setHours(date.getHours() - week);
console.log(date.getTime()/1000);
today = new Date();
console.log(date.getTime()/1000); */

const week = 168;
const weeksec = 604800000;
const daysec = 86400000;
var firstwoe= new Date('2019-04-06 23:00').getTime();
			today = new Date();
			today.setHours(today.getHours() +148);
			today = today.getTime();
			var diff = Math.abs(today - firstwoe);
			console.log(diff);
			diff = Math.trunc(diff/weeksec);
			var wbehind = 2;
			var arch = diff-wbehind;
			arch=(arch*weeksec)+firstwoe;
			arch=arch/1000;
			woedate=arch;
			var d = new Date(0);
			d.setUTCSeconds(arch+3600);
			d=d.toString();
			console.log(d);

/*var d = new Date(0);
d.setUTCSeconds(arch);
d=d.toString();
console.log(d);
console.log(d.substring(0, 4));*/