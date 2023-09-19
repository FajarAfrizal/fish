const express = require('express');
const Route = express.Router();
const Schedule = require('../controller/schedule');

Route.get('/', Schedule.Index);

Route.get('/:id', Schedule.FindById);

Route.post('/', Schedule.Create);

Route.put('/:id', Schedule.Update);

Route.delete('/:id', Schedule.Delete);

const routeProps = {
    Route,
    auth: true
}

module.exports = routeProps;