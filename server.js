var app = require('./expressServer.js')
var getRandomString = require('./getRandomString.js');
var persistentDb = require('./wrappedPersistentDb.js');


app.get('/get', function (request, response) {
    //response.json(inMemoryDB.data.messages);
    response.json(persistentDb.getData('/data/messages'));
});

app.post('/post', function(request, response){
    console.log("post request received with data:", request.body.text)

    var newChatObj = {
        text: request.body.text, //get this from request.body
        createdAt: Date.now(), //call a function that is described in the readme
        objectId: getRandomString() //call a function that is described in the readme
    } 

    //inMemoryDB.data.messages.push(newChatObj); 
    persistentDb.pushToArray('/data/messages', newChatObj);

    //TODO: Save the data that the browser just sent. You can access the info that was sent down inside request.body
    //TODO: Remember to save the time the chat message was created (using Date.now) and give the chat message an objectId using getRandomString()

    response.json({success: true}); //this sends a simple notification to the browser that the info was saved succesfully.
});

app.startServer();