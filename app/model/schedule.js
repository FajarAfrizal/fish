const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const scheduleProduct = Schema({
    schedule_date: {
        type: Date,
    },
    portion: {
        type: Number,
        default: 1
    },
    status: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true,
    }
)
const Schedule = model('Schedule', scheduleProduct);

module.exports = Schedule;