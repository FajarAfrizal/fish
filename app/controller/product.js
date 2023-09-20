const flaverr = require('flaverr');
const {
    Product,
    Schedule
} = require('../model');
const httpRes = require('../helpers/httpRes');

const Index = async (req, res, next) => {
    try {
        const product = await Product.find().populate({
            path: 'schedule',
        })

        if (!product.length){
            throw flaverr('E_NOT_FOUND', Error('Product not found'))
        }

        return httpRes(res, 200, product);
    } catch (err) {
        return next(err);
    }
}

const Create = async (req, res, next) => {
    try {
        const { type_product, serial_number, range_stock, detail_location } = req.body;

        const product = {
            type_product,
            serial_number,
            range_stock,
            detail_location,
            user_id: req.user.user_id
        }

        await Product.create(product)

        return httpRes(res, 201)
    } catch (err) {
        return next(err);
    }
}

const FindById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id);

        if (!product){
            throw flaverr('E_NOT_FOUND', Error(`Product  with id ${id} not found`));
        }

        return httpRes(res, 200, product);
    } catch (err) {
        return next(err)
    }
}

const Update = async (req, res, next) => {
    try{ 
        const { id } = req.params;
        const { type_product, serial_number, range_stock, detail_location } = req.body;

        const product = await Product.findById(id);

        if (!product){
            throw flaverr('E_NOT_FOUND', Error(`Product with ${id} not found`));
        }

        product.type_product = type_product;
        product.serial_number = serial_number;
        product.range_stock = range_stock;
        product.detail_location = detail_location;

        await product.save()

        return httpRes(res, 200)
    } catch (err){
        return next(err)
    }
}

const Delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product){
            throw flaverr('E_NOT_FOUND', Error(`Product with ${id} not found`));
        }

        await product.deleteOne()

        return httpRes(res, 200)
    } catch (err){
        return next(err)
    }
}

const CreateScheduleProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { schedule_date,  portion, status } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            throw flaverr('E_NOT_FOUND', Error('product not found'));
        }

        const schedule = new Schedule({ schedule_date, portion, status });

        await Schedule.save();

        product.schedule.push(schedule.id);

        await product.save();

        return httpRes(res, 201)
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    Index,
    Create,
    FindById,
    Update,
    Delete,
    CreateScheduleProduct
}

