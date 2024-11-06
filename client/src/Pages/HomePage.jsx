import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import FAQ from '../Components/FAQ';
import Recommended from '../Components/Recommended';
import styles from '../Styles/HomePage.css';

const HomePage = () => {
	const location = useLocation();
	const registrationSuccess = location.state?.registrationSuccess;
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		if (registrationSuccess) {
			setShowToast(true);
			setTimeout(() => {
				setShowToast(false);
			}, 3000);
		}
	}, [registrationSuccess]);

	return (
		<>
			<Header />
			<main>
				{showToast && (
					<div className={styles.toast}>You have successfully registered!</div>
				)}
				<Recommended />
				<FAQ />
			</main>
			<Footer />
		</>
	);
};

export default HomePage;
