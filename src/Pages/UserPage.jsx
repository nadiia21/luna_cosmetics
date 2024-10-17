import React from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
	const { id } = useParams();

	return (
		<>
			<main>
				<h1>Інформація про користувача</h1>
				<p>Користувач з ID: {id}</p>
			</main>
		</>
	);
};

export default UserPage;
