import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from '../Styles/Nav.css';
import shopIcon from '../Images/icon-shop.svg';
import userIcon from '../Images/icon-user.svg';
import logo from '../Images/logo.png';

const Nav = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleMouseEnter = () => {
		setIsOpen(true);
	};

	const handleMouseLeave = () => {
		setIsOpen(false);
	};

	return (
		<nav className={styles.navbar}>
			<Link to="/">
				<img src={logo} alt="Logo" className={styles.navbarLogo} />
			</Link>
			<ul className={styles.navbarList}>
				<li className={styles.listItem}>
					<Link to="/" className={styles.listLink}>
						Home
					</Link>
				</li>
				<li className={styles.listItem}>
					<Link to="/catalog" className={styles.listLink}>
						Catalog
					</Link>
				</li>
				<li className={styles.listItem}>
					<Link to="/shop">
						<img src={shopIcon} alt="Shop Icon" className={styles.listIcon} />
					</Link>
				</li>
				<li className={styles.listItem}>
					<div
						className={styles.userIconContainer}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<img src={userIcon} alt="User Icon" className={styles.listIcon} />
						<div className={`${styles.userMenu} ${isOpen ? styles.show : ''}`}>
							<ul>
								<li>
									<Link to="/signUp">Sign Up</Link>
								</li>
								<li>
									<Link to="/signIn">Sign In</Link>
								</li>
								<li>
									<Link to="/edit">Edit profile</Link>
								</li>
								<li>
									<Link to="/exit">Exit</Link>
								</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
