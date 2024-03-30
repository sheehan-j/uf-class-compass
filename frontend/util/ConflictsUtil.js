const updateClassListWithConflicts = async (schedule, classes) => {
	classes = classes.map((classItem) => {
		const conflicts = ConflictsUtil.checkConflict(schedule, classItem);
		return {
			...classItem,
			conflicts,
		};
	});

	classes.sort((a, b) => {
		// Move objects with the specified attribute value to the back
		if (a.conflicts.length > 0 && b.conflicts.length == 0) {
			return 1;
		} else if (b.conflicts.length == 0 && b.conflicts.length > 0) {
			return -1;
		} else {
			return 0;
		}
	});

	return classes;
};

const checkConflict = (schedule, classToBeChecked) => {
	let conflicts = [];
	classToBeChecked.meetings.forEach((meetingToBeChecked) => {
		schedule.classes.forEach((existingClass) => {
			if (existingClass._id !== classToBeChecked._id && existingClass.code !== classToBeChecked.code) {
				existingClass.meetings.forEach((existingMeeting) => {
					for (let i = existingMeeting.period; i < existingMeeting.period + existingMeeting.length; i++) {
						for (
							let j = meetingToBeChecked.period;
							j < meetingToBeChecked.period + meetingToBeChecked.length;
							j++
						) {
							if (i === j && existingMeeting.day == meetingToBeChecked.day) {
								if (!conflicts.includes(existingClass.code)) conflicts.push(existingClass.code);
							}
						}
					}
				});
			}
		});
	});

	return conflicts;
};

export const ConflictsUtil = {
	updateClassListWithConflicts,
	checkConflict,
};
