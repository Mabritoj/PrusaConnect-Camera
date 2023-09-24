const routes = require('express').Router()
    , register = require('./registerRoute');

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Connected!' });
});

routes.use('/register', register); 

module.exports = routes;