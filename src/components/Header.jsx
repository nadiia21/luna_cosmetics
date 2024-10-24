import React from 'react';
import styles from '../Styles/Header.css';
import Nav from './Nav.jsx';

const Header = () => {
	return (
		<header className={styles.header}>
			<Nav />
		</header>
	);
};

export default Header;
