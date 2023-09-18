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
  
    serving: {
        type: Number,
    }
},{
    timestamps: true,
}
)

const History = model('History', historyProduct);

module.exports = History;