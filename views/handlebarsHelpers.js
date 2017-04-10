/**
 * @module
 */
var hbs = require('hbs');
/**
 * Returns a script element with source path
 * @param {string} path 
 * @returns {string}
 */
var scriptElement = function handlebarsHelpers$scriptElement(path){
    var result = "<script src=\x22" + path + "\x22></script>"
    return result;
}

hbs.registerHelper('scriptElement',scriptElement);

module.exports = hbs;