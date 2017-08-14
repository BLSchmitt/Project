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
    
    console.log("ici le nom du test tableau " + req.body.result.contexts[0].name);
	if (req.body.result.contexts[0].name == "context_record_test"){
		console.log("jusqu'ici, ça va");
		
		var theName = req.body.result.contexts[0].parameters.name;
		console.log("le name : " + theName);

		var theKrom = req.body.result.contexts[0].parameters.krom;
		console.log("le krom : " + theKrom);

		var theNameS = JSON.stringify(theName);
		var theKromS = JSON.stringify(theKrom);
		console.log(theNameS);

		if(theNameS != "\"\"" && theKromS != "\"\""){
			console.log("MWHAHAHAHHAAHAAHHA, too easy, way too easy ...");

		}
}
	
	
	
	
    /*
    if(req.body.result.contexts != undefined){
    int j = 0;
    int i = 0;
	for(i=0 ; i<req.body.result.contexts.length ; i++){
			if (req.body.result.contexts[i].name == "context_record_test"){
				j = i;
				var theName = req.body.result.contexts[j].parameters.name;
				console.log("le name : " + theName);

				var theKrom = req.body.result.contexts[j].parameters.krom;
				console.log("le krom : " + theKrom);

				var theNameS = JSON.stringify(theName);
				var theKromS = JSON.stringify(theKrom);
				console.log(theNameS);

				if(theNameS != "\"\"" && theKromS != "\"\""){
					console.log("MWHAHAHAHHAAHAAHHA, too easy, way too easy ...");

				}
	
			}
		}
	}
    
	//*/
    
	
	/*
	
	// using array of objects
	//console.log("ici le nom du test tableau " + req.body.result.contexts[0].name);
	
	if(req.body.result.action == "Best_Action_Ever"){
		
		console.log("I get here, juste the next if ...");
		console.log("Mrwwlwlwlwlwl " + req.body.result.metadata);
		console.log("test metadata object " + req.body.result.metadata.intentId);
		console.log("Mrrrr " + req.body.result.metadata.executionSequence);
		
		
		if(req.body.result.metadata.executionSequence != undefined){
			console.log("Yataaaa, test completed");
			//console.log("le tableau d'objet " + req.body.metadate.executionSequence[0]);
		}
		else{
			console.log("still undefined, that's why");
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

// just in case
/*
 var data = req.body.result.resolvedQuery;
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
	
    
    return res.json({
        speech: data,
        displayText: data,
        source: 'test_2_chatbot',
        data: data
    });
   
*/


var server = expressApp.listen(process.env.PORT || 5000, function () {
	var port = server.address().port;
	console.log("Express is working on port " + port);
	console.log("Fin du programme ");
	
});
