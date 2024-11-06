import React, { useState } from 'react';
import styles from '../Styles/Footer.css';

const Footer = () => {
	const [toastMessage, setToastMessage] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			message: formData.get('message'),
		};

		try {
			const response = await fetch('http://localhost:3000/api/contacts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				setToastMessage('Your message has been sent!');
				event.target.reset();
			} else {
				console.error('Failed to send message');
				setToastMessage('Failed to send your message. Please try again.');
			}
		} catch (error) {
			console.error('Error:', error);
			setToastMessage('Error sending message. Please try again.');
		}

		setTimeout(() => setToastMessage(''), 3000);
	};

	return (
		<footer className={styles.footer}>
			<h2 className={styles.footerTitle}>Contact us</h2>

			<div className={styles.contactsContent}>
				<form onSubmit={handleSubmit} className={styles.contactsForm}>
					<input
						className={styles.contactsItems}
						name="name"
						type="text"
						placeholder="Name"
						required
					/>
					<input
						className={styles.contactsItems}
						name="email"
						type="email"
						placeholder="Email"
						required
					/>
					<textarea
						className={styles.contactsItems}
						name="message"
						placeholder="Message"
						required
					></textarea>
					<button className={styles.contactsButton} type="submit">
						Send
					</button>
				</form>

				<div className={styles.contactsBlocks}>
					<div className={styles.block}>
						<p className={styles.blockTitle}>Phone</p>
						<a href="tel:+1234567890" className={styles.blockText}>
							+1 234 5555-55-55
						</a>
					</div>

					<div className={styles.block}>
						<p className={styles.blockTitle}>Email</p>
						<a
							className={styles.blockText}
							href="mailto:zorivchak.nadiia@student.uzhnu.edu.ua"
						>
							zorivchak.nadiia@student.uzhnu.edu.ua
						</a>
					</div>

					<div className={styles.block}>
						<p className={styles.blockTitle}>Address</p>
						<a
							className={styles.blockText}
							href="https://www.google.com/maps?q=400+first+ave+suite+700+Minneapolis,+MN+55401"
							target="_blank"
							rel="noopener noreferrer"
						>
							400 first ave.
							<br />
							suite 700
							<br />
							Minneapolis, MN 55401
						</a>
					</div>
				</div>
			</div>
			{toastMessage && <div className={styles.toast}>{toastMessage}</div>}
		</footer>
	);
};

export default Footer;
