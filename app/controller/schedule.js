const flaverr = require('flaverr');
const { Schedule } = require('../model');
const httpRes = require('../helpers/httpRes');

const Create = async (req, res, next) => {
    try {
        const { id_product, schedule_date, portion,  } = req.body;
        const schedule =
        {
            id_product,
            schedule_date,
            portion
        }

        await Schedule.create(schedule)

        return httpRes(res, 201)
    } catch (err) {
        return next(err);
    }
}

const Index = async (req, res, next) => {
    try {
        const schedule = await Schedule.find()

        if (!schedule) {
            throw flaverr('E_NOT_FOUND', Error('Schedule not found'))
        }

        return httpRes(res, 200, schedule)
    } catch (err) {
        return next(err)
    }
}

const FindById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const schedule = await Schedule.findById(id)

        if (!schedule) {
            throw flaverr('E_NOT_FOUND', Error(`Schedule with id ${id} not found`));
        }

        return httpRes(res, 200, schedule)
    } catch (err) {
        return next(err)
    }
}

const Update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id_product, schedule_date, portion, status } = req.body;

        const schedule = await Schedule.findById(id)

        if (!schedule) {
            throw flaverr('E_NOT_FOUND', Error(`Schedule with id ${id} not found`));
        }

        schedule.id_product = id_product;
        schedule.schedule_date = schedule_date;
        schedule.portion = portion;
        schedule.status = status;

        await schedule.save()

        return httpRes(res, 200)
    } catch (err) {
        return next(err)
    }
}

const Delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const schedule = await Schedule.findById(id)

        if (!schedule) {
            throw flaverr('E_NOT_FOUND', Error(`Schedule with id ${id} not found`));
        }

        await schedule.deleteOne()
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    Create,
    FindById,
    Update,
    Index,
    Delete
}