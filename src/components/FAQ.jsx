import React, { useState } from 'react';
import styles from '../Styles/FAQ.css';

const FAQ = () => {
	const [activeIndex, setActiveIndex] = useState(null);

	const faqData = [
		{
			question: 'Do you offer discounts or loyalty programs?',
			answer:
				'Yes, we often offer various promotions, discounts and loyalty programs. Follow on the website.',
		},
		{
			question: 'Can I get product samples before I buy?',
			answer:
				'Yes, you can send us a letter by mail with a request, which samples of products you need. Maximum number of up to 5 products.',
		},
		{
			question: 'How can I return or exchange an item?',
			answer:
				'The product cannot be exchanged or returned, because it is a cosmetic product and you cannot try it and then return it.',
		},
		{
			question: 'Are your cosmetics certified?',
			answer:
				'Yes, all cosmetics are certified, not tested on animals and consist of natural ingredients.',
		},
	];

	const handleToggle = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<div className={styles.faq}>
			<h2 className={styles.faqTitle}>FAQ</h2>
			<div className={styles.faqList}>
				{faqData.map((item, index) => (
					<div key={index} className={styles.faqItem}>
						<button
							className={styles.faqQuestion}
							onClick={() => handleToggle(index)}
						>
							{item.question}
							<span className={styles.faqToggle}>
								{activeIndex === index ? '🡡' : '🡣'}
							</span>
						</button>
						{activeIndex === index && (
							<p className={styles.faqAnswer}>{item.answer}</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default FAQ;
