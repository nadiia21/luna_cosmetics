const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_CONNECT)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

const productRoute = require('./routes/products');
app.use('/products', productRoute);

const cartRoute = require('./routes/cart');
app.use('/api/cart', cartRoute);

const orderRoute = require('./routes/orders');
app.use('/api/orders', orderRoute);

const contactRoute = require('./routes/contacts');
app.use('/api/contacts', contactRoute);

const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
