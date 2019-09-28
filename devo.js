//google sheet stuff
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var doc = new GoogleSpreadsheet('1WPD5PPkaL-gbSuho0gxZttJQTuW8fMfJ2uN4dHulG4g');
//var doc = new GoogleSpreadsheet('1Q47r52ICYGl2QQo5x45N3pzKOdO9lz9hGCb5hF6aeWc'); //copy
var sheet;
var creds = require('./client_secret.json');

var name="";
var pal="";
var targets = "";
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
								for (i = 0; i < cells.length; i++) {
									if ((cells[i].value == name) && (cells[i+1].value.substring(1, 2) == 'P'))
									{
										pal = cells[i+1].value;
										pal = pal.substring(0, 1);
										doc.useServiceAccountAuth(creds, function (err) {
										doc.getInfo(function(err, info) {
										sheet = info.worksheets[0];
											sheet.getCells({
												'min-row': 22,
												'max-row': 36,
												'min-col': 17,
												'max-col': 22,
												'return-empty': true
											}, function(err, cells) {
												var i;
												for (i = 0; i < cells.length; i++) {
													if ((cells[i].value.substring(0, 1) == pal) && (cells[i].value.length == 2))
													{
														if (cells[i].value.substring(1, 2) == 'X')
														console.log('Priority target: '+cells[i+4].value+'\n');
														else
															console.log('Normal target: '+cells[i+4].value+'\n');
													}
												}
												console.log ('no devo targets?');
											});
										});
										});
									}
								}
								if (pal = "")
								console.log ('not a pally or not in party');
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