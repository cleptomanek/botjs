var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
 
// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1xvRX89Ki2FuUf-MWsipKZeIYw_V2UJssuBJV65Y9dng');
var sheet;
 
  function setAuth() {
    // see notes below for authentication instructions!
    var creds = require('./client_secret.json');
 
    doc.useServiceAccountAuth(creds, function (err) {
		getInfoAndWorksheets();
		//workingWithCells();
	}
	);
  };
  
  
  
  
  function workingWithCells() {
    sheet.getCells({
      'min-row': 1,
      'max-row': 5,
      'return-empty': true
    }, function(err, cells) {
      var cell = cells[0];
      console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
  });
  }
  
  function getInfoAndWorksheets() {
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
  };
  setAuth();
  //getInfoAndWorksheets();