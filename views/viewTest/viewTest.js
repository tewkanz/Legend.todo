var viewTest = viewTest || {}
var handleBars = require('Handlebars');
var connector = require('../../database/connector')

var getData = function viewTest$getData(){
    var content = {}
    var body = "";
    // get some data from the database
    var cursor = connector.read("test", { "_id": 1}, function(value){
        if(value !== null){
            var content = {};
            content.title = "Test loading data from the database!";
            content.documents = value;
            content.document = formatDocument;
            return content;
        }
    })
    if (cursor === null){
        return new Promise(function(resolve, reject){
            var content = {};
            content.title = "An error has occurred.";
            content.documents = ["Could not find test record."];
            resolve(content);
        });
    }
    return cursor;  
}

var formatDocument = function viewTest$formatDocument(){
    var element = "";
    element = element + "<h1>" + Handlebars.escapeExpression(this.title) + "</h1>"
    element = element + "<p>" + Handlebars.escapeExpression(this.content) + "</p>"
    return Handlebars.SafeString(element);
}

var render = function viewTest$render(req, res, next){
    Promise.resolve(getData()).then(function(value){ console.log(value); res.render('viewTest/viewTest', value); })
}
module.exports = viewTest
module.exports.render = render