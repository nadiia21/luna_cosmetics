const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/', async (req, res) => {
  console.log("Received data for the order:", req.body);
  try {
    const newOrder = new Order({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      payment: req.body.payment,
      address: req.body.address,
      items: req.body.items
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order saving error:", error);
    res.status(500).json({ message: "Order saving error", error: error.message });
  }
});



module.exports = router;
