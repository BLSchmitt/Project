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
// expressApp.post('/PATH', function (request, response) {
expressApp.post('/', function (req, res) {
    var theData = req.body.result.resolvedQuery;
   // var textOTW = req.body.parameters.value;
    var theSpeech = "I'm so geat !!"
    var testSpeech = "Best answer ever, Krom !"
    
    return res.json({
        "speech": "Best answer ever, Krom !",
        "displayText": "do we care about this one ?",
        "source": 'First_ChatBot',
        "data": theData,
        "followupEvent": {
             "name": "<event_OTD_test>",
             "data": {
                     "<truc>":"<waza>"
              }
        }
    });

    var request = app.textRequest('', {
        sessionId: '4f330a33-a3a9-4167-b2b5-d04eaa86d8b5'
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
  console.log("loginloginloginloginlooooging");
  console.log("logoft " + expressApp);
 
});
