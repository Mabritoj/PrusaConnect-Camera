var router = require('express').Router(); 
const https = require('https');
const backend_register = require('../backend/register');
const backend_camera = require('../backend/camera');

router.route('/')
    .post(function(req, res) { 
        backend_register.registerPrinter(req.body.name, req.body.uuid, req.body.token, req.body.fingerprint).then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
    });

module.exports = router;