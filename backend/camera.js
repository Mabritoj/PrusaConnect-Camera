const https = require('https');
const fs = require('fs');

exports.uploadSnapshot = function(uuid, token, fingerprint, snapshot) {
    return new Promise(function(resolve, reject)
    {

        const file = fs.readFileSync('./public/snickers.jpg')
        const base64String = Buffer.from(file).toString('base64');

        var chunks = "";

        var postRequest = {
            host: "connect.prusa3d.com",
            path: '/c/snapshot?printer_uuid=' + uuid,
            port: 443,
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Token': token,
                'Fingerprint': fingerprint
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

        // write data to request body
        req.write(base64String);
        req.end();
    });
}