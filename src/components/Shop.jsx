import React, { useState, useEffect } from 'react';
import styles from '../Styles/Shop.css';
import product2 from '../Images/product1.png';
import product1 from '../Images/product2.png';

const fetchProducts = () => {
	return [
		{
			id: 1,
			name: 'Mattifying face cream',
			price: 20.0,
			quantity: 1,
			image: product1,
		},
		{
			id: 2,
			name: 'Restorative hair spray',
			price: 16.0,
			quantity: 1,
			image: product2,
		},
	];
};

const Modal = ({ show, onClose, children }) => {
	if (!show) {
		return null;
	}

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				{children}
				<button onClick={onClose} className={styles.closeButton}></button>
			</div>
		</div>
	);
};

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [showOrderForm, setShowOrderForm] = useState(false);

	useEffect(() => {
		const loadedProducts = fetchProducts();
		setProducts(loadedProducts);
	}, []);

	const handleQuantityChange = (id, change) => {
		setProducts((prevProducts) =>
			prevProducts.map((product) =>
				product.id === id
					? { ...product, quantity: Math.max(1, product.quantity + change) }
					: product
			)
		);
	};

	const calculateTotal = () => {
		return products
			.reduce((total, product) => total + product.price * product.quantity, 0)
			.toFixed(2);
	};

	const handleMakeOrder = () => {
		setShowOrderForm(true);
	};

	const handleCloseForm = () => {
		setShowOrderForm(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());
		console.log('Form submitted:', data);

		handleCloseForm();
	};

	return (
		<div className={styles.shop}>
			<div className={styles.productList}>
				{products.map((product) => (
					<div className={styles.productItem} key={product.id}>
						<img
							className={styles.productImage}
							src={product.image}
							alt={product.name}
						/>
						<div className={styles.productDetails}>
							<div className={styles.productName}>{product.name}</div>
							<div className={styles.quantityControl}>
								<button
									className={styles.quantityButton}
									onClick={() => handleQuantityChange(product.id, -1)}
								>
									-
								</button>
								<input
									type="number"
									className={styles.quantityInput}
									value={product.quantity}
									readOnly
								/>
								<button
									className={styles.quantityButton}
									onClick={() => handleQuantityChange(product.id, 1)}
								>
									+
								</button>
							</div>
							<div className={styles.productPrice}>
								{(product.price * product.quantity).toFixed(2)} $
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={styles.orderSummary}>
				<div className={styles.totalAmount}>
					Total amount: {calculateTotal()} $
				</div>
				<button className={styles.makeOrderButton} onClick={handleMakeOrder}>
					Make an order
				</button>
			</div>

			<Modal show={showOrderForm} onClose={handleCloseForm}>
				<button className={styles.closeButton} onClick={handleCloseForm}>
					&times;
				</button>
				<h2 className={styles.orderTitle}>Enter the data</h2>
				<form className={styles.orderForm} onSubmit={handleSubmit}>
					<input type="text" placeholder="Full Name" required />
					<input type="email" placeholder="Email" required />
					<input
						type="tel"
						placeholder="Phone"
						required
						pattern="\d{10}"
						title="Phone number must be 10 digits"
					/>
					<select required>
						<option value="" disabled selected style={{ display: 'none' }}>
							Payment
						</option>
						<option
							value="credit_card"
							disabled
							title="This service is not available yet"
						>
							Credit Card (unavailable)
						</option>
						<option value="cash">Cash</option>
					</select>
					<input type="text" placeholder="Address" required />
					<button type="submit">Send</button>
				</form>
			</Modal>
		</div>
	);
};

export default Shop;
