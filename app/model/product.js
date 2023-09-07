// name  serial  id_user
const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const productSchema =  Schema({
    name: {
        type: String,
        required: true
    },
    serial_number: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = model('Product', productSchema);