const https = require('https');
const fs = require('fs');

exports.uploadSnapshotTest = function(token, fingerprint) {
    return new Promise(function(resolve, reject)
    {
        const file = fs.readFileSync('./public/snickers.jpg')

        var chunks = "";

        var postRequest = {
            host: "connect.prusa3d.com",
            path: '/c/snapshot',
            port: 443,
            method: "PUT",
            headers: {
                'Content-Type': 'image/jpeg',
                'Token': token,
                'Fingerprint': fingerprint,
                'Content-Length': Buffer.byteLength(file)
            }
        };

        var req = https.request(postRequest, function(res) {
            res.setEncoding('utf8');
            var error = false;
            
            if(res.statusCode != 204)
            {
                error = true;
            }

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
                if(error == false)
                {
                    resolve(response);  
                }
                else
                {
                    reject(response);
                }
            });
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            reject(e.message);
        });

        // write data to request body
        req.write(file);
        req.end();
    });
}