import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styles from '../Styles/SignUp.css';
import SignInPage from '../Pages/SignInPage';

const SignUp = () => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Full Name:', fullName, 'Email:', email, 'Password:', password);
	};

	return (
		<>
			<div className={styles.signupContainer}>
				<h2 className={styles.signupTitle}>Sign Up</h2>
				<form onSubmit={handleSubmit} className={styles.signupForm}>
					<div className={styles.inputGroup}>
						<input
							type="text"
							id="fullName"
							className={styles.input}
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							placeholder="Full Name"
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<input
							type="email"
							id="email"
							className={styles.input}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<input
							type="password"
							id="password"
							className={styles.input}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<input
							type="password"
							id="confirmPassword"
							className={styles.input}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Confirm your password"
							required
						/>
					</div>
					<button type="submit" className={styles.signupButton}>
						Sign Up
					</button>
				</form>
				<p className={styles.loginPrompt}>
					Already have an account?{' '}
					<Link to="/signIn" className={styles.loginLink}>
						Login
					</Link>
				</p>
			</div>
			<Routes>
				<Route path="/signIn" element={<SignInPage />} />
			</Routes>
		</>
	);
};

export default SignUp;
