var router = require('express').Router(); 
const https = require('https');
const backend_printers = require('../backend/printers');

router.route('/')
    .get(function(req, res) {   
        backend_printers.getPrinters().then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        })

    });

module.exports = router;