const mongoose = require('mongoose')

const attendingStudent = new mongoose.Schema(
    {
    attendeeId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
})
module.exports = mongoose.model("Allotted",attendingStudent);
