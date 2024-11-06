const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/', async (req, res) => {
  console.log("Received contact data:", req.body);
  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error("Contact saving error:", error);
    res.status(500).json({ message: "Contact saving error", error: error.message });
  }
});

module.exports = router;
