import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styles from '../Styles/SignIn.css';
import SignUpPage from '../Pages/SignUpPage';

const SignIn = () => {
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
			<div className={styles.signinContainer}>
				<h2 className={styles.signinTitle}>Sign In</h2>
				<form onSubmit={handleSubmit} className={styles.signinForm}>
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
					<button type="submit" className={styles.signinButton}>
						Sign In
					</button>
				</form>
				<p className={styles.loginPrompt}>
					Don't have an account?{' '}
					<Link to="/signUp" className={styles.loginLink}>
						Sign Up
					</Link>
				</p>
			</div>
			<Routes>
				<Route path="/signUp" element={<SignUpPage />} />
			</Routes>
		</>
	);
};

export default SignIn;
