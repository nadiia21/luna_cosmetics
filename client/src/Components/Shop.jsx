import React, { useState, useEffect } from 'react';
import styles from '../Styles/Shop.css';

const Modal = ({ show, onClose, children }) => {
	if (!show) {
		return null;
	}

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<button className={styles.closeButton} onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

const Shop = () => {
	const [cart, setCart] = useState([]);
	const [showOrderForm, setShowOrderForm] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const fetchCart = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/cart');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			const updatedCart = data.map((item) => ({
				...item,
				quantity: item.quantity || 1,
			}));
			setCart(updatedCart);
		} catch (error) {
			console.error('Error fetching cart:', error);
		}
	};

	useEffect(() => {
		fetchCart();
	}, []);

	const handleQuantityChange = (productId, change) => {
		setCart((prevCart) =>
			prevCart
				.map((item) => {
					if (item.productId === productId) {
						const newQuantity = item.quantity + change;
						if (newQuantity <= 0) {
							return null;
						}
						return { ...item, quantity: newQuantity };
					}
					return item;
				})
				.filter(Boolean)
		);
	};

	const calculateTotal = () => {
		return cart
			.reduce((total, item) => {
				const priceValue = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
				return total + priceValue * (item.quantity || 0);
			}, 0)
			.toFixed(2);
	};

	const handleAddToCart = (item) => {
		setCart((prevCart) => {
			const existingProduct = prevCart.find(
				(product) => product.productId === item.productId
			);
			if (existingProduct) {
				return prevCart.map((product) =>
					product.productId === item.productId
						? { ...product, quantity: product.quantity + 1 }
						: product
				);
			} else {
				return [
					...prevCart,
					{
						productId: item.productId,
						name: item.name,
						price: item.price,
						image: item.image,
						quantity: 1,
					},
				];
			}
		});
	};

	const handleMakeOrder = (product) => {
		const selectedItem = cart.find(
			(item) => item.productId === product.productId
		);
		setSelectedProduct(selectedItem);
		setShowOrderForm(true);
	};

	const handleCloseForm = () => {
		setShowOrderForm(false);
		setSelectedProduct(null);
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
				{cart.length === 0 ? (
					<p className={styles.emptyCartMessage}>The basket is empty!</p>
				) : (
					cart.map((item) => (
						<div className={styles.productItem} key={item.productId}>
							{item.image ? (
								<img
									className={styles.productImage}
									src={require(`../Images/${item.image}`)}
									alt={item.name}
								/>
							) : (
								<p>Image not available</p>
							)}
							<div className={styles.productDetails}>
								<div className={styles.productName}>{item.name}</div>
								<div className={styles.quantityControl}>
									<button
										className={styles.quantityButton}
										onClick={() => handleQuantityChange(item.productId, -1)}
									>
										-
									</button>
									<input
										type="number"
										className={styles.quantityInput}
										value={item.quantity}
										readOnly
									/>
									<button
										className={styles.quantityButton}
										onClick={() => handleQuantityChange(item.productId, 1)}
									>
										+
									</button>
								</div>
								<div className={styles.productPrice}>
									{`${(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)} $`}
								</div>
							</div>
						</div>
					))
				)}
			</div>
			{cart.length > 0 && (
				<div className={styles.orderSummary}>
					<div className={styles.totalAmount}>
						Total amount: {calculateTotal()} $
					</div>
					<button className={styles.makeOrderButton} onClick={handleMakeOrder}>
						Make an order
					</button>
				</div>
			)}
			<Modal show={showOrderForm} onClose={handleCloseForm}>
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
