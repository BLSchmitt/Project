'use strict';

var apiai = require('apiai');

var mysql = require('mysql');

var app = apiai("3b66bd00e60a41a4b2c5ff780a1f1884");
const bodyParser = require('body-parser');

var express = require('express')
var expressApp = express()

expressApp.use(bodyParser.urlencoded({
    extended: true
}));
expressApp.use(bodyParser.json());
expressApp.post('/', function (req, res) {
 	
	
	//general_fallback_2
	// redirect the client to what data we still need
	// if the action is Redirect_client_data 
	// then we check which of the 8 data we are missing and we ask for the first one in the order :
	// name / email / phone-number / status / problem_desc / case_type / system_ID / location
	if(req.body.result.action == "Redirect_client_data" || req.body.result.action == "save_location_data" || req.body.result.action == "call_final_check"){
		
		var i =0;
		while (req.body.result.contexts[i].name != "record_context"){
			i++;
		}
		console.log(req.body.result.contexts[i].name);
		console.log(""+req.body.result.contexts[i].parameters.name)
		var recordContext = req.body.result.contexts[i].parameters;
		
		// Name
		if( (recordContext.name == undefined || recordContext.name == "") && (recordContext.given_name == undefined || recordContext.given_name == "") && (recordContext.name_2 == undefined || recordContext.name_2 == "") && (recordContext.given_name_2 == undefined || recordContext.given_name_2 == "") ){	
			return res.json({
				"speech": "Please give me your name. You can use a sentence as : \nMy name is YourName",
				"displayText": "Please give me your name. You can use a sentence as : \nMy name is YourName",
				"source": 'test_2_cahtbot',
				"data": ""
		   });
		}
		else{
			// Email
			if( (recordContext.email == "" || recordContext.email == undefined) && (recordContext.email_2 == "" || recordContext.email_2 == undefined) ){
				return res.json({
					"speech": "Please give me your email address. You can use a sentence as : \nMy email is Youremail",
					"displayText": "Please give me your email address. You can use a sentence as : \nMy email is Youremail",
					"source": 'test_2_cahtbot',
					"data": ""
			   });
			}
			else{
				// Phone number
				if( (recordContext.phone_number == "" || recordContext.phone_number == undefined) && (recordContext.phone_number_2 == "" || recordContext.phone_number_2 == undefined) ){
					return res.json({
						"speech": "Please give me your phone number. You can use a sentence as : \nMy number is Yourenumber",
						"displayText": "Please give me your phone number. You can use a sentence as : \nMy number is Yourenumber",
						"source": 'test_2_cahtbot',
						"data": ""
				   });
				}
				else{
					// Status
					if( recordContext.status == "" || recordContext.status == undefined ){
						if(req.body.result.metadata.intentName == "Information_yes_fallback"){
							return res.json({
								"speech": "Is the machine down, partially down or inhibited ?",
								"displayText": "Is the machine down, partially down or inhibited ?",
								"source": 'test_2_cahtbot',
								"data": "",
								"contextOut": [
									{
										"name":"ask_status", 
										"lifespan":2
									}
								],
								"followupEvent": {
									"name": "event_ask_status"
								}
						   });
						}
						else{
							// Status
							return res.json({
								"speech": "Great, now I will ask for the status of the machine. \nIs the machine down, partially down or inhibited ?",
								"displayText": "Great, now I will ask for the status of the machine. \nIs the machine down, partially down or inhibited ?",
								"source": 'test_2_cahtbot',
								"data": "",
								"contextOut": [
									{
										"name":"ask_status", 
										"lifespan":2
									}
								],
								"followupEvent": {
									"name": "event_ask_status"
								}
						   });
						}
					}
					else{
						// Problem description
						if( recordContext.problem_desc == "" || recordContext.problem_desc == undefined ){						
							return res.json({
								"speech": "Please give me the description of your problem. You can use a sentence as : \nMy problem is YourProblem",
								"displayText": "Please give me the description of your problem. You can use a sentence as : \nMy problem is YourProblem",
								"source": 'test_2_cahtbot',
								"data": ""
						   });
						}
						else{
							// Case type
							if( recordContext.case_type == "" || recordContext.case_type == undefined ){
								return res.json({
									"speech": "You need to choose one of these 4 case types : \nC-job (problem, corrective maintenance, issue), \nP-job (service, planned maintenance), \nK-job (upgrade, update), \nI-job (installation).",
									"displayText": "You need to choose one of these 4 case types : \nC-job (problem, corrective maintenance, issue), \nP-job (service, planned maintenance), \nK-job (upgrade, update), \nI-job (installation).",
									"source": 'test_2_cahtbot',
									"data": "",
									"contextOut": [
										{
											"name":"ask_case_type", 
											"lifespan":2
										}
									],
									"followupEvent": {
										"name": "event_ask_case_type"
									}
							   });
							}
							else{
								// System_ID
								if( recordContext.system_id == "" || recordContext.system_id == undefined ){
									return res.json({
										"speech": "Please give me the system id. You can use a sentence as : \nThe system ID is ZA1234MR01",
										"displayText": "Please give me the system ID. You can use a sentence as : \nThe system ID is ZA1234MR01",
										"source": 'test_2_cahtbot',
										"data": "",
										"contextOut": [
											{
												"name":"sealed", 
												"lifespan":2
											}
										]
								   });
								}
								else{
									// Location
									if( recordContext.location == "" || recordContext.location == undefined ){
										if(req.body.result.metadata.intentName == "system_ID_yes"){
											return res.json({
												"speech": "Great, I will ask for your location then check-up with you all the data and it will be the end. \nUse a sentence as: \nMy location is YourLocation",
												"displayText": "Great, I will ask for your location then check-up with you all the data and it will be the end. \nUse a sentence as: \nMy location is YourLocation",
												"source": 'test_2_cahtbot',
												"data": "",
												"contextOut": [
													{
														"name":"find_location", 
														"lifespan":2
													}
												]
										   });
										}
										else{
											// Location
											if( recordContext.location == "" || recordContext.location == undefined ){
												return res.json({
													"speech": "Please give me your location. Use a sentence as: \nMy location is YourLocation",
													"displayText": "Please give me your location. Use a sentence as: \nMy location is YourLocation",
													"source": 'test_2_cahtbot',
													"data": "",
													"contextOut": [
														{
															"name":"find_location", 
															"lifespan":2
														}
													]
											   });
											}
										}
									}
									else{
										// call final check (big_followup)
										// we need to make sur we have all the data before the laste confirmation.
										// when we have all the data we need, we juste have to call the final checking.
										// if action is save_location_data or call_final_check then call event_final_confirmation and set the context to event_final_confirmation
										 return res.json({
											"speech": "Let's check everything.",
											"displayText": "Let's check everything.",
											"source": 'test_2_cahtbot',
											"data": "data",
											"contextOut": [
												{
													"name":"final_check", 
													"lifespan":2
												}
											],
											"followupEvent": {
												"name": "event_final_confirmation",
												"data": {
												}
											}
										});
									}
								}
							}
						}
					}
				}
			}
		}		
	}
	
	
	
	// final checking
	// when we trigger the big_followup we need to ask the user if everything is allright
	// he will answer by yes or no
	if(req.body.result.action == "final_confirmation"){
		
		var j =0;
		while (req.body.result.contexts[j].name != "record_context"){
			j++;
		}
		// store the data
		var theStatus = req.body.result.contexts[j].parameters.status;
		var theLocation = req.body.result.contexts[j].parameters.location;
		var theCase_type = req.body.result.contexts[j].parameters.case_type;
		var theProblem_desc = req.body.result.contexts[j].parameters.problem_desc;
		var theSystem_id = req.body.result.contexts[j].parameters.system_id;
		
		if( req.body.result.contexts[j].parameters.name_2 == undefined ){			
			var theEmail = req.body.result.contexts[j].parameters.email;
			var thePhone_number = req.body.result.contexts[j].parameters.phone_number;
			if(req.body.result.contexts[j].parameters.name == ""){
				var theName = req.body.result.contexts[j].parameters.given_name;
			}
			else{
				var theName = req.body.result.contexts[j].parameters.name;
			}
		}
		else{
			var theEmail = req.body.result.contexts[j].parameters.email_2;
			var thePhone_number = req.body.result.contexts[j].parameters.phone_number_2;
			if(req.body.result.contexts[j].parameters.name_2 == ""){
				var theName = req.body.result.contexts[j].parameters.given_name_2;
			}
			else{
				var theName = req.body.result.contexts[j].parameters.name_2;
			}
			if(theEmail == ""){
				theEmail = req.body.result.contexts[j].parameters.email;
			}
			if(thePhone_number == ""){
				thePhone_number = req.body.result.contexts[j].parameters.phone_number;
			}
			if (theName == ""){
				if(req.body.result.contexts[j].parameters.name == ""){
					theName = req.body.result.contexts[j].parameters.given_name;
				}
				else{
					theName = req.body.result.contexts[j].parameters.name;
				}
			}
		} 
		var theSpeech = "Are these informations correct? \nName: "+theName+" \nEmail: "+theEmail+" \nPhone number: "+thePhone_number+" \nStatus: "+theStatus+"\nProblem description: "+theProblem_desc+"\nCase type: "+theCase_type+"\nSystem ID: "+theSystem_id+"\nLocation: "+theLocation; 
		
		return res.json({
			"speech": theSpeech,
			"displayText": theSpeech,
			"source": 'test_2_cahtbot',
			"data": "data",
		});
	} // end if
	
	
	
	
	// MySQL
	// if the action is win it means the user confirmed we have all the data we need
	// then save all the data to mysql
	if(req.body.result.action == "win"){
		
		var finalSpeech ="Here is the case id you need :)  ";
		var mySQLString = "START TRANSACTION;";
		var theCase_id;
		var lastHope;
		
		var j =0;
		while (req.body.result.contexts[j].name != "record_context"){
			j++;
		}
		
		// store the data
		var theStatus = req.body.result.contexts[j].parameters.status;
		var theLocation = req.body.result.contexts[j].parameters.location;
		var theCase_type = req.body.result.contexts[j].parameters.case_type;
		var theProblem_desc = req.body.result.contexts[j].parameters.problem_desc;
		var theSystem_id = req.body.result.contexts[j].parameters.system_id;
		
		if( req.body.result.contexts[j].parameters.name_2 == undefined ){			
			var theEmail = req.body.result.contexts[j].parameters.email;
			var thePhone_number = req.body.result.contexts[j].parameters.phone_number;
			if(req.body.result.contexts[j].parameters.name == ""){
				var theName = req.body.result.contexts[j].parameters.given_name;
			}
			else{
				var theName = req.body.result.contexts[j].parameters.name;
			}
		}
		else{
			var theEmail = req.body.result.contexts[j].parameters.email_2;
			var thePhone_number = req.body.result.contexts[j].parameters.phone_number_2;
			if(req.body.result.contexts[j].parameters.name_2 == ""){
				var theName = req.body.result.contexts[j].parameters.given_name_2;
			}
			else{
				var theName = req.body.result.contexts[j].parameters.name_2;
			}
			if(theEmail == ""){
				theEmail = req.body.result.contexts[j].parameters.email;
			}
			if(thePhone_number == ""){
				thePhone_number = req.body.result.contexts[j].parameters.phone_number;
			}
			if (theName == ""){
				if(req.body.result.contexts[j].parameters.name == ""){
					theName = req.body.result.contexts[j].parameters.given_name;
				}
				else{
					theName = req.body.result.contexts[j].parameters.name;
				}
			}
		} 
		
		// transform the data into string (in order to use them in mySQL)
		var theProblem_descS = JSON.stringify(theProblem_desc);
		var theNameS = JSON.stringify(theName);
		var theEmailS = JSON.stringify(theEmail);
		var thePhone_numberS = JSON.stringify(thePhone_number);
		var theSystem_idS = JSON.stringify(theSystem_id);
		var theStatusS = JSON.stringify(theStatus);		
		var theCase_typeS = JSON.stringify(theCase_type);
		var theLocationS = JSON.stringify(theLocation);
				
		// connect to the database
		var connection = mysql.createConnection({
			host: '41.185.27.253',
			user: 'iot_Admin',
			password: '<r0(k>IOT',
			database: 'IOT',
			multipleStatements: true
		});
		
		// fill the sql request
		mySQLString += 'INSERT INTO case_files (description,name,email,contact_number,systemID,status,case_type,location) VALUES ( ' + theProblem_descS +  ',' + theNameS +  ',' + theEmailS +  ',' + thePhone_numberS +  ',' + theSystem_idS +  ',' + theStatusS +  ',' + theCase_typeS + ',' + theLocationS + ');';

		
		console.log(mySQLString);
		// insert the mySQLString into mysql
		putInSQL();
		
		function putInSQL() {
			mySQLString += "COMMIT;"
			connection.connect();
			
			// push the data in mySQL
			connection.query(mySQLString, function (error, results, fields) {
				if (error) throw error;
				console.log('INSERTED TO MYSQL');
				// get the id from mySQL and erase it
				retrieve_id(lastFunction);
			});
			mySQLString = "";
			mySQLString = "START TRANSACTION;";
		}
		
//		delete from orders where id_users = 1 and id_product = 2
		function retrieve_id(){
			//connection.connect();			
			// retrieve the case id and stock it in theCase_id
			connection.query("START TRANSACTION;SELECT case_id FROM case_id_test limit 1;COMMIT;", function (err, result, fields) {
				if (err) throw err;
				theCase_id = result[1][0].case_id;
				console.log("le case id est : " + theCase_id);
				finalSpeech = finalSpeech + theCase_id;
				console.log(finalSpeech);

				// delete the case id we just took
				var mySQLString_2 = "START TRANSACTION;delete from case_id_test where case_id =" + theCase_id + ";COMMIT;";
				connection.query(mySQLString_2, function (err, result, fields) {
					if (err) throw err;
					console.log("Erased");
					connection.end();
				
				});		
			});
		}
		function lastFunction(){
			return res.json({
				"speech": finalSpeech,
				"displayText": finalSpeech,
				"source": 'test_2_cahtbot',
				"data": "data",
			});
		}
	}// end if
	
	console.log("when do i get here ?");
	/*
	return res.json({
		"speech": "Something is wrong I souldn't go here in the webhook, sorry :)",
		"displayText": "do we care about this one ?",
		"source": 'test_2_cahtbot',
		"data": "data",
   });
	*/
	
	// essential
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
})

var server = expressApp.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
    console.log("Fin du programme ");
});
