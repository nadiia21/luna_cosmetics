import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export const fetchUsers = async (page = 1, limit = 10) => {
	const response = await axios.get(
		`${API_URL}?_page=${page}&_per_page=${limit}`
	);
	return response.data;
};

export const addUser = async (user) => {
	const response = await axios.post(API_URL, user);
	return response.data;
};
