var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
 
// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1xvRX89Ki2FuUf-MWsipKZeIYw_V2UJssuBJV65Y9dng');
var sheet;
var creds = require('./client_secret.json');
doc.useServiceAccountAuth(creds, function (err) {
	doc.getInfo(function(err, info) {
		console.log('Loaded doc: '+info.title+' by '+info.author.email);
		sheet = info.worksheets[1];
		console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
			sheet.getCells({
				'min-row': 1,
				'max-row': 5,
				'max-col': 3,
				'return-empty': true
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
					//if (cells[i].value == 1)
						//cells[i+1].value = 'potion';
				 console.log('Cell R'+cells[i].row+'C'+cells[i].col+' = '+cells[i].value+'\n');
				}
				//sheet.bulkUpdateCells(cells);				
			});
		});
});