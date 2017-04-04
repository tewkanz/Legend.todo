var viewTest = viewTest || {}
var handleBars = require('Handlebars');
var connector = require('../../database/connector')

var getData = function viewTest$getData(){
    var content = {}
    var body = "";
    // get some data from the database
    return Promise.resolve(connector.read("test", { "_id": 1})).then(function(documentArray){
        if (documentArray === null){
            return new Promise(function(resolve, reject){
                var content = {};
                content.title = "An error has occurred.";
                content.documents = [{ content: "Could not find test record."}];
                resolve(content);
            });
        }    
        return Promise.resolve(documentArray).then(function(value){
            if(value !== null){
                console.log("Got response from database: " + value);
                var content = {};
                content.title = "Test loading data from the database!";
                content.documents = value;
                return content;
            }
        }).catch(function(error){
            var content = {};
            content.title = "An error has occurred.";
            content.documents = [{ content: "Could not find test record." }];
            return content;
        });
    });
}


var render = function viewTest$render(req, res, next){
    Promise.resolve(getData()).then(
        function(value){ 
            console.log("Value: "+ value); 
            res.render('viewTest/viewTest', value); 
        });
}
module.exports = viewTest
module.exports.render = render