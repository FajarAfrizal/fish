const flaverr = require('flaverr');
const {Schedule} = require('../model');
const httpRes = require('../helpers/httpRes');

const Create = async (req, res, next) => {
    try {
        const { id_product, schedule_date, portion} = req.body;
        const schedule =
        {
            id_product, 
            schedule_date, 
            portion
        }

        await Schedule.create(schedule)

        return httpRes(res, 201)
    } catch (err){
        return next(err);
    }
} 

module.exports = {
Create
}