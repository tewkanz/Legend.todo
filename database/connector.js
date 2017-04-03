var connector = connector || {};
var MongoClient = require('mongodb').MongoClient;

//Connection url: mongodb://<hostname>:<port>/<database>
var url = 'mongodb://localhost:27017/test';

var db = null;

// Use connect method to connect to server
var connect = function connector$connect(connectionCallback) {
    MongoClient.connect(url, function (err, database) {
        if (err !== null) {
            console.error("Problem connecting to database: " + url + '\n' + err);
            return;
        }
        console.log("Connected successfully to host: " + url);
        connectionCallback(database);
    });
};

var read = function connector$read(collectionName, queryParameters){
    return connect(function(db){
        if(db === null){
            return []
        }
        return db.collection(collectionName, function(col){
            if (col === null){
                return [];
            }
            var result = col.find(queryParameters);
            db.close();
            return result.toArray();
        })
    })
}

module.exports = connector;
module.exports.read = read;