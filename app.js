const express = require('express');
const bodyParser = require('body-parser');
const stringRoutes = require('./routes/stringRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/strings', stringRoutes);

module.exports = app;
