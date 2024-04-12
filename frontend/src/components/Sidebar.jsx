import { useState, useEffect, useRef } from "react";
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
	sidebarVisible,
	handleToggleSidebar,
}) => {
	const [selectedButton, setSelectedButton] = useState("schedulePlanner");
	const [classResults, setClassResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchError, setSearchError] = useState("");
	const [classByPrefix, setClassByPrefix] = useState([]);
	const [showAutoComplete, setShowAutoComplete] = useState(true);
	const autoCompleteRef = useRef(null);

	const handleChangeSearchTerm = async(cls) => {
		const code = cls.toUpperCase();
		setSearchTerm(code)
		if(code.length == 0){
			setClassByPrefix([]);
			return;
		}
		let result = await ClassesApi.getClassSectionPrefix(code);
		if(result.length === 0) {
			setClassByPrefix([]);
		}else{
			setClassByPrefix(result.map((cls) => cls.code));
		}
	}
	
	const handleClickAutocomplete = (code) => {
		setSearchTerm(code);
		setClassByPrefix([]);
	}

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

	useEffect(() => {
        const handleOutsideClick = (event) => {
			if (autoCompleteRef.current && !autoCompleteRef.current.contains(event.target)) {
                setShowAutoComplete(false);
            } else {
				setShowAutoComplete(true);
			}
        };
        document.body.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.body.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);


	return (
		<div
			style={{
				backgroundColor: StyleColors.gray,
				transition: "left 0.3s linear",
				left: sidebarVisible ? "0" : "-100%",
			}}
			className="min-h-full top-0 w-11/12 md:w-7/12 p-5 text-black absolute lg:w-1/4 lg:sticky overflow-x-visible overflow-y-scroll z-50 border-r border-gray-300 lg:border-none"
		>
			<div className="mb-3 lg:hidden w-full flex justify-end">
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
			<div className="relative w-full" ref={autoCompleteRef}>
				<input
					className={`w-full py-2 px-2 flex align-center bg-white border border-gray-300 ${
						activeSchedule?.sections ? "" : "opacity-60 line-through"
					}`}
					placeholder="Enter class code (e.g. CIS4930)"
					value={searchTerm}
					onChange={(e) => handleChangeSearchTerm(e.target.value)}
					onKeyUp={handleSearchInputKeyUp}
					disabled={!activeSchedule?.sections}
				/>
				{classByPrefix && (
					<div className={`absolute z-50 w-full ${showAutoComplete ? "block" : "hidden"} w-full`} ref={autoCompleteRef}>
						{classByPrefix.map((classCode, index) => {
							const prefixIdx = classCode.toUpperCase().indexOf(searchTerm.toUpperCase());
							const toSearch = classCode;
							const nonBolded = classCode.substring(prefixIdx + searchTerm.length);
							
							return (
								<div className="w-full py-2 px-2 flex align-center bg-gray-100 border border-gray-300 cursor-pointer" key={index} onClick={() => handleClickAutocomplete(toSearch)}>
									<strong>{searchTerm.toUpperCase()}</strong>
									<span>{nonBolded}</span>
								</div>
							);
						})}
					</div>
				)}
			</div>
			<button
				className={`w-full text-white bg-customBlue hover:bg-customBlue-dark py-2 rounded-lg mt-4 ${
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
