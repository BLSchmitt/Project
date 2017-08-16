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
	
		// **TO DO**

	// end if
	
    
	// if the event is save_case_type_data or ask_system_ID then call event event_find_system_ID
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
		*/
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
