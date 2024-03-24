import { config } from "../config/config";

const getClassesByCode = async (code) => {
	const response = await fetch(config.API_BASE_URL + `/classes?code=${code}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	return result;
};

export const ClassesApi = {
	getClassesByCode,
};
