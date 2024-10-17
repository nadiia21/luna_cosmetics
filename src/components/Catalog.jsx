import React from 'react';
import styles from '../Styles/Catalog.css';
import product1 from '../Images/product1.png';
import product2 from '../Images/product2.png';
import product3 from '../Images/product3.png';
import addShop from '../Images/add-to-shop.svg';

const Catalog = () => {
	const products = [
		{
			id: 1,
			name: 'Restorative hair spray',
			text: 'Not only does this product protect against thermal effects, but it also provides antioxidant protection against harmful external factors such as UV radiation and air pollution.',
			price: '$ 16.00',
			image: product1,
			icon: addShop,
		},
		{
			id: 2,
			name: 'Mattifying face cream',
			text: 'If oily facial skin annoys you and bothers you, then just choose this product and forget about your problems. The face will look fantastic and say thank you.',
			price: '$ 20.00',
			image: product2,
			icon: addShop,
		},
		{
			id: 3,
			name: 'Face cream and mask',
			text: 'If your facial skin is dry and damaged, then these products will definitely help you. The cream deeply nourishes the skin, and the mask will give elasticity.',
			price: '$ 39.00',
			image: product3,
			icon: addShop,
		},
		{
			id: 4,
			name: 'Restorative hair spray',
			text: 'Not only does this product protect against thermal effects, but it also provides antioxidant protection against harmful external factors such as UV radiation and air pollution.',
			price: '$ 16.00',
			image: product1,
			icon: addShop,
		},
		{
			id: 5,
			name: 'Mattifying face cream',
			text: 'If oily facial skin annoys you and bothers you, then just choose this product and forget about your problems. The face will look fantastic and say thank you.',
			price: '$ 20.00',
			image: product2,
			icon: addShop,
		},
		{
			id: 6,
			name: 'Face cream and mask',
			text: 'If your facial skin is dry and damaged, then these products will definitely help you. The cream deeply nourishes the skin, and the mask will give elasticity.',
			price: '$ 39.00',
			image: product3,
			icon: addShop,
		},
	];

	const totalPages = 4;
	const currentPage = 1;

	return (
		<div className={styles.catalog}>
			<div className={styles.catalogGrid}>
				{products.map((product) => (
					<div key={product.id} className={styles.catalogItem}>
						<img
							src={product.image}
							alt={product.name}
							className={styles.catalogImage}
						/>
						<div className={styles.catalogBottom}>
							<h3 className={styles.catalogName}>{product.name}</h3>
							<p className={styles.catalogText}>{product.text}</p>
							<div className={styles.catalogBottomAdd}>
								<p className={styles.catalogPrice}>{product.price}</p>
								<img
									src={product.icon}
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
					>
						{index + 1}
					</div>
				))}
			</div>
		</div>
	);
};

export default Catalog;
