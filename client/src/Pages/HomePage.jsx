import React from 'react';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import FAQ from '../Components/FAQ';
import Recommended from '../Components/Recommended';

const HomePage = () => {
	return (
		<>
			<Header />
			<main>
				<Recommended />
				<FAQ />
			</main>
			<Footer />
		</>
	);
};

export default HomePage;
