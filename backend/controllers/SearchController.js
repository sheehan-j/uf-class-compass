const Section = require("../model/Section");

exports.fullSearch = async (req, res) => {
	let sections = await Section.find({})
		.populate({
			path: "meetings",
			populate: {
				path: "building",
			},
		})
		.populate("instructor")
		.populate("class")
		.lean();

	// If there was a number searched, only check for the number, there's no need to check based on code or title otherwise because
	// there should only be a single match by number
	if (req.body?.number) {
		sections = sections.filter((section) => section.number.toString().includes(req.body.number.toString()));
	} else {
		// Filter for sections whose class CONTAINS the searched code
		if (req.body?.class)
			sections = sections.filter((section) => section.class.code.includes(req.body.class.toUpperCase()));

		if (req.body?.title) {
			// Split the title into keywords
			let titleTerms = req.body.title.split(" ");
			titleTerms = titleTerms.map((titleTerm) => titleTerm.toLowerCase());

			sections = sections.map((section) => {
				// Count how many of the title terms are contained in the class title corresponding to this section
				let matchCount = 0;
				const sectionTitle = section.class.title.toLowerCase();
				titleTerms.forEach((titleTerm) => {
					if (sectionTitle.includes(titleTerm)) matchCount++;
				});

				// Attach the match count to the section object
				return {
					_id: section._id,
					number: section.number,
					class: section.class,
					instructor: section.instructor,
					credits: section.credits,
					final: section.final,
					department: section.department,
					isOnline: section.isOnline,
					meetings: section.meetings,
					matchCount: matchCount,
				};
			});

			sections = sections.filter((section) => section.matchCount > 0); // Filter sections for ones that had at least one match
			sections = sections.sort((a, b) => b.matchCount - a.matchCount); // Sort by match count

			// Remove the matchCount attribute
			sections = sections.map((section) => {
				delete section.matchCount;
				return section;
			});
		}
	}

	const dayMap = {
		M: 0,
		T: 1,
		W: 2,
		R: 3,
		F: 4,
	};

	if (req.body?.filters) {
		const filters = req.body.filters;
		const professors = [];
		const credits = [];
		const levels = [];
		const buildings = [];
		const days = [];
		const periods = [];

		// Add each of the filter values to the appropriate list
		filters.forEach((filter) => {
			if (filter.type === "Professor") {
				professors.push(filter.value.toLowerCase());
			} else if (filter.type === "Building") {
				buildings.push(filter.value.toLowerCase());
			} else if (filter.type === "Level") {
				levels.push(parseInt(filter.value.split(" ")[0]));
			} else if (filter.type === "Days") {
				filter.value.split(", ").forEach((day) => {
					days.push(dayMap[day]);
				});
			} else if (filter.type === "Credits") {
				credits.push(parseInt(filter.value));
			} else if (filter.type === "Periods") {
				filter.value.split(" - ").forEach((period) => {
					if (period === "E1") period = 12;
					else if (period === "E2") period = 13;
					else if (period === "E3") period = 14;
					periods.push(parseInt(period));
				});
			}
		});

		// Apply each of the filters as applicable
		if (professors.length > 0) {
			sections = sections.filter((section) => professors.includes(section.instructor.name.toLowerCase()));
		}
		if (buildings.length > 0) {
			sections = sections.filter(
				(section) =>
					section.meetings.filter((meeting) => buildings.includes(meeting.building.code.toLowerCase()))
						.length == section.meetings.length && !section.isOnline
			);
		}
		if (credits.length > 0) {
			sections = sections.filter((section) => credits.includes(section.credits));
		}
		if (levels.length > 0) {
			sections = sections.filter((section) =>
				levels.some(
					(level) =>
						parseInt(section.class.code.match(/\d+/g)) >= level &&
						parseInt(section.class.code.match(/\d+/g)) <= level + 999
				)
			);
		}
		if (periods.length > 0) {
			sections = sections.filter(
				(section) =>
					section.meetings.filter(
						(meeting) => meeting.period >= periods[0] && meeting.period + meeting.length - 1 <= periods[1]
					).length === section.meetings.length && !section.isOnline
			);
		}
		if (days.length > 0) {
			sections = sections.filter(
				(section) =>
					section.meetings.filter((meeting) => days.includes(meeting.day)).length === section.meetings.length
			);
		}
	}

	const addedClasses = [];
	let searchResults = [];

	sections.forEach((section) => {
		if (!addedClasses.includes(section.class._id)) {
			addedClasses.push(section.class._id);
			let newSearchResult = { ...section.class };
			newSearchResult = { ...newSearchResult, sections: [{ ...section }] };
			searchResults.push(newSearchResult);
		} else {
			const existingSearchResultIndex = searchResults.findIndex(
				(searchResult) => searchResult._id === section.class._id
			);
			const existingSearchResult = searchResults[existingSearchResultIndex];
			const updatedSearchResult = {
				...existingSearchResult,
				sections: [...existingSearchResult.sections, { ...section }],
			};
			searchResults[existingSearchResultIndex] = updatedSearchResult;
		}
	});

	if (searchResults.length > 50) {
		searchResults = searchResults.slice(0, 50);
	}

	return res.status(200).json(searchResults);
};
