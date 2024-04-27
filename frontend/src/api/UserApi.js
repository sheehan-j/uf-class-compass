import { config } from "../config/config";

const login = async (loginData) => {
	const response = await fetch(config.API_BASE_URL + `/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(loginData),
	});
	const result = await response.json();
	return { ...result, status: response.status };
};

const register = async (userData) => {
	const response = await fetch(config.API_BASE_URL + `/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	const result = await response.json();
	return { ...result, status: response.status };
};

const getUser = async (token) => {
	const response = await fetch(config.API_BASE_URL + `/user`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	const resWithPass = await response.json();
	const { password, ...result } = resWithPass;

	return { ...result, status: response.status };
};

const updateUser = async (token, userData) => {
	console.log(JSON.stringify(userData))
	const response = await fetch(config.API_BASE_URL + `/user/edit`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});
	const resWithPass = await response.json();
	const { password, ...result } = resWithPass

	return { ...result, status: response.status };
};


export const UserApi = {
	login,
	register,
	getUser,
	updateUser,
};
