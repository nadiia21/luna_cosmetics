import React, { useEffect, useState } from 'react';
import styles from '../Styles/Catalog.css';

const Catalog = () => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalProducts, setTotalProducts] = useState(0);
	const productsPerPage = 6;
	const [isToastVisible, setIsToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

	const fetchProducts = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/products?page=${currentPage}&limit=${productsPerPage}`
			);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			setProducts(data.products);
			setTotalProducts(data.totalProducts);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	const handleAddToCart = async (product) => {
		try {
			const response = await fetch('http://localhost:3000/api/cart/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					productId: product._id,
					name: product.name,
					price: product.price,
					image: product.image,
				}),
			});

			const data = await response.json();
			if (response.ok) {
				setToastMessage(`Додано ${product.name} до кошика!`);
				setIsToastVisible(true);
				setTimeout(() => {
					setIsToastVisible(false);
				}, 3000);
			} else {
				console.error('Помилка при додаванні до кошика:', data.message);
			}
		} catch (error) {
			console.error('Помилка:', error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, [currentPage]);

	const totalPages = Math.ceil(totalProducts / productsPerPage);

	if (products.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.catalog}>
			{isToastVisible && <div className={styles.toast}>{toastMessage}</div>}
			<div className={styles.catalogGrid}>
				{products.map((product) => (
					<div key={product._id} className={styles.catalogItem}>
						<img
							src={require(`../Images/${product.image}`)}
							alt={product.name}
							className={styles.catalogImage}
						/>
						<div className={styles.catalogBottom}>
							<h3 className={styles.catalogName}>{product.name}</h3>
							<p className={styles.catalogText}>{product.text}</p>
							<div className={styles.catalogBottomAdd}>
								<p className={styles.catalogPrice}>{product.price}</p>
								<img
									src={require(`../Images/${product.icon}`)}
									alt="Add to shop icon"
									className={styles.addShopIcon}
									onClick={() => handleAddToCart(product)}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={styles.pagination}>
				{Array.from({ length: totalPages }, (_, index) => (
					<div
						key={index}
						className={`${styles.paginationSquare} ${currentPage === index + 1 ? styles.active : ''}`}
						onClick={() => setCurrentPage(index + 1)}
					>
						{index + 1}
					</div>
				))}
			</div>
		</div>
	);
};

export default Catalog;
