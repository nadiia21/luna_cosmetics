import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../Styles/SignIn.css';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const navigate = useNavigate();

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');
		setSuccessMessage('');

		if (!validateEmail(email)) {
			setErrorMessage('Invalid email format');
			return;
		}

		if (!email || !password) {
			setErrorMessage('Email and password are required');
			return;
		}

		try {
			const response = await fetch('http://localhost:3000/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const data = await response.json();
				setErrorMessage(data.error || 'Login failed');
			} else {
				const data = await response.json();
				setSuccessMessage('Login successful!');
				navigate('/', { state: { registrationSuccess: true } });
			}
		} catch (error) {
			setErrorMessage('An error occurred. Please try again.');
		}
	};

	return (
		<div className={styles.signinContainer}>
			<h2 className={styles.signinTitle}>Sign In</h2>
			{errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
			{successMessage && (
				<p className={styles.successMessage}>{successMessage}</p>
			)}
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
	);
};

export default SignIn;
