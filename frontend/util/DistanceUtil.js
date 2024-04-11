import { config } from "../src/config/config";

const updateScheduleWithDistances = async (schedule) => {
	// Go through each class
	schedule.sections = await Promise.all(
		schedule.sections.map(async (originClass) => {
			// Go through each meeting
			originClass.meetings = await Promise.all(
				originClass.meetings.map(async (originMeeting) => {
					// Check this meeting against every other meeting for back-to-back relationship
					for (const potentialDestClass of schedule.sections) {
						if (originClass._id !== potentialDestClass._id) {
							for (const potentialDestMeeting of potentialDestClass.meetings) {
								if (
									originMeeting.period + originMeeting.length === potentialDestMeeting.period &&
									originMeeting.day === potentialDestMeeting.day
								) {
									const distance = await calculateDistance(
										originMeeting.building.pid,
										potentialDestMeeting.building.pid
									);

									return {
										...originMeeting,
										distance: {
											time: distance,
											class: potentialDestClass.class.code,
										},
									};
								}
							}
						}
					}
					return originMeeting;
				})
			);

			return originClass;
		})
	);

	return schedule;
};

const calculateDistance = async (originPID, destinationPID) => {
	const response = await fetch(config.API_BASE_URL + `/distance?origin=${originPID}&destination=${destinationPID}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();

	return result.distance;
};

export const DistanceUtil = {
	updateScheduleWithDistances,
	calculateDistance,
};
