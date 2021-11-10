const express = require('express');
const bodyParser = require('body-parser');
const { userController } = require('./controllers');

const newUserAuthentication = require('./middleware/validateNewUser');

const app = express();

app.use(bodyParser.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.post('/login', userController.login);

app.post('/register', newUserAuthentication, userController.createUser);

module.exports = app;
