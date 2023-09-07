const express = require('express');
const Route = express.Router();
const User = require('../controller/user');

Route.post('/register', User.register);

Route.post('/login', User.login);

const routeProps = {
    Route,
    auth: false
}
module.exports = routeProps;