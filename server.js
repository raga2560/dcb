var express = require('express')
  , app = express() // Web framework to handle routing requests
  , bodyParser = require('body-parser')
  , socket = require('socket.io')

  , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
  , routes = require('./routes'); // Routes for our application
  
 let multichain = require("multichain-node")({
    port: 7754,
    host: '139.59.33.44',
    user: "multichainrpc",
    pass: "EpQ8bXuEqtEQYXwvaC9wvLVC5KMTsKtmvipw9wn9Q9PL"
});
 
 app.use(bodyParser());
 app.use('/images',express.static(__dirname + '/images'));
 app.use('/public',express.static(__dirname + '/public'));
 
 
 
MongoClient.connect('mongodb://localhost:27017/demoapp', function(err, db) {
    "use strict";
    if(err) throw err;


    // Application routes
    routes(app, db, multichain, socket);

    app.listen(8080);
    console.log('Express server listening on port 8080');
});



