const express = require('express');
const router = express.Router();

let cart = [];

router.post('/add', (req, res) => {
	const { productId, name, price, image } = req.body;

	const existingProduct = cart.find(item => item.productId === productId);
	if (existingProduct) {
		existingProduct.quantity += 1;
	} else {
		cart.push({ productId, name, price, image, quantity: 1 });
	}

	res.status(200).json({ message: 'Продукт додано до кошика', cart });
});

router.get('/', (req, res) => {
	res.status(200).json(cart);
});

router.delete('/clear', (req, res) => {
	cart = [];
	res.status(200).json({ message: 'Кошик очищено' });
});

module.exports = router;
