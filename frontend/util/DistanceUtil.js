import { config } from "../src/config/config";

const updateScheduleWithDistances = async (schedule) => {
	// Go through each class
	schedule.classes = await Promise.all(
		schedule.classes.map(async (originClass) => {
			// Go through each meeting
			originClass.meetings = await Promise.all(
				originClass.meetings.map(async (originMeeting) => {
					// Check this meeting against every other meeting
					for (const potentialDestClass of schedule.classes) {
						if (originClass._id !== potentialDestClass._id) {
							potentialDestClass.meetings = await Promise.all(
								potentialDestClass.meetings.map(async (potentialDestMeeting) => {
									if (
										originMeeting.period + originMeeting.length === potentialDestMeeting.period &&
										originMeeting.day === potentialDestMeeting.day
									) {
										const distance = await calculateDistance(
											originMeeting.building.pid,
											potentialDestMeeting.building.pid
										);
										return {
											...potentialDestMeeting,
											distance: distance,
										};
									} else {
										return potentialDestMeeting;
									}
								})
							);
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
	console.log(result);

	return 0;
};

export const DistanceUtil = {
	updateScheduleWithDistances,
	calculateDistance,
};
