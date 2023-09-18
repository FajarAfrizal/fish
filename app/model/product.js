// name  serial  id_user
const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const productSchema =  Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type_product: {
        type: String,
        required: true
    },
    serial_number: {
        type: String,
        required: true
    },
    detail_location: {
        type : String,
        required : true
    },
    range_stock: {
        type: Number,
        required: true
    }
},
{
    timestamps: true,
})

const Product = model('Product', productSchema);

module.exports = Product;