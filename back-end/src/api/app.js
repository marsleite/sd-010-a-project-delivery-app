const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const loginRouter = require('../routers/loginRouter');
const registerRouter = require('../routers/registerRouter');
const productRouter = require('../routers/productRouter');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/login', loginRouter);

app.use('/register', registerRouter);

app.use('/products', productRouter);

module.exports = app;
