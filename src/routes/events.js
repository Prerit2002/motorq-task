const express = require("express");
const Events = require("../model/events");

const router = express.Router();

router.post("/addevent", async (req, res) => {
  try {
    const event = new Events(req.body);
    const result = await event.save();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

router.get("/getevents/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Events.findOne({ _id: id });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/deleteevent/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Events.findOne({ _id: id });
    if (event) {
      await event.remove();
      res.send(event);
    } else {
      res.send("No event found");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
