'use strict';

var apiai = require('apiai');
 
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
    
    var theName = req.body.result.parameters.name;
    console.log("le name : " + theName);
    
	var theKrom = req.body.result.parameters.krom;
	console.log("le krom : " + theKrom);
	
    var theNameS = JSON.stringify(theName);
    console.log(theNameS);
	
	if(req.body.result.action == "Best_Action_Ever"){
		
		console.log("I get here, juste the next if ...");
		console.log("mwhaha" + req.body.result.metadata);
		
		if(req.body.result.metadata.executionSequence[0].action == "\"heroku_code_test\""){
			console.log("Yataaaa, test completed");
			//console.log("le tableau d'objet " + req.body.metadate.executionSequence[0]);
		}
	}
	else{
	//*
	// that how we call an event.
	// data from multiple event can be open to be fill at the same time.
	
	return res.json({
		"followupEvent": {
				 "name": "event_OTD_test",
				 // that doesn't work i don't know why now 08/08/2017
				 "data": {
						 "truc": theSpeech
				  }
		}
	});
	
	cosole.log("do i get here ?");
	
	}
	
	
	
	
	
	  //*/
	
	
/*
   if (theNameS != "\"\""){
	return res.json({
		"speech": testSpeech,
		"displayText": "do we care about this one ?",
		"source": 'First_ChatBot',
		"data": theData,
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
		
			
	});
   }
   else{
	   return res.json({
			"speech": theSpeech,
			"displayText": "do we care about this one ?",
			"source": 'First_ChatBot',
			"data": theData,
	   });
   };
      //*/
	
//*
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

});

//*/

 /*
 // that doesn't work, I let it here just in case
var event = {
    name: "event_OTD_test",
    data: {
        truc: "Waaazzaaaaa",
    }
};

var options = {
    sessionId: 'e5c6eb93-3255-4640-b48f-bfb04298b74e'
};

var request = app.eventRequest(event, options);

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();
*/


var server = expressApp.listen(process.env.PORT || 5000, function () {
	var port = server.address().port;
	console.log("Express is working on port " + port);
	console.log("Fin du programme ");
	
});
