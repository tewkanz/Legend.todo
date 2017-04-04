var connector = connector || {};
var MongoClient = require('mongodb').MongoClient;

//Connection url: mongodb://<hostname>:<port>/<database>
var url = 'mongodb://legend.todo:password@localhost:27017/test';

var db = null;

// Use connect method to connect to server
var connect = function connector$connect(connectionCallback) {
    return MongoClient.connect(url).then(function (database) {
            console.log("Connected successfully to host: " + url);
            return database
    },
    function(err){
        if (err !== null) {
            console.error("Problem connecting to database: " + url + '\n' + err.message)
        }
    }).then(connectionCallback);
}
var read = function connector$read(collectionName, queryParameters){
    return connect(function(db){
        if(db === null){
            return Promise.resolve([]);
        }
        return new Promise(function(resolve, reject) {
            var options = {};
            options.strict = true;
            db.collection(collectionName, options, function(error, col){
                if (col === null){
                    reject(Error(error.message));
                }
                else{
                    resolve(col);
                }
            })
        }).then(function(col){
                var result = col.find(queryParameters);
                return new Promise(function(resolve, reject) {
                    result.toArray(function(error, value){
                        console.log("Database closed.");
                        db.close();
                        if(value !== null){
                            resolve(value);
                        }
                        else{
                            reject(Error(error.message));
                        }
                    });
                });
            }); 
    });
}

module.exports = connector;
module.exports.read = read;