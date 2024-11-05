import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styles from '../Styles/SignUp.css';
import SignInPage from '../Pages/SignInPage';

const SignUp = () => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setErrorMessage("Passwords don't match");
			setTimeout(() => {
				setErrorMessage('');
			}, 2000);
			return;
		}

		if (!validateEmail(email)) {
			setErrorMessage('Invalid email format');
			setTimeout(() => {
				setErrorMessage('');
			}, 2000);
			return;
		}

		if (password.length < 6) {
			setErrorMessage('Password must be at least 6 characters long');
			setTimeout(() => {
				setErrorMessage('');
			}, 3000);
			return;
		}

		setErrorMessage('');
		setSuccessMessage('');

		try {
			const response = await fetch('http://localhost:3000/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ fullName, email, password }),
			});

			if (!response.ok) {
				const data = await response.json();
				setErrorMessage(data.error || 'Registration failed');
				setTimeout(() => {
					setErrorMessage('');
				}, 3000);
			} else {
				const data = await response.json();
				setSuccessMessage('Registration successful! Please log in.');
				setFullName('');
				setEmail('');
				setPassword('');
				setConfirmPassword('');

				setTimeout(() => {
					setSuccessMessage('');
				}, 3000);
			}
		} catch (error) {
			setErrorMessage('An error occurred. Please try again.');
			setTimeout(() => {
				setErrorMessage('');
			}, 3000);
		}
	};

	return (
		<>
			<div className={styles.signupContainer}>
				<h2 className={styles.signupTitle}>Sign Up</h2>
				{errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
				{successMessage && (
					<p className={styles.successMessage}>{successMessage}</p>
				)}
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
