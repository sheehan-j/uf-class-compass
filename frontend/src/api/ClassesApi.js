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

const getClass = async (code) => {
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

const getSection = async (number) => {
	const response = await fetch(config.API_BASE_URL + `/classes/sections?number=${number}`, {
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
	getClass,
	getSection,
};
