import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../Styles/Nav.css';
import shopIcon from '../Images/icon-shop.svg';
import userIcon from '../Images/icon-user.svg';
import logo from '../Images/logo.png';

const Nav = () => {
	return (
		<nav className={styles.navbar}>
			<Link to="/">
				<img src={logo} alt="Logo" className={styles.navbarLogo} />
			</Link>
			<ul className={styles.navbarList}>
				<li className={styles.listItem}>
					{' '}
					<Link to="/" className={styles.listLink}>
						Home
					</Link>
				</li>
				<li className={styles.listItem}>
					{' '}
					<Link to="/catalog" className={styles.listLink}>
						Catalog
					</Link>
				</li>
				<li className={styles.listItem}>
					<Link to="/shop">
						<img src={shopIcon} alt="Shop Icon" className={styles.listIcon} />{' '}
					</Link>
				</li>
				<li className={styles.listItem}>
					<Link to="/user">
						<img src={userIcon} alt="User Icon" className={styles.listIcon} />{' '}
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
