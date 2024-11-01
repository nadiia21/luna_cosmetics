import React, { useEffect, useState } from 'react';
import styles from '../Styles/Catalog.css';

const Catalog = () => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 6;

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch('http://localhost:3000/products');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setProducts(data);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};
		fetchProducts();
	}, []);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);
	const totalPages = Math.ceil(products.length / productsPerPage);

	if (products.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.catalog}>
			<div className={styles.catalogGrid}>
				{currentProducts.map((product) => (
					<div key={product.id} className={styles.catalogItem}>
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
