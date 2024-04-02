import { config } from "../config/config";

const createBuildingRecord = async (building) => {
	const response = await fetch(config.API_BASE_URL + `/dataentry/building`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(building),
	});
	let result = null;
	if (response.status == 201) {
		result = response.json();
	}
	return result;
};

const createInstructorRecord = async (instructor) => {
	const response = await fetch(config.API_BASE_URL + `/dataentry/instructor`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(instructor),
	});
	let result = null;
	if (response.status == 201) {
		result = response.json();
	}
	return result;
};

const createClassRecord = async (classObj) => {
	const response = await fetch(config.API_BASE_URL + `/dataentry/class`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(classObj),
	});
	const result = await response.json();
	return { ...result, status: response.status };
};

export const DataEntryApi = {
	createBuildingRecord,
	createInstructorRecord,
	createClassRecord,
};
