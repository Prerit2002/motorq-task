const express = require("express");
const router = express.Router();
const Attendees = require("../model/attendees");
const Events = require("../model/events");
const Allotted = require("../model/attendingStudent");
const Waitlist = require("../model/waitingList");

const days =  {
    "day1":1,
    "day2":2,
    "day3":3
}


router.post('/registration/:attendeeId/:eventId', async (req, res) => {
    const attendeeId = req.params.attendeeId
    const eventId = req.params.eventId
    const currentDay = req.body.day
    const currentTime = req.body.time
    try{
        const attendee = await Attendees.findOne({_id: attendeeId})
        const event = await Events.findOne({_id: eventId})
        console.log(event)
        if(attendee && event){
           
            const allotted = await Allotted.findOne({attendeeId: attendeeId, eventId: eventId})
            console.log("hi")
            
            if(allotted){
                console.log("allotted")
                return res.send('Already registered')
            }
                
                const myEvents = await Allotted.find({attendeeId: attendeeId})   
               
                const requiredEvent = await Events.findById(eventId)
                console.log(requiredEvent)
                const check = false
                
                await Promise.all(myEvents.map(async (ev) => {
                    const regEvent = await Events.findById(ev.eventId)
                    if(regEvent.day === requiredEvent.day){
                        if(regEvent.startTime >= requiredEvent.startTime && regEvent.endTime <= requiredEvent.endTime || reqEvent.endTime >= requiredEvent.startTime && reqEvent.endTime <= requiredEvent.endTime){
                            check = true
                        }
                    }

                }))
               

                if(check){
                    return res.send('overlapping')
                }else{
                    console.log("inside")
                    console.log(requiredEvent)
                    const reEvent = await Allotted.find({eventId: eventId})
                    if(reEvent === null){
                        console.log("yes")
                    }
                    
                    console.log(reEvent)
                    if(requiredEvent.capacity <= reEvent.length){
                        console.log("waiting")
                        const wait = new Waitlist({
                            attendeeId: attendeeId,
                            eventId: eventId
                        })
                        await waitingList.save()
                        return res.send('waiting list')
                    }else{
                        console.log("checkingsss")
                        


                        const allotted = new Allotted({
                            attendeeId: attendeeId,
                            eventId: eventId
                        })
                        await allotted.save()
                        return res.send('registered')
                    }
                    
                }

            
        }else{
            res.send('No attendee found')
        }

    }catch(err){
        res.send(err)
    }

})


router.delete('/registration/:attendeeId/:eventId' , async (req, res) => {
    

    try{
        const attendeeId = req.params.attendeeId
        const eventId = req.params.eventId
        const allotted = await Allotted.findOne({attendeeId: attendeeId, eventId: eventId})
        if(!allotted){
            return res.send('Not registered')
        }
        console.log(allotted)
        await allotted.remove()
        res.send('Unregistered')
        const waiting = await Waitlist.find({eventId: eventId})
        if(waiting.length > 0){
            const first = waiting[0]
            const added = new Allotted({
                attendeeId: first.attendeeId,
                eventId: first.eventId
            })
            await added.save()
            await first.remove()
        }
        return res.send("registrated from waiting list")

    }catch(err){
        console.log("error")
        res.send(err)
    }
} )




module.exports = router;