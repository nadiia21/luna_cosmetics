const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    try {
        const products = await Product.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const totalProducts = await Product.countDocuments();

        res.json({
            products,
            totalProducts
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
