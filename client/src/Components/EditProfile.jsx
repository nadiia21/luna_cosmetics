import React, { useState } from 'react';
import styles from '../Styles/EditProfile.css';

const EditProfile = () => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [profileImage, setProfileImage] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Full Name:', fullName, 'Email:', email, 'Password:', password);
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
				<button type="submit" className={styles.editProfileButton}>
					EDIT
				</button>
			</form>
		</div>
	);
};

export default EditProfile;
