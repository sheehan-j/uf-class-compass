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

const getSchedulesByUser = async (userId) => {
	const response = await fetch(config.API_BASE_URL + `/schedules?user=${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	return result;
};

const createSchedule = async (name, userId) => {
	const response = await fetch(config.API_BASE_URL + `/schedules?name=${name}&user=${userId}`, {
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

const addClassToSchedule = async (scheduleId, classId) => {
	const response = await fetch(config.API_BASE_URL + `/schedules/edit?schedule=${scheduleId}&class=${classId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	return result;
};

const deleteClassFromSchedule = async (scheduleId, classId) => {
	const response = await fetch(config.API_BASE_URL + `/schedules/edit?schedule=${scheduleId}&class=${classId}`, {
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
	getSchedulesByUser,
	createSchedule,
	deleteSchedule,
	addClassToSchedule,
	deleteClassFromSchedule,
};
