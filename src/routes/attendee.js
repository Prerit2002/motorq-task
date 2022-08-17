const express = require("express");
const router = express.Router();
const Attendees = require("../model/attendees");
const Events = require("../model/events");
const Allotted = require("../model/attendingStudent");
const WaitingList = require("../model/waitingList");

router.post("/addattendee", async (req, res) => {
  try {
    const attendee = new Attendees(req.body);
    const result = await attendee.save();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

router.get("/getattendees", async (req, res) => {
  try {
    const result = await Attendees.find();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/deleteAttedee/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const attendee = await Attendees.findOne({ _id: req.params.id });
    if (attendee) {
      await attendee.remove();
      res.send(attendee);
    } else {
      res.send("No attendee found");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
