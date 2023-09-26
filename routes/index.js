const routes = require('express').Router()
    , register = require('./registerRoute')
    , camera = require('./cameraRoute')
    , printers = require('./printersRoute');

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Connected!' });
});

routes.use('/register', register); 
routes.use('/camera', camera);
routes.use('/printers', printers);

module.exports = routes;