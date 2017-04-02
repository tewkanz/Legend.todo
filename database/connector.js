var connector = connector || {};
var MongoClient = require('mongodb').MongoClient;
var co = require('co');

//Connection url: mongodb://<hostname>:<port>/<database>
var url = 'mongodb://localhost:27017/testConnection';

connector.db = "",
// Use connect method to connect to server
connector.connect = function connector$connect() {
    MongoClient.connect(url, function (err, db) {
        if (err !== null) {
            console.error("Problem connecting to database: " + url + '\n' + err);
            return;
        }
        console.log("Connected successfully to host: " + url);
        connector.db = db;
    });
};

connector.read = function connector$read(database, queryParameters){
    co(function* (){
        if(db === null){
            connector.connect();
        }
        
    });
}

module.exports = connector;