import { config } from "../config/config";

const getClassesByCode = async (code) => {
	const response = await fetch(config.API_BASE_URL + `/classes?code=${code}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	let result = null;
	if (response.status == 200) {
		result = response.json();
	}
	return result;
};

export const ClassesApi = {
	getClassesByCode,
};
