import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import ShopPage from './Pages/ShopPage';
import CatalogPage from './Pages/CatalogPage';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage';
import EditPage from './Pages/EditPage';
import styles from './App.css';

const App = () => {
	return (
		<div className={styles.appContent}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/catalog" element={<CatalogPage />} />
				<Route path="/shop" element={<ShopPage />} />
				<Route path="/signUp" element={<SignUpPage />} />
				<Route path="/signIn" element={<SignInPage />} />
				<Route path="/edit" element={<EditPage />} />
			</Routes>
		</div>
	);
};

export default App;
