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

	let temp = sections.filter((section) => section.meetings.filter((meeting) => meeting.period > 11).length > 0);
	temp.forEach((temp) => {
		console.log(temp._id);
	});

	// let temp = sections.filter((section) => section.meetings.filter((meeting) => meeting.length === null).length > 0);
	// temp.forEach((temp) => {
	// 	console.log(temp._id.toString());
	// });

	// If there was a number searched, only check for the number, there's no need to check based on code or title otherwise because
	// there should only be a single match by number
	if (req.query?.number) {
		sections = sections.filter((section) => section.number.toString().includes(req.query.number.toString()));
	} else {
		// Filter for sections whose class CONTAINS the searched code
		if (req.query?.class)
			sections = sections.filter((section) => section.class.code.includes(req.query.class.toUpperCase()));

		if (req.query?.title) {
			// Split the title into keywords
			let titleTerms = req.query.title.split(" ");
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
