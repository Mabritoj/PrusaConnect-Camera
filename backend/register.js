const https = require('https');
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

exports.registerPrinter = function(input_name, input_uuid, input_token, input_fingerprint) {
    return new Promise(function(resolve, reject)
    {
        fs.exists('printers.json', function(exists) {

            if (exists) {
                fs.readFile('printers.json', 'utf8', function readFileCallback(err, data) {
                    if (err) {
                        console.log(error);
                        reject(err);
                    }
        
                    const parsedData = JSON.parse(data);

                    if(parsedData.length == 0){
                        var printerJSON = {
                            name: input_name,
                            uuid: input_uuid,
                            token: input_token,
                            fingerprint: input_fingerprint
                        }
            
                        parsedData.push(printerJSON);
            
                        fs.writeFileSync('printers.json', JSON.stringify(parsedData, null, 2), 'utf8'); 
                        
                        resolve();
                    }
                    else
                    {
                        var printerJSON = {
                            name: input_name,
                            uuid: input_uuid,
                            token: input_token,
                            fingerprint: input_fingerprint
                        }
            
                        parsedData.splice(0,1);
                        parsedData.push(printerJSON);
            
                        fs.writeFileSync('printers.json', JSON.stringify(parsedData, null, 2), 'utf8'); 
                        
                        resolve();
                    }
                });
            }
            else
            {
                reject("printers.json file does not exist. Please create it and restart the application")
            }
        })
    });
}

//COMMENT - Ideally this application would register and create the Camera entry on PrusaConnect
//COMMENT - The authorization to the /camera api to register it requires cookies and this isnt idea from a third party application standpoint.

/*exports.registerPrinter = function(uuid) {
    return new Promise(function(resolve, reject)
    {
        var chunks = "";

        var postRequest = {
            host: "connect.prusa3d.com",
            path: '/app/printers/' + uuid + '/camera?origin=OTHER',
            port: 443,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            json: true
        };

        var req = https.request(postRequest, function(res) {
            res.setEncoding('utf8');

            res.on('data', function(data) {
                chunks += data.toString();
            }).on('end', function() {
                let response;

                try
                {
                    response = JSON.parse(chunks);
                }
                catch
                {
                    response = chunks;
                }

                console.log(response);
                resolve(response);  
            });
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            reject(e.message);
        });

        req.end();
    });
}*/