const express = require('express');
const User = require('../controller/user');
const Route = express.Router();

Route.post('/register', User.register);

Route.post('/login', User.login);


const routeProps = {
    Route,
    auth: false
}

module.exports = routeProps;