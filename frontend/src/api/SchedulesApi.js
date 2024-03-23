import { config } from "../config/config";

const getAllSchedules = async () => {
	console.log(config.API_BASE_URL);
	const response = await fetch(config.API_BASE_URL + "/schedules", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	return result;
};

export const SchedulesApi = {
	getAllSchedules,
};
