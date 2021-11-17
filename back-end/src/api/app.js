const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const { findById } = require('./controllers/sales');

const app = express();

app.use('/', express.static(path.join(__dirname, '..', '..', 'public')));
app.use(cors());
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('OK FUNCIONANDO');
});

app.get('/products/:id', productController.getOne);
app.get('/products', productController.getAll);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', userController.login);
app.use('/register', userController.register);

app.use ('/sales/:id', findById)

app.use(errorHandler);

module.exports = app;
