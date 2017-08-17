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
								if( recordContext.system_ID == "" || recordContext.system_ID == undefined ){
								// system_ID
									return res.json({
										"speech": "Please give me the system id. You can use a sentence as : \nThe system ID is ZA1234MR01",
										"displayText": "Please give me the system id. You can use a sentence as : \nThe system ID is ZA1234MR01",
										"source": 'test_2_cahtbot',
										"data": ""
										"followupEvent": {
											"name": "event_find_system_ID",
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
								}
							}
						}
					}
				}
			}
		}
		
	}
		
		
		// information 2
		// switch case (name or name_2 or given_name or given_name_2 != "\"\"" && != undefined ...)
		// ok mais si ils le sont alors on rep : please say something like "my name is YellowSummarin"
	
		/*
			return res.json({
				"speech": testSpeech,
				"displayText": "do we care about this one ?",
				"source": 'First_ChatBot',
				"data": theData,
		
		// case ...
		
	 // end if
	//*/
	
	
	
	// if action == find_information_1 then send a context that record the info 
	// with another name than the name in record_context. to make sure information_2 don't erase the data
	// send a context with name and email remplace by the value of name_2 and email_2
	
		// **TO DO**
	/*
		"contextOut": [
				{
				"name":"un_autre_context",
				"lifespan":2,
				"parameters":
					{
					"TestTest":"Rome"
					}
				}
			]
	//*/
	// end if
	
    
	// system_ID
	// In order to check the system ID we need to trigger it.
	// if the action is save_case_type_data or ask_system_ID then call event event_find_system_ID
	if (req.body.action == "save_case_type_data" || req.body.action == "ask_system_ID"){
		return res.json({
			"followupEvent": {
					 "name": "event_find_system_ID",
			}
		});		
	} // end if
	
	
	
	// we need to make sur we have all the data before the laste confirmation.
	// so we need to check in the record_context if we have everything (name or given_name or name_2 && problem_desc.original && status ... )
	// when we have all the data we need, we juste have to call the final checking.
	// if action is save_location_data then call event_final_confirmation
		/*
		 return res.json({
			"followupEvent": {
					 "name": "event_find_system_ID",
					 // that doesn't work i don't know why now 08/08/2017
				//	 "data": {
				//			 "truc": theSpeech
				//	  }
			}
		});
		//*/
	// end if
	
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
	
	// if the action is win 
	// then save all the data to mysql
	/*
		var mySQLString = "START TRANSACTION;";

		// var theKrom = req.body.result.contexts[ji].parameters.krom;
		// var theNameS = JSON.stringify(theKrom);

		var connection = mysql.createConnection({
			host: '41.185.27.253',
			user: 'iot_Admin',
			password: '<r0(k>IOT',
			database: 'IOT',
			multipleStatements: true
		});

mySQLString += 'INSERT INTO case_files (description,name,email,contact_number,systemID,status) VALUES ( ' + theKromS +  ',' + theKromS +  ',' + theKromS +  ',' + theKromS +  ',' + theKromS +  ',' + theKromS +  ');';


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
	
	// end if
	
	return res.json({
			"speech": "hihoheho",
			"displayText": "do we care about this one ?",
			"source": 'test_2_cahtbot',
			"data": "data",
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
})

var server = expressApp.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
    console.log("Fin du programme ");
});
