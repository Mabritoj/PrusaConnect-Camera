const fs = require('fs');

exports.getPrinters = function() {
    return new Promise(function(resolve, reject){
        fs.exists('printers.json', function(exists) {

            if (exists) {
                console.log("Reading printers.json file to get get printers");

                fs.readFile('printers.json', 'utf8', function readFileCallback(err, data) {
                    resolve(JSON.parse(data));
                });
            } 
            else 
            {
                console.log("printers.json file does not exist....throwing error");

                reject("Please create printers.json file in the root directory and restart the application")
            }
        });        
    })
}