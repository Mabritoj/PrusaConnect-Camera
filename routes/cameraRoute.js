var router = require('express').Router(); 
const https = require('https');
const backend_camera = require('../backend/camera');
const backend_printers = require('../backend/printers');

router.route('/')
    .put(function(req, res) { 
        backend_printers.getPrinters().then((result) => {
            if(result.length == 1)
            {
                backend_camera.uploadSnapshotTest(result[0].token, result[0].fingerprint).then((result) => {
                    res.send(result);
                })
                .catch((err) => {
                    res.status(400).send(err);
                });                 
            }         
        })
        .catch((err) => {
            res.status(400).send(err);
        });
    });

module.exports = router;