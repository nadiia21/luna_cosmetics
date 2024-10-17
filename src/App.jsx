import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import ShopPage from './Pages/ShopPage';
import CatalogPage from './Pages/CatalogPage';
import UserPage from './Pages/UserPage';
import styles from './App.css';

const App = () => {
	return (
		<div className={styles.appContent}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/catalog" element={<CatalogPage />} />
				<Route path="/shop" element={<ShopPage />} />
				<Route path="/user" element={<UserPage />} />
			</Routes>
		</div>
	);
};

export default App;
