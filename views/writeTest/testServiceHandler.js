var http = require('http');
var connector = require('../../database/connector')
var writeTest = writeTest || {};

/**
 * 
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 * @param {any} next 
 */
var testWrite = function testWrite(req, res, next){
    if(req.method !== 'POST'){
        // don't support methods other than post in this handler
        res.statusCode = 405;
        res.statusMessage = 'Method Not Allowed';
        res.write('Service does not support this method.','utf8', () =>{
            res.end(null, 'utf8');
        });
    }
    else{
        var documentObject =  req.body;
        // validate that we were sent a valid record in the request
        var errMsg = ""
        if(!documentObject.title){
            errMsg = errMsg + "Title is required. ";
        }
        if(!documentObject.content){
            errMsg = errMsg + "Content is required. ";
        }
        if(errMsg.length > 0){
            res.statusCode = 400;
            res.statusMessage = 'Bad Request';
            res.write(errMsg, 'utf8', () => {
                res.end(null, 'utf8');
            });
            return;
        }
        var objectToSend = { 
            title:documentObject.title,
            content:documentObject.content
        }
        connector.write('test', documentObject._id, objectToSend).then(
            (result) => {
                res.statusCode = 200;
                res.statusMessage = 'OK';
                res.write(JSON.stringify(result), 'utf8', () =>{
                    res.end(null,'utf8') });
                }
        , (result) => {
            res.statusCode = 200;
            res.statusMessage = 'OK'
            res.write(JSON.stringify(result), 'utf8', () => {res.end(null,'utf8');})
        });
    }
};
module.exports.testWrite = testWrite