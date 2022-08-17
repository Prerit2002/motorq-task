const mongoose = require("mongoose");


const attendeesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Attendees", attendeesSchema);