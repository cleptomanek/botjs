//google sheet stuff
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var doc = new GoogleSpreadsheet('1WPD5PPkaL-gbSuho0gxZttJQTuW8fMfJ2uN4dHulG4g');
//var doc = new GoogleSpreadsheet('1Q47r52ICYGl2QQo5x45N3pzKOdO9lz9hGCb5hF6aeWc'); //copy
var sheet;
var creds = require('./client_secret.json');

var name="";
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
					if (cells[i].value == 177107237053923328)
					{
						name=cells[i-1].value;
						console.log(name);	
						doc.useServiceAccountAuth(creds, function (err) {
						doc.getInfo(function(err, info) {
						sheet = info.worksheets[0];
							sheet.getCells({
								'min-row': 22,
								'max-row': 36,
								'min-col': 15,
								'max-col': 22,
								'return-empty': true
							}, function(err, cells) {
								var i;
								if (((cells[0].value == name) || (cells[2].value == name)))
								for (i = 0; i < cells.length; i++) {
									if (cells[i].value == name) {
										var lead = i+5;
										var i = lead+8;
										console.log(cells[lead].value);
										for (i; i < cells.length; i+=8)
										console.log(cells[i].value);
									}
								}
								console.log ('not a leader');
							});
						});
						});
					}
				}
				if (name == "")
					console.log('not in roster');
			});
		});
});