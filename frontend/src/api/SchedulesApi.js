import { config } from "../config/config";

const getAllSchedules = async () => {
	const response = await fetch(config.API_BASE_URL + "/schedules", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	return result;
};

const createSchedule = async (name) => {
	const response = await fetch(config.API_BASE_URL + "/schedules", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name,
		}),
	});
	const result = await response.json();
	return result;
};

export const SchedulesApi = {
	getAllSchedules,
	createSchedule,
};
