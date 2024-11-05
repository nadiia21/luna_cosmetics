import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../Styles/Nav.css';
import shopIcon from '../Images/icon-shop.svg';
import userIcon from '../Images/icon-user.svg';
import logo from '../Images/logo.png';

const Nav = () => {
	const location = useLocation();
	const registrationSuccess = location.state?.registrationSuccess;
	const [isOpen, setIsOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		return localStorage.getItem('isAuthenticated') === 'true';
	});

	const handleMouseEnter = () => {
		setIsOpen(true);
	};

	const handleMouseLeave = () => {
		setIsOpen(false);
	};

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	useEffect(() => {
		if (registrationSuccess) {
			setIsAuthenticated(true);
			localStorage.setItem('isAuthenticated', 'true');
		}
	}, [registrationSuccess]);

	const handleLogout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem('isAuthenticated');
	};

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isMenuOpen]);

	return (
		<nav className={styles.navbar}>
			<Link to="/">
				<img src={logo} alt="Logo" className={styles.navbarLogo} />
			</Link>
			<div
				className={`${styles.burgerMenu} ${isMenuOpen ? styles.active : ''}`}
				onClick={toggleMenu}
			>
				<div className={styles.burgerLine}></div>
				<div className={styles.burgerLine}></div>
				<div className={styles.burgerLine}></div>
			</div>
			<ul className={`${styles.navbarList} ${isMenuOpen ? styles.show : ''}`}>
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
								{!isAuthenticated ? (
									<>
										<li>
											<Link to="/signUp">Sign Up</Link>
										</li>
										<li>
											<Link to="/signIn">Sign In</Link>
										</li>
									</>
								) : (
									<>
										<li>
											<Link to="/edit">Edit profile</Link>
										</li>
										<li>
											<button
												onClick={handleLogout}
												className={styles.exitButton}
											>
												Exit
											</button>
										</li>
									</>
								)}
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
