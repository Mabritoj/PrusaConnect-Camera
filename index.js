const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const routes = require('./routes');

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use('/api', routes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(8080, () => {
    console.log("Server successfully running on port 8080");
});