var express     = require("express"),
fs              = require('fs'),
readline        = require('readline'),
{google}        = require('googleapis'),
request         = require('request'),
GoogleSpreadsheet = require('google-spreadsheet'),
creds             = require('./client_secret.json'),
app               = express();


  // Identifying which document we'll be accessing/reading from
  var doc = new GoogleSpreadsheet('1xvRX89Ki2FuUf-MWsipKZeIYw_V2UJssuBJV65Y9dng');
  

  // Authentication
  doc.useServiceAccountAuth(creds, function (err) {
  console.log("2");
  // Getting cells back from tab #2 of the file
  doc.getCells(2, callback);
  
  // Callback function determining what to do with the information
  function callback(err, rows){
    
    // Logging the output or error, depending on how the request went
    console.log(rows);
	console.log(".");
    console.log(err);
    
    // Rending the test page while passing in the response data through "rows". Can access specific data points via: rows[i]._value
    console.log('test', {rows:rows});
  }
  });