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
    
    return res.json({
        "speech": theSpeech,
        "displayText": "do we care about this one ?",
        "source": 'First_ChatBot',
        "data": theData,
     /*
        "followupEvent": {
             "name": "event_OTD_test",
             "data": {
                     "truc": theData
              }
        }
      //*/
    });
    
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
  console.log("voici l'envent : " + event);
});
