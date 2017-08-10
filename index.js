'use strict';

var apiai = require('apiai');

var app = apiai("199651c380d041f3bca8829faf829f1c");
const bodyParser = require('body-parser');

var express = require('express')
var expressApp = express()

expressApp.use(bodyParser.urlencoded({
    extended: true
}));
expressApp.use(bodyParser.json());
expressApp.post('/', function (req, res) {
    var data = req.body.result.resolvedQuery;
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
   
    
    return res.json({
        speech: data,
        displayText: data,
        source: 'test_2_chatbot',
        data: data
    });
    
    return res.json({
		"followupEvent": {
				 "name": "event_OTD_test",
				 // that doesn't work i don't know why now 08/08/2017
				 "data": {
						 "truc": theSpeech
				  }
		}
	});
    
    
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
