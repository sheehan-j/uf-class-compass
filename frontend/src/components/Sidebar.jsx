import { useState, useEffect } from "react";
import CourseSectionBox from "./CourseSectionBox";
import MySchedules from "./MySchedules";
import CourseCodeButton from "./CourseCodeButton";
import { ClassesApi } from "../api/ClassesApi";
import { SchedulesApi } from "../api/SchedulesApi";
import { ConflictsUtil } from "../../util/ConflictsUtil";
import { DistanceUtil } from "../../util/DistanceUtil";
import PropTypes from "prop-types";
import StyleColors from "../constants/StyleColors";

const Sidebar = ({
	schedules,
	setSchedules,
	activeSchedule,
	setActiveSchedule,
	activeClass,
	setActiveClass,
	previewSchedule,
	setPreviewSchedule,
	handleToggleSidebar,
}) => {
	const [selectedButton, setSelectedButton] = useState("schedulePlanner");
	const [classResults, setClassResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchError, setSearchError] = useState("");

	const handleCourseCodeButtonClicked = async (section) => {
		let result = await ClassesApi.getClassSections(section.class.code);
		result = await ConflictsUtil.updateClassListWithConflicts(activeSchedule, result);

		setActiveClass(section.class.code);
		setClassResults(result);
	};

	const handleSearchInputKeyUp = async (e) => {
		if (e.key == "Enter") {
			handleSearch();
		} else {
			setSearchError("");
			setPreviewSchedule({});

			if (searchTerm == "") {
				setClassResults([]);
				setActiveClass("");
			}
		}
	};

	const handleSearch = async () => {
		let result = await ClassesApi.getClassSections(searchTerm.toUpperCase());
		if (result) {
			result = await ConflictsUtil.updateClassListWithConflicts(activeSchedule, result);
			setClassResults(result);
			setActiveClass(searchTerm.toUpperCase());
		} else {
			setClassResults([]);
			setActiveClass("");
			setSearchError("Error: Class not found.");
		}
	};

	const handleAddSection = async (section) => {
		// First, check that the class being clicked is not already in the schedule
		if (!activeSchedule.sections.some((activeScheduleClass) => activeScheduleClass._id == section._id)) {
			// Check if there is a different section of the class being added already on the schedule
			const activeClassesWithSameCode = activeSchedule.sections.filter(
				(activeScheduleClass) => activeScheduleClass.class.code == section.class.code
			);

			// Remove it from the schedule if its found
			if (activeClassesWithSameCode.length > 0) {
				await SchedulesApi.deleteClassFromSchedule(activeSchedule._id, activeClassesWithSameCode[0]._id);
			}

			const result = await SchedulesApi.addClassToSchedule(activeSchedule._id, section._id);
			setActiveClass(section.class.code);
			setSchedules(result);
			const newActiveSchedule = await DistanceUtil.updateScheduleWithDistances(
				result.filter((schedule) => schedule._id == activeSchedule._id)[0]
			);
			setActiveSchedule(newActiveSchedule);

			// Clear any hovering-related info
			setPreviewSchedule({});
		}
	};

	const handleDeleteClass = async (section) => {
		const result = await SchedulesApi.deleteClassFromSchedule(activeSchedule._id, section._id);
		setSchedules(result);
		const newActiveSchedule = await DistanceUtil.updateScheduleWithDistances(
			result.filter((schedule) => schedule._id == activeSchedule._id)[0]
		);
		setActiveSchedule(newActiveSchedule);

		// Clear out the class results and active class unless the course is already in the search term
		if (searchTerm.toUpperCase() !== section.class.code) {
			setActiveClass("");
			setClassResults([]);
		}
	};

	const handleHoverSectionStart = (section) => {
		if (!activeSchedule.sections.some((activeScheduleClass) => activeScheduleClass._id == section._id)) {
			const updatedActiveSchedule = structuredClone(activeSchedule);
			updatedActiveSchedule.sections = updatedActiveSchedule.sections.filter(
				(activeScheduleClass) => activeScheduleClass.class.code != section.class.code
			);
			updatedActiveSchedule.sections.push({ ...section, muteInActiveCourses: true });
			setPreviewSchedule(updatedActiveSchedule);
		}
	};

	const handleHoverSectionEnd = () => {
		if (previewSchedule.sections) {
			setPreviewSchedule({});
		}
	};

	useEffect(() => {
		setSearchError("");

		if (!activeSchedule?.sections) {
			setActiveClass("");
			setClassResults([]);
			setSearchTerm("");
		}
	}, [activeSchedule]);

	return (
		<div
			style={{ backgroundColor: StyleColors.gray }}
			className="min-h-full top-0 left-0 w-1/2 p-5 text-black absolute md:w-5/12 lg:w-1/4 md:sticky overflow-y-auto z-50 border-r border-black md:border-none"
		>
			<div className="md:hidden w-full flex justify-end">
				<button onClick={handleToggleSidebar}>
					<img src="/remove.svg" />
				</button>
			</div>

			<MySchedules
				schedules={schedules}
				setSchedules={setSchedules}
				activeSchedule={activeSchedule}
				setActiveSchedule={setActiveSchedule}
				activeClass={activeClass}
				setActiveClass={setActiveClass}
				classResults={classResults}
				setClassResults={setClassResults}
			/>

			{activeSchedule?.sections?.length > 0 && (
				<>
					<p className="mb-1">Active Courses</p>
					<div className="mb-4">
						{activeSchedule?.sections
							?.filter((section) => section?.muteInActiveCourses != true)
							?.map((section) => (
								<CourseCodeButton
									key={section?.number}
									section={section}
									active={activeClass == section?.class?.code}
									handleCourseCodeButtonClicked={handleCourseCodeButtonClicked}
									handleDeleteClass={handleDeleteClass}
								/>
							))}
					</div>
				</>
			)}

			<p className={`mb-1 ${activeSchedule?.sections ? "" : "opacity-40"}`}>Course Code Search</p>
			<input
				className={`w-full py-2 px-2 flex align-center bg-white border border-gray-300 mb-3 ${
					activeSchedule?.sections ? "" : "opacity-60 line-through"
				}`}
				placeholder="Enter class code (e.g. CIS4930)"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyUp={handleSearchInputKeyUp}
				disabled={!activeSchedule?.sections}
			/>
			<button
				className={`w-full text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg ${
					searchError == "" && activeSchedule?.sections ? "mb-4" : "mb-1"
				} ${activeSchedule?.sections ? "" : "opacity-60"}`}
				onClick={handleSearch}
			>
				Search
			</button>
			{searchError != "" && <p className="text-red-400 text-sm mb-4">{searchError}</p>}
			{!activeSchedule?.sections && (
				<p className="italic text-sm mb-4">Select or create a schedule to start searching for classes.</p>
			)}

			{activeClass && (
				<>
					<p className="mb-1">Course Sections &#40;{activeClass}&#41;</p>
					{classResults?.length > 0 &&
						classResults?.map((section) => (
							<CourseSectionBox
								key={section.number}
								section={section}
								handleAddSection={handleAddSection}
								activeSchedule={activeSchedule}
								handleHoverSectionStart={handleHoverSectionStart}
								handleHoverSectionEnd={handleHoverSectionEnd}
							/>
						))}
				</>
			)}
		</div>
	);
};

Sidebar.propTypes = {
	handleToggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
