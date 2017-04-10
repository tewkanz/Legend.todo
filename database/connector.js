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
};
/**
 * Basic function for writing a document to the MongoDB database
 * 
 * @param {string} collectionName 
 * @param {string} id
 * @param {Object} document 
 * @returns {Promise<string>} - A promise that will reject with an error if failed and resolve to nothing
 */
var write = function connector$write(collectionName, id, document){
    return setDatabaseContext(collectionName).then((col) => {
        return new Promise((resolve,reject) => {
            var queryObject = {}
            if(!!id){
                queryObject._id=id;
            }
            col.updateOne(queryObject, document, { upsert: true}, (error, result) => {
                if(error !== null){
                    reject(error);
                }
                else{
                    resolve(result);
                }
            })
        })
    });
};

/**
 * 
 * 
 * @param {string} collectionName 
 * @returns {Promise<mongodb.collection>} - A promise that resolves to a mongodb collection reference, or rejects with an error 
 */
var setDatabaseContext = function connector$setDatabaseContext(collectionName){
    return connect((db) =>{
        if(db=== null){
            return Promise.reject(Error("Could not connect to database."));
        }
        return new Promise((resolve, reject) => {
            var options = { strict: false };
            db.collection(collectionName, options, (error, col) =>{
                if (col === null){
                    reject(error.message);
                }
                else{
                    resolve(col);
                }
            });
        });
    });
}
module.exports = connector;
module.exports.read = read;
module.exports.write = write;