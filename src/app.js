const express = require('express')
require('./db/mongoose')
const attendeerouter = require('./routes/attendee')
const eventrouter = require('./routes/events')
const registrationrouter = require('./routes/registration')
const app = express()




app.use(express.json())
app.use(attendeerouter)
app.use(eventrouter)
app.use(registrationrouter)


module.exports = app