const updateClassListWithConflicts = async (schedule, sections) => {
	sections = sections.map((section) => {
		const conflicts = ConflictsUtil.checkConflict(schedule, section);
		return {
			...section,
			conflicts,
		};
	});

	sections.sort((a, b) => {
		// Move objects with the specified attribute value to the back
		if (a.conflicts.length > 0 && b.conflicts.length == 0) {
			return 1;
		} else if (b.conflicts.length == 0 && b.conflicts.length > 0) {
			return -1;
		} else {
			return 0;
		}
	});

	return sections;
};

const checkConflict = (schedule, sectionToBeChecked) => {
	let conflicts = [];
	sectionToBeChecked.meetings.forEach((meetingToBeChecked) => {
		schedule.sections.forEach((existingSection) => {
			if (
				existingSection._id !== sectionToBeChecked._id &&
				existingSection.class.code !== sectionToBeChecked.class.code
			) {
				existingSection.meetings.forEach((existingMeeting) => {
					for (let i = existingMeeting.period; i < existingMeeting.period + existingMeeting.length; i++) {
						for (
							let j = meetingToBeChecked.period;
							j < meetingToBeChecked.period + meetingToBeChecked.length;
							j++
						) {
							if (i === j && existingMeeting.day == meetingToBeChecked.day) {
								if (!conflicts.includes(existingSection.class.code))
									conflicts.push(existingSection.class.code);
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
