import { config } from "../config/config";

const getInstructorByName = async (name) => {
	const response = await fetch(config.API_BASE_URL + `/instructors?name=${encodeURIComponent(name)}`, {
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

export const InstructorsApi = {
	getInstructorByName,
};
