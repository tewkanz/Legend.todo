/**
 * @module
 */
/**
 * @returns {Object} - Object containing the scripts template 
 * 
 */
var getData = function writeTest$getData() {
    return result = {
        scripts: [
            { script : '/scripts/jquery.js'},
            { script : '/scripts/writeTestBehavior.js' }
        ]   
    };
}

module.exports.getData = getData