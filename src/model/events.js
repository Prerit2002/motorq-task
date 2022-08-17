const mongoose = require("mongoose");

const days = ["day1", "day2", "day3"]


const eventsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true

    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    day: {
        type: String,
        enum: days,
        required:true
    },
    capacity: {
        type: Number,
        required: true
    }

    
})

module.exports = mongoose.model("Events", eventsSchema);