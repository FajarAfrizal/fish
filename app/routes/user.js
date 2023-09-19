const express = require('express');
const Route = express.Router();
const User = require('../controller/user');

Route.get('/', User.Index);

Route.put('/:id', User.Update);

Route.get('/:id', User.FindById);

Route.delete('/:id', User.Delete);

Route.get('/auth/me',  User.Me);


const routeProps = {
    Route,
    auth: true
}
module.exports = routeProps;
