const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  payment: { type: String, required: true },
  address: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Order', orderSchema);
