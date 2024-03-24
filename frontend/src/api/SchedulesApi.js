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
	const response = await fetch(config.API_BASE_URL + `/schedules?name=${name}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	return result;
};

const deleteSchedule = async (id) => {
	const response = await fetch(config.API_BASE_URL + `/schedules?id=${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	return result;
};

export const SchedulesApi = {
	getAllSchedules,
	createSchedule,
	deleteSchedule,
};
