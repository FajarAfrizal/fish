const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const historyProduct = Schema({
    id_user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    id_product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    time_at: { 
        type: Date,
        default: new Date()
    },
    serving: {
        type: Number,
    }
})

module.exports = model('History', historyProduct);