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
	if(req.body.result.action == "Redirect_client_data"){
		
		var i =0;
		while (req.body.result.contexts[i].name != "record_context"){
			i++;
		}
		console.log(req.body.result.contexts[i].name);
		console.log(""+req.body.result.contexts[i].parameters.name)
		var recordContext = req.body.result.contexts[i].parameters;
		
		if( (recordContext.name == undefined || recordContext.name == "") && (recordContext.given_name == undefined || recordContext.given_name == "") && (recordContext.name_2 == undefined || recordContext.name_2 == "") && (recordContext.given_name_2 == undefined || recordContext.given_name_2 == "") ){	
			return res.json({
				"speech": "Please give me your name. You can use a sentence as : \nMy name is YourName",
				"displayText": "Please give me your name. You can use a sentence as : \nMy name is YourName",
				"source": 'test_2_cahtbot',
				"data": ""
		   });
		}
		else{
			if( (recordContext.email == "" || recordContext.email == undefined) && (recordContext.email_2 == "" || recordContext.email_2 == undefined) ){
				return res.json({
					"speech": "Please give me your email adresse. You can use a sentence as : \nMy email is Youremail",
					"displayText": "Please give me your email adresse. You can use a sentence as : \nMy email is Youremail",
					"source": 'test_2_cahtbot',
					"data": ""
			   });
			}
			else{
				if( (recordContext.phone_number == "" || recordContext.phone_number == undefined) && (recordContext.phone_number_2 == "" || recordContext.phone_number_2 == undefined) ){
					return res.json({
						"speech": "Please give me your phone number. You can use a sentence as : \nMy number is Yourenumber",
						"displayText": "Please give me your phone number. You can use a sentence as : \nMy number is Yourenumber",
						"source": 'test_2_cahtbot',
						"data": ""
				   });
				}
				else{
					if( recordContext.status == "" || recordContext.status == undefined ){
						if(req.body.result.metadata.intentName == "Information_yes_fallback"){
							return res.json({
								"speech": "Is the machine down, partially down or inhibited ?",
								"displayText": "Is the machine down, partially down or inhibited ?",
								"source": 'test_2_cahtbot',
								"data": ""
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
							return res.json({
								"speech": "Great, now I will ask for the status of the machine. \nIs the machine down, partially down or inhibited ?",
								"displayText": "Great, now I will ask for the status of the machine. \nIs the machine down, partially down or inhibited ?",
								"source": 'test_2_cahtbot',
								"data": ""
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
						if( recordContext.problem_desc == "" || recordContext.problem_desc == undefined ){						
							return res.json({
								"speech": "Please give me the description of your problem. You can use a sentence as : \nMy problem is YourProblem",
								"displayText": "Please give me the description of your problem. You can use a sentence as : \nMy problem is YourProblem",
								"source": 'test_2_cahtbot',
								"data": ""
						   });
						}
						else{
							if( recordContext.case_type == "" || recordContext.case_type == undefined ){
							// Case_type
								if(req.body.result.metadata.intentName == "problem_desc_no_fallback"){
									return res.json({
										"speech": "You need to choose one of this 4 cate type : \nC-job (problem, corrective maintenance, issue), \nP-job (service, planned maintenance), \nK-job (upgrade, update), \nI-job (Installation).",
										"displayText": "You need to choose one of this 4 cate type : \nC-job (problem, corrective maintenance, issue), \nP-job (service, planned maintenance), \nK-job (upgrade, update), \nI-job (Installation).",
										"source": 'test_2_cahtbot',
										"data": ""
								   });
								}
								else{
									// problem_desc_no_fallback
									return res.json({
										"speech": "Please give me the case type. We have 4 different case type : \nC-job (problem, corrective maintenance, issue), \nP-job (service, planned maintenance), \nK-job (upgrade, update), \nI-job (Installation). \nWhich one is yours ? \nYou can use a sentence as : \nThe case type is TheCaseType",
										"displayText": "Please give me the case type. We have 4 different case type : \nC-job (problem, corrective maintenance, issue), \nP-job (service, planned maintenance), \nK-job (upgrade, update), \nI-job (Installation). \nWhich one is yours ? \nYou can use a sentence as : \nThe case type is TheCaseType",
										"source": 'test_2_cahtbot',
										"data": ""
								   });
								}
							}
							else{
								if( recordContext.system_id == "" || recordContext.system_id == undefined ){
								// system_ID
									return res.json({
										"speech": "Please give me the system id. You can use a sentence as : \nThe system ID is ZA1234MR01",
										"displayText": "Please give me the system id. You can use a sentence as : \nThe system ID is ZA1234MR01",
										"source": 'test_2_cahtbot',
										"data": "",
										"contextOut": [
											{
												"name":"sealed", 
												"lifespan":2
											}
										],
										"followupEvent": {
											"name": "event_find_system_ID"
										}
								   });
								}
								else{
									if( recordContext.location == "" || recordContext.location == undefined ){
									// location
										if(req.body.result.metadata.intentName == "system_ID_yes"){
											return res.json({
												"speech": "Great, I will ask for your location then check-up with you all the data and it will be the end.",
												"displayText": "Great, I will ask for your location then check-up with you all the data and it will be the end.",
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
											return res.json({
												"speech": "Please give me your location. Use a sentence as : \nMy location is YourLocation",
												"displayText": "Please give me your location. Use a sentence as : \nMy location is YourLocation",
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
							}
						}
					}
				}
			}
		}		
	}
		
		
	
    
	// system_ID
	// In order to check the system ID we need to trigger it.
	// if the action is save_case_type_data or ask_system_ID then call event event_find_system_ID
	if (req.body.result.action == "save_case_type_data" || req.body.result.action == "ask_system_ID"){
		console.log("system_id event working");
   		return res.json({
			"speech": "hihoheho",
			"displayText": "do we care about this one ?",
			"source": 'test_2_cahtbot',
			"data": "data",
			"contextOut": [
				{
					"name":"sealed", 
					"lifespan":2
				}
			],
			"followupEvent": {
				"name": "event_find_system_ID",
				"data":{
					"system_ID": ""
				}
			}
		});		
	} // end if
	
	
	// call final check (big_followup)
	// we need to make sur we have all the data before the laste confirmation.
	// so we need to check in the record_context if we have everything (name or given_name or name_2 && problem_desc.original && status ... )
	// when we have all the data we need, we juste have to call the final checking.
	// if action is save_location_data or call_final_check then call event_final_confirmation and set the context to event_final_confirmation
	if (req.body.result.action == "save_location_data" || req.body.result.action == "call_final_check"){
		
		var ii =0;
		while (req.body.result.contexts[ii].name != "record_context"){
			ii++;
		}
		
		var recordContext = req.body.result.contexts[ii].parameters;
		
		if( (recordContext.name == undefined || recordContext.name == "") && (recordContext.given_name == undefined || recordContext.given_name == "") && (recordContext.name_2 == undefined || recordContext.name_2 == "") && (recordContext.given_name_2 == undefined || recordContext.given_name_2 == "") ){	
			return res.json({
				"speech": "Please give me your name. You can use a sentence as : \nMy name is YourName",
				"displayText": "Please give me your name. You can use a sentence as : \nMy name is YourName",
				"source": 'test_2_cahtbot',
				"data": ""
		   });
		}
		else{
			if( (recordContext.email == "" || recordContext.email == undefined) && (recordContext.email_2 == "" || recordContext.email_2 == undefined) ){
				return res.json({
					"speech": "Please give me your email adresse. You can use a sentence as : \nMy email is Youremail",
					"displayText": "Please give me your email adresse. You can use a sentence as : \nMy email is Youremail",
					"source": 'test_2_cahtbot',
					"data": ""
			   });
			}
			else{
				if( (recordContext.phone_number == "" || recordContext.phone_number == undefined) && (recordContext.phone_number_2 == "" || recordContext.phone_number_2 == undefined) ){
					return res.json({
						"speech": "Please give me your phone number. You can use a sentence as : \nMy number is Yourenumber",
						"displayText": "Please give me your phone number. You can use a sentence as : \nMy number is Yourenumber",
						"source": 'test_2_cahtbot',
						"data": ""
				   });
				}
				else{
					if( recordContext.status == "" || recordContext.status == undefined ){
						return res.json({
							"speech": "Please give me the status of the machine. You can use a sentence as : \nThe status is theStatus",
							"displayText": "Please give me the status of the machine. You can use a sentence as : \nThe status is theStatus",
							"source": 'test_2_cahtbot',
							"data": ""
					   });
					}
					else{
						if( recordContext.problem_desc == "" || recordContext.problem_desc == undefined ){						
							return res.json({
								"speech": "Please give me the description of your problem. You can use a sentence as : \nMy problem is YourProblem",
								"displayText": "Please give me the description of your problem. You can use a sentence as : \nMy problem is YourProblem",
								"source": 'test_2_cahtbot',
								"data": ""
						   });
						}
						else{
							if( recordContext.case_type == "" || recordContext.case_type == undefined ){
							// Case_type
								return res.json({
									"speech": "Please give me the case type. You can use a sentence as : \nThe case type is TheCaseType",
									"displayText": "Please give me the case type. You can use a sentence as : \nThe case type is TheCaseType",
									"source": 'test_2_cahtbot',
									"data": ""
							   });
							}
							else{
								if( recordContext.system_id == "" || recordContext.system_id == undefined ){
								// system_ID
									return res.json({
										"speech": "Please give me the system id. You can use a sentence as : \nThe system ID is ZA1234MR01",
										"displayText": "Please give me the system id. You can use a sentence as : \nThe system ID is ZA1234MR01",
										"source": 'test_2_cahtbot',
										"data": "",
										"contextOut": [
											{
												"name":"sealed", 
												"lifespan":2
											}
										],
										"followupEvent": {
											"name": "event_find_system_ID"
										}
								   });
								}
								else{
									if( recordContext.location == "" || recordContext.location == undefined ){
									// location
										return res.json({
											"speech": "Please give me your location. You can use a sentence as : \nMy location is YourLocation",
											"displayText": "Please give me your location. You can use a sentence as : \nMy location is YourLocation",
											"source": 'test_2_cahtbot',
											"data": ""
									   });
									}
									else{
										 return res.json({
											"speech": "hihoheho",
											"displayText": "do we care about this one ?",
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
	}// end if
	
	
	// final checking
	// when we trigger the big_followup we need to ask the user if everything is allright
	// he will answer by yes or no
	if(req.body.result.action == "final_confirmation"){
		
		var j =0;
		while (req.body.result.contexts[j].name != "record_context"){
			j++;
		}
		// store the data
		var theStatus = req.body.result.constext[j].parameters.status;
		var theLocation = req.body.result.constext[j].parameters.location;
		var theCase_type = req.body.result.constext[j].parameters.case_type;
		var theProblem_desc = req.body.result.constext[j].parameters.problem_desc;
		var theSystem_id = req.body.result.constext[j].parameters.system_id;
		
		if( req.body.result.context[j].parameters.name_2 == undefined ){			
			var theEmail = req.body.result.context[j].parameters.email;
			var thePhone_number = req.body.result.context[j].parameters.phone_number;
			if(req.body.result.context[j].parameters.name == ""){
				var theName = req.body.result.context[j].parameters.given_name;
			}
			else{
				var theName = req.body.result.context[j].parameters.name;
			}
		}
		else{
			var theEmail = req.body.result.context[j].parameters.email_2;
			var thePhone_number = req.body.result.context[j].parameters.phone_number_2;
			if(req.body.result.context[j].parameters.name_2 == ""){
				var theName = req.body.result.context[j].parameters.given_name_2;
			}
			else{
				var theName = req.body.result.context[j].parameters.name_2;
			}
		} 
		var theSpeech = "are this information correct ? \nName : "+theName+" \nEmail : "+theEmail+" \nPhone number : "+thePhone_number+" \nStatus : "+theStatus+"\nProblem description : "+theProblem_desc+"\nCase type : "+theCase_type+"\nSystem ID : "+theSystem_id+"\nLocation : "+theLocation; 
		
		return res.json({
			"speech": theSpeech,
			"displayText": theSpeech,
			"source": 'test_2_cahtbot',
			"data": "data",
		});
	} // end if
	
	
	
	// if there is a data that is wrong in the last confirmation we need first to find the one we want to change.
	// then we change it then we need to retrigger the big_followup
	// if action == Big_followup.Big_followup-no
		// switch
		// case  req.body.result.resolvedQuery == "name"
			// then call event_final_correction_name
		// case req.body.result.resolvedQuery == "email"
		// case ...
	
	
		// then blabla 
		// then 
		/*
		"followupEvent": {
			"name": "event_find_system_ID",
			// that doesn't work i don't know why now 08/08/2017
			//	 "data": {
			//			 "truc": theSpeech
			//	  }
		}
		//*/
	// end if
	
	// if the action is win it means the user confirmed we have all the data we need
	// then save all the data to mysql
	if(req.body.result.action == "win"){
		
	//*
		var mySQLString = "START TRANSACTION;";

		// var theKrom = req.body.result.contexts[ji].parameters.krom;
		// var theNameS = JSON.stringify(theKrom);
		var j =0;
		while (req.body.result.contexts[j].name != "record_context"){
			j++;
		}
		
		var theStatus = req.body.result.constext[j].parameters.status;
		var theLocation = req.body.result.constext[j].parameters.location;
		var theCase_type = req.body.result.constext[j].parameters.case_type;
		var theProblem_desc = req.body.result.constext[j].parameters.problem_desc;
		var theSystem_id = req.body.result.constext[j].parameters.system_id;
		
		if( req.body.result.context[j].parameters.name_2 == undefined ){			
			var theEmail = req.body.result.context[j].parameters.email;
			var thePhone_number = req.body.result.context[j].parameters.phone_number;
			if(req.body.result.context[j].parameters.name == ""){
				var theName = req.body.result.context[j].parameters.given_name;
			}
			else{
				var theName = req.body.result.context[j].parameters.name;
			}
		}
		else{
			var theEmail = req.body.result.context[j].parameters.email_2;
			var thePhone_number = req.body.result.context[j].parameters.phone_number_2;
			if(req.body.result.context[j].parameters.name_2 == ""){
				var theName = req.body.result.context[j].parameters.given_name_2;
			}
			else{
				var theName = req.body.result.context[j].parameters.name_2;
			}
		}
		
		var theProblem_descS = JSON.stringify(theProblem_desc);
		var theNameS = JSON.stringify(theName);
		var theEmailS = JSON.stringify(theEmail);
		var thePhone_numberS = JSON.stringify(thePhone_number);
		var theSystem_idS = JSON.stringify(theSystem_id);
		var theStatusS = JSON.stringify(theStatus);
		
		var theCase_typeS = JSON.stringify(theCase_type);
		var theLocationS = JSON.stringify(theLocation);
				
		
		var connection = mysql.createConnection({
			host: '41.185.27.253',
			user: 'iot_Admin',
			password: '<r0(k>IOT',
			database: 'IOT',
			multipleStatements: true
		});

mySQLString += 'INSERT INTO case_files (description,name,email,contact_number,systemID,status) VALUES ( ' + theProblem_descS +  ',' + theNameS +  ',' + theEmailS +  ',' + thePhone_numberS +  ',' + theSystem_idS +  ',' + theStatusS +  ');';


		console.log(mySQLString);
		putInSQL();

		function putInSQL() {
			mySQLString += "COMMIT;"

			connection.connect();

			connection.query(mySQLString, function (error, results, fields) {

				if (error) throw error;
				console.log('INSERTED TO MYSQL');

			});

			mySQLString = "";
			mySQLString = "START TRANSACTION;"

		}
		connection.end();
	//*/
	
	}// end if
	
	// to delete
	return res.json({
			"speech": "hihoheho",
			"displayText": "do we care about this one ?",
			"source": 'test_2_cahtbot',
			"data": "data",
	   });
    
	
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
