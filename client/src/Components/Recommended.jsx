import React from 'react';
import styles from '../Styles/Recommended.css';
import img1 from '../Images/img-recommended-1.png';
import img2 from '../Images/img-recommended-2.png';
import img3 from '../Images/img-recommended-3.png';
import addShop from '../Images/add-to-shop.svg';

const Recommended = () => {
	const recommendedItems = [
		{
			id: 1,
			name: 'Regenerating serum',
			image: img1,
			icon: addShop,
		},
		{
			id: 2,
			name: 'Oil for hair growth',
			image: img2,
			icon: addShop,
		},
		{
			id: 3,
			name: 'Restorative hair spray',
			image: img3,
			icon: addShop,
		},
	];

	return (
		<div className={styles.recommended}>
			<h2 className={styles.recommendedTitle}>Recommended</h2>
			<div className={styles.recommendedList}>
				{recommendedItems.map((item) => (
					<div key={item.id} className={styles.recommendedItem}>
						<img
							src={item.image}
							alt={item.name}
							className={styles.recommendedImage}
						/>
						<h3 className={styles.recommendedName}>{item.name}</h3>
						<img
							src={item.icon}
							alt="Add to shop icon"
							className={styles.addShopIcon}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Recommended;
