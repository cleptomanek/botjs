//google sheet stuff
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var doc = new GoogleSpreadsheet('1WPD5PPkaL-gbSuho0gxZttJQTuW8fMfJ2uN4dHulG4g');
//var doc = new GoogleSpreadsheet('1Q47r52ICYGl2QQo5x45N3pzKOdO9lz9hGCb5hF6aeWc'); //copy
var sheet;
const creds = require('./client_secret.json');
const pkey = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDfVF0W8dPDjSkd\nIxsLxIHwc25lbT+6fWVAWaBImOKdO/sY37r+Tl+yoZK3Al64CC466V6L69eZb/oj\non+fDZ8YVP9cokHOob0n1Ot739NWwZq7NcU9gnRWZdZoFGch4qqgjpLJDqIS3OYq\nrg7Xyxj6qIAHtS2Q8LKbvGglx7C8zCY+QLLF8WguiRZQ77R3z+szspsB2tPlz3GF\nyavkI8prF+PJ7yreg9APJ6GmHnoUbgjrfoy+E/9BQK1KJ3eK7LqCIii08tDlgJoD\nL9wKau+42kdX3Gig8q/hN2dMmNNNaWDv0GV5Xr7l5VoAIspxyd3L1WXoEoMkiOnZ\n9M5+wS1TAgMBAAECggEARPFOwYAK7wHbUNbfCQ1zTY7c5CvLMh92y9w/OloUDxUO\nqXmbyNjZ+xOc7qkpI2fHGcGkQc6fIotqbWjDPA8g74qBwI+IgCj2815sCbQpkk03\nHpb1Wk00690JSN0Pj2rhYKpSzwWY6/jMhx1vkJdukSbGS1rXg7iCcshBYHRab5WE\nWI8myRXW7TcDbGQ/N5dDVm+TwOJFKF+SSJ3HIdWA5QObrfrHMKa2nOz/lOHfznnL\nyIzCKfSX5mD93mukL3MEP7wK5pjgQIr9UCUdSUwq1luJt/r6JUFwDAxPTrg08fXQ\nR+csyoG61PnYNIX7TCNePCL6V7FCM010kNZNSmvEFQKBgQD8o1+g0X08jX4SMEmH\ne14pCax9+Crx1hmxMDM/SllKuXYOaoXGVJ4XtM+VVCyIZ7egkh/i40299hNJMzcN\n0n6kOsy/21J8wkiayJS6ib2btdRH8X1AZvWdI//9BpXmkiodO5AqNNcNi7Rm6a/k\n/lyLZmcsjWuQ9YldPmJ7yREzNwKBgQDiTSYHDQZ+6fjx87H+JQ/958ImHgPACl+k\nWuBBJAkWLQKrJZEL+JxVJb3ldm0A7I+bzOIkx+4YttDj96P1fx6ezQB70ORPyse2\nGjn79fG84K7tfrIWOVK9eTSdPDeoAGu0+213J5J5w0Hygd5fEZ6TzWILlyda/5Ve\nZ+vok0tcxQKBgE3+AZ+cDJWM+MaUsZ5pr3/rxJx+6IMQHY5d2vRG95nh91gr+nBn\n3wZig1MOUVEq871WXxGkKnPia8HFVdGmkgIRRPRVuPla4R8nnQKZUzemwooTOx+O\nqXSBkJ2EUvKDXQz5PmBJP7qmzmKW8f43qEpAqslOP07Y/jcS80RTpkOxAoGBAM7f\n5f6WGrUUoN5WgAWrzfW30xVTZOw+z3YJGW6TSbc7CHB6lCFUcV2pdfJ5k2Y/23x7\nDNTA7FktbsKn1PwM7GoRT/rgWIbVAkLnsNAz4nxfDarQom6MkqXhUobW0K5FTDET\nk9tUkqO7KuNNc4KHMec93v5nfLPEZ8D40YE4fbFdAoGAB8KyzxI9W2TUz4oWBpU5\nRkvm/Ocgs3rvxGzjfXhTRRws3UHjLtej1VWynHu3/ee6KhiDhkkLSu0IfmKTuBaR\nJgl3oRs4/Q4fj0jO2eNHZrg1WEcKCBF3c7jD1gk+wSaB6umK969DhafIuat8+mw9\n0xxHg8UFHKzZTXU9clOVONQ=\n-----END PRIVATE KEY-----\n";
const pkeyid = "8b9d3139b665cdecb7a50277a117b625cdfa04da";
const cred2 = {
  "type": "service_account",
  "project_id": "attendance-254008",
  "private_key_id": pkeyid,
  "private_key": pkey,
  "client_email": "clepto@attendance-254008.iam.gserviceaccount.com",
  "client_id": "107710444065339479409",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/clepto%40attendance-254008.iam.gserviceaccount.com"
};

//process.env.varname
//heroku rosources turn worker on disable web
//heroku deploy github
//https://www.youtube.com/watch?v=d8INsGl28xw

	doc.useServiceAccountAuth(cred2, function (err) {
	doc.getInfo(function(err, info) {
		sheet = info.worksheets[1];
			sheet.getCells({
				'min-row': 2,
				'max-row': 40,
				'min-col': 2,
				'max-col': 6,
				'return-empty': false
			}, function(err, cells) {
				var i;
				for (i = 0; i < cells.length; i++) {
						console.log(cells[i].value);
				}			
			});
		});
	});