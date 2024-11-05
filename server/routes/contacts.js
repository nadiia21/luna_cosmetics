const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/', async (req, res) => {
  console.log("Отримані дані для контакту:", req.body);
  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error("Помилка збереження контакту:", error);
    res.status(500).json({ message: "Помилка збереження контакту", error: error.message });
  }
});

module.exports = router;
