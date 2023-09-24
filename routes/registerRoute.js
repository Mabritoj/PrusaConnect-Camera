var router = require('express').Router(); 
const https = require('https');
const backend_register = require('../backend/register');
const backend_camera = require('../backend/camera');

router.route('/')
    .get(function(req, res) { 
        
        backend_register.getPrinters().then((result) => {

    
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })

    })
    .post(function(req, res) { 
        backend_register.registerPrinter(req.body.name, req.body.uuid, req.body.token, req.body.fingerprint).then((result) => {
            //backend_camera.uploadSnapshot(req.body.uuid, req.body.token, req.body.fingerprint);
            
            res.send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
    });

module.exports = router;