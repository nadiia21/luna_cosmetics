import React from 'react';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Catalog from '../Components/Catalog';

const CatalogPage = () => {
	return (
		<>
			<Header />
			<main>
				<Catalog />
			</main>
			<Footer />
		</>
	);
};

export default CatalogPage;
