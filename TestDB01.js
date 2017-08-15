'use strict';

var apiai = require('apiai');

var mysql = require('mysql');


var app = apiai("7941c76e84bf4d32989d3cd5b2555576");

const bodyParser = require('body-parser');

var express = require('express');
var expressApp = express();

expressApp.use(bodyParser.urlencoded({
	extended: true
}));

//*

expressApp.use(bodyParser.json());

// Comment   expressApp.post('/PATH', function (request, response) {

expressApp.post('/', function (req, res) {
	var theData = req.body.result.resolvedQuery;
	// var textOTW = req.body.parameters.value;
	var theSpeech = "I'm so geat !!"
	var testSpeech = "Best answer ever, Krom !"

	console.log("ici le nom du test tableau " + req.body.result.contexts[0].name);

	if (req.body.result.contexts[0].name == "context_record_test"){
		console.log("jusqu'ici, ça va");
		var ji = 0;
		var ii;
		for(ii=0 ; ii<req.body.result.contexts.length ; ii++){
			if (req.body.result.contexts[ii].name == "context_record_test"){
				ji = ii;
				var theName = req.body.result.contexts[ji].parameters.name;
				console.log("le name : " + theName);

				var theKrom = req.body.result.contexts[ji].parameters.krom;
				console.log("le krom : " + theKrom);

				var theNameS = JSON.stringify(theName);
				var theKromS = JSON.stringify(theKrom);
				console.log(theNameS);

				if(theNameS != "\"\"" && theKromS != "\"\""){
					console.log("MWHAHAHAHHAAHAAHHA, too easy, way too easy ...");
					
					var mySQLString = "START TRANSACTION;";
					
					var db_config = {
						host: 'eu-cdbr-west-01.cleardb.com',
						user: 'ba575c324edc45',
						password: 'e155580c',
						database: 'heroku_04b4aac313a5863'
					};

					var connection;
					
mySQLString += 'INSERT INTO tabletest (name,krom) VALUES ( ' + theNameS +  ',' + theKromS +  ');';

					function handleDisconnect() {
						console.log('1. connecting to db:');
						connection = mysql.createConnection(db_config); // Recreate the connection, since
																		// the old one cannot be reused.

						connection.connect(function(err) {              	// The server is either down
							if (err) {                                     // or restarting (takes a while sometimes).
								console.log('2. error when connecting to db:', err);
								setTimeout(handleDisconnect, 1000); // We introduce a delay before attempting to reconnect,
							}                                     	// to avoid a hot loop, and to allow our node script to
						});                                     	// process asynchronous requests in the meantime.
																	// If you're also serving http, display a 503 error.
						connection.on('error', function(err) {
							console.log('3. db error', err);
							if (err.code === 'PROTOCOL_CONNECTION_LOST') { 	// Connection to the MySQL server is usually
								handleDisconnect();                      	// lost due to either server restart, or a
							} else {                                      	// connnection idle timeout (the wait_timeout
								throw err;                                  // server variable configures this)
							}
						});
					}

					handleDisconnect();
					
					putInSQL();

				   function putInSQL() {
							mySQLString += "COMMIT;"
							
					   		connection.query(mySQLString, function(err, rows, fields) {
							if (err) {
								console.log('error: ', err);
								throw err;
							}
							
							mySQLString = "";
							mySQLString = "START TRANSACTION;"
						});
				   }
					

	// start here to go to mysql
				/*
					//var mysql = require('mysql'); already written on top
					var mySQLString = "START TRANSACTION;";

					var connection = mysql.createConnection({
						host: '41.185.27.253',
						user: 'iot_Admin',
						password: '<r0(k>IOT',
						database: 'IOT',
						multipleStatements: true
					});

mySQLString += 'INSERT INTO case_files (description,name,email,contact_number,systemID,status) VALUES ( "' + theKromS +  '","' + theKromS +  '","' + theKromS +  '","' + theKromS +  '","' + theKromS +  '","' + theKromS +  '");';


					console.log(mySQLString);
					putInSQL();

				   function putInSQL() {
						mySQLString += "COMMIT;"

						//connection.connect();

						connection.query(mySQLString, function (error, results, fields) {

							if (error) throw error;
							console.log('INSERTED TO MYSQL');

					   });

						mySQLString = "";
						mySQLString = "START TRANSACTION;"

					}
					connection.end();
				//*/	
				}
			}
		}
	}


	return res.json({
		"speech": theSpeech,
		"displayText": "do we care about this one ?",
		"source": 'First_ChatBot',
		"data": theData,
	});

	var request = app.textRequest('', {
		sessionId: '94977757-7fc6-4c81-936a-b1fcfaaf9a7f'
	});


	request.on('response', function(response) {
		console.log(response);
		res.send(response);
	});

	request.on('error', function(error) {
		console.log(error);
		res.send(error); 
	});

	request.end();

});


var server = expressApp.listen(process.env.PORT || 5000, function () {
	var port = server.address().port;
	console.log("Express is working on port " + port);
	console.log("Fin du programme ");

});





