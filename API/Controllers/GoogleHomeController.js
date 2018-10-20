'use strict';


var io = require('socket.io');
exports.SetIO = function(IO){
    io = IO;
}

var intentMapper = {
    intents: [
        { IntentID:"WhoAreYou", AudioResponse:"I'm sally, your assistant! I can help you be a better you. What would you like to do?", VisualResponse : "I'm sally, your assistant! I can help you be a better you. What would you like to do?" },
        { IntentID:"DisplayNumber", AudioResponse:"Roger that!", VisualResponse: "I can see that you have asked me to display a number on the display" },
        { IntentID:"ShowHealthInfo", AudioResponse: "That’s not nice. You know, you’re tracking really well. Take a look at your stats! You are doing so much better than you think.", VisualResponse:  "That’s not nice. You know, you’re tracking really well. Take a look at your stats! You are doing so much better than you think."},
        { IntentID: "ShowPhotoshopMagazingCover", AudioResponse: "Sally, you know the term “fake news”? well, social media is often like fake news. People only show the highlights of their lives but would never show their low points.", VisualResponse: "Sally, you know the term “fake news”? well, social media is often like fake news. People only show the highlights of their lives but would never show their low points."},
        { IntentID:"Default Welcome Intent", AudioResponse: "Hi Sally, how are you today?", VisualResponse:"Hi Sally, how are you today?"},
        { IntentID:"ThanksMira", AudioResponse:"Great. By the way, don’t forget to wear a jacket – it’s predicted to be cold today.", VisualResponse:"15 °C"},
    ]
 }


 


 var noIntentFound = { "IntentID":"None", "AudioResponse":"Sorry, can you try that again?", "VisualResponse" : "Sorry, can you try that again?" };

 function FindIntent(IntentId){

    for(var i = 0; i < intentMapper.intents.length; i++){
        if(intentMapper.intents[i].IntentID === IntentId){
            return intentMapper.intents[i];
        }
    }
     return noIntentFound;
 }

exports.processRequest = function(req, res) {
    console.log("Logging req");
    var picked = FindIntent(req.body.result.metadata.intentName);
    console.log(picked);
   if(picked != null)
   {
       if(picked.IntentID=== "ShowPhotoshopMagazingCover"){
           io.emit('show_health_info', {
                status: true,
               url: "https://static-cdn.jtvnw.net/jtv_user_pictures/e91a3dcf-c15a-441a-b369-996922364cdc-profile_image-300x300.png"
            });
       }

        if(picked.IntentID ==="ShowHealthInfo")
        {
            // Show health information on display
            io.emit('show_health_info', {
                status: true,
                url: ""
            });
        }

        io.emit('voice_text', {
            username: "test",
            message: picked.VisualResponse
        });

    return res.json({
        speech: picked.AudioResponse,
        displayText: picked.AudioResponse,
        source: picked.AudioResponse
    });

   }
   else
   {
    io.emit('home_status', {
        username: "test",
        message: "sorry, can you try that again?"
    });
    return res.json({
        speech: 'sorry, can you try that again?',
        displayText: 'sorry, can you try that again?',
        source: 'fullfilmentAPI'
    });
   }
    
};