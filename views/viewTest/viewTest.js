var viewTest = viewTest || {}
var handleBars = require('Handlebars');
var connector = require('/database/connector')

viewTest.getData() = function viewTest$getData(){
    var content = {}
    var body = "";
    // get some data from the database
    var cursor = connector.read("test", { _id: 1});
    if (cursor === null){
        content.title = "An error has occurred."
        content.body = "Could not find test record."
        return content;
    }
    // make that data into html elements
    content.documents = []
    while(yield cursor.hasNext()){
        var document = cursor.next();
        content.documents.push(document);
    }
    content.document = formatDocument;
    // return
    return document;
}

var formatDocument = function viewTest$formatDocument(){
    var element = "";
    element = element + "<h1>" + Handlebars.escapeExpression(this.title) + "</h1>"
    element = element + "<p>" + Handlebars.escapeExpression(this.content) + "</p>"
    return Handlebars.SafeString(element);
}
module.exports = viewTest