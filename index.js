'use strict';

var apiai = require('apiai');

var app = apiai("3b66bd00e60a41a4b2c5ff780a1f1884");
const bodyParser = require('body-parser');

var express = require('express')
var expressApp = express()

expressApp.use(bodyParser.urlencoded({
    extended: true
}));
expressApp.use(bodyParser.json());
expressApp.post('/', function (req, res) {
 
	
	// if action == find_information_1 then send a context that record the info 
	// with another name than the name in record_context. to make sure information_2 don't erase the data
	// send a context with name and email remplace by the value of name_2 and email_2
	
		// **TO DO**

	// end if
	
    
	// In order to check the system ID we need to trigger it.
	// if the action is save_case_type_data or ask_system_ID then call event event_find_system_ID
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
		// case  body.result.resolvedQuery == "name"
			// then call event_final_correction_name
		// case body.result.resolvedQuery == "email"
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
	
    
    var request = app.textRequest('', {
        sessionId: 'e5c6eb93-3255-4640-b48f-bfb04298b74e'
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
