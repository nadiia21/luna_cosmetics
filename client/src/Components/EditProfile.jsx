import React, { useState } from 'react';
import styles from '../Styles/EditProfile.css';

const EditProfile = () => {
	const [fullName, setFullName] = useState('');
	const [oldEmail, setOldEmail] = useState('');
	const [newEmail, setNewEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [profileImage, setProfileImage] = useState(null);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (newPassword !== confirmPassword) {
			setErrorMessage("Passwords don't match!");
			setTimeout(() => setErrorMessage(''), 3000);
			return;
		}

		const data = {
			fullName,
			oldEmail,
			newEmail,
			newPassword,
			profileImage,
			oldPassword,
		};

		try {
			const response = await fetch('http://localhost:3000/api/auth/update', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			const result = await response.json();
			if (response.ok) {
				setSuccessMessage('Profile updated successfully!');
				setTimeout(() => setSuccessMessage(''), 3000);
			} else {
				setErrorMessage(result.error || 'Something went wrong!');
				setTimeout(() => setErrorMessage(''), 3000);
			}
		} catch (error) {
			setErrorMessage('Error updating profile. Please try again.');
			setTimeout(() => setErrorMessage(''), 3000);
		}
	};

	const handleImageChange = (e) => {
		setProfileImage(URL.createObjectURL(e.target.files[0]));
	};

	const handleImageClick = () => {
		document.getElementById('profileImage').click();
	};

	return (
		<div className={styles.editProfileContainer}>
			<h2 className={styles.editProfileTitle}>Edit Profile</h2>
			{errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
			{successMessage && (
				<p className={styles.successMessage}>{successMessage}</p>
			)}
			<form onSubmit={handleSubmit} className={styles.editProfileForm}>
				<div className={styles.profileImageContainer}>
					{profileImage ? (
						<img
							src={profileImage}
							alt="Profile"
							className={styles.profileImage}
							onClick={handleImageClick}
						/>
					) : (
						<div className={styles.placeholderImage} onClick={handleImageClick}>
							No Image
						</div>
					)}
					<input
						type="file"
						id="profileImage"
						className={styles.imageInput}
						accept="image/*"
						onChange={handleImageChange}
						style={{ display: 'none' }}
					/>
				</div>
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
						id="oldEmail"
						className={styles.input}
						value={oldEmail}
						onChange={(e) => setOldEmail(e.target.value)}
						placeholder="Old email"
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<input
						type="email"
						id="newEmail"
						className={styles.input}
						value={newEmail}
						onChange={(e) => setNewEmail(e.target.value)}
						placeholder="New email"
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<input
						type="password"
						id="oldPassword"
						className={styles.input}
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
						placeholder="Old password"
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<input
						type="password"
						id="newPassword"
						className={styles.input}
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						placeholder="New password"
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
				<button type="submit" className={styles.editProfileButton}>
					EDIT
				</button>
			</form>
		</div>
	);
};

export default EditProfile;
