const mongoose = require('mongoose')

const attendeeWaitlist = new mongoose.Schema(
    {
        attendeeeId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        eventId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        }
})

const Waitlist = mongoose.model("waitlist",attendeeWaitlist)

module.exports = Waitlist