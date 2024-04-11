import { config } from "../config/config";

const getClassSections = async (code) => {
	const response = await fetch(config.API_BASE_URL + `/classes/sections?code=${code}`, {
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

const getClassByNumber = async (number) => {
	const response = await fetch(config.API_BASE_URL + `/classes?number=${number}`, {
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
	getClassSections,
	getClassByNumber,
};
