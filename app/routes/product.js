const express = require('express');
const Route = express.Router();
const Product = require('../controller/product');

Route.get('/', Product.Index);
Route.post('/', Product.Create);
Route.get('/:id', Product.FindById);
Route.put('/:id', Product.Update);
Route.delete('/:id', Product.Delete);

Route.post('/add-schedule/:productId', Product.CreateScheduleProduct);

Route.put('/update-schedule-status/:id', Product.updateStatusSchedule);

const routeProps = {
    Route,
    auth: true,
}

module.exports = routeProps;