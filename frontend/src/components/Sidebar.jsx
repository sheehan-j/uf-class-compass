import "../styles/Sidebar.css";
import { useState, useEffect } from "react";
import CourseSectionBox from "./CourseSectionBox";
import MySchedules from "./MySchedules";
import CourseCodeButton from "./CourseCodeButton";
import { ClassesApi } from "../api/ClassesApi";
import { SchedulesApi } from "../api/SchedulesApi";

const Sidebar = ({
	schedules,
	setSchedules,
	activeSchedule,
	setActiveSchedule,
	activeClass,
	setActiveClass,
	previewSchedule,
	setPreviewSchedule,
}) => {
	const [selectedButton, setSelectedButton] = useState("schedulePlanner");
	const [classResults, setClassResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchError, setSearchError] = useState("");
	const [hoveringClass, setHoveringClass] = useState(false);

	// Fetch class sections corresponding to the active classs
	useEffect(() => {
		const updateClassResults = async () => {
			const result = await ClassesApi.getClassesByCode(activeClass.code);
			setClassResults(result);
		};

		if (activeClass.number) {
			updateClassResults();
		}
	}, [activeClass]);

	const handleSearchInputKeyUp = async (e) => {
		if (e.key == "Enter") {
			const result = await ClassesApi.getClassesByCode(searchTerm.toUpperCase());
			if (result) {
				setClassResults(result);
				setActiveClass({ code: searchTerm.toUpperCase() });
			} else {
				setClassResults([]);
				setActiveClass({});
				setSearchError("Error: Class not found.");
			}
		} else {
			setSearchError("");
			setPreviewSchedule({});

			if (searchTerm == "") {
				setClassResults([]);
				setActiveClass({});
			}
		}
	};

	const handleAddClass = async (classItem) => {
		// First, check that the class being clicked is not already in the schedule
		if (!activeSchedule.classes.some((activeScheduleClass) => activeScheduleClass._id == classItem._id)) {
			// Check if there is a different section of the class being added already on the schedule
			const activeClassesWithSameCode = activeSchedule.classes.filter(
				(activeScheduleClass) => activeScheduleClass.code == classItem.code
			);

			// Remove it from the schedule if its found
			if (activeClassesWithSameCode.length > 0) {
				await SchedulesApi.deleteClassFromSchedule(activeSchedule._id, activeClassesWithSameCode[0]._id);
			}

			const result = await SchedulesApi.addClassToSchedule(activeSchedule._id, classItem._id);
			setActiveClass(classItem);
			setSchedules(result);
			setActiveSchedule(result.filter((schedule) => schedule._id == activeSchedule._id)[0]);

			// Clear any hovering-related info
			setPreviewSchedule({});
		}
	};

	const handleDeleteClass = async (classItem) => {
		const result = await SchedulesApi.deleteClassFromSchedule(activeSchedule._id, classItem._id);
		setSchedules(result);
		const updatedActiveSchedule = result.filter((schedule) => schedule._id == activeSchedule._id)[0];
		setActiveSchedule(updatedActiveSchedule);
	};

	const handleHoverClassStart = (classItem) => {
		if (!activeSchedule.classes.some((activeScheduleClass) => activeScheduleClass._id == classItem._id)) {
			const updatedActiveSchedule = structuredClone(activeSchedule);
			updatedActiveSchedule.classes = updatedActiveSchedule.classes.filter(
				(activeScheduleClass) => activeScheduleClass.code != classItem.code
			);
			updatedActiveSchedule.classes.push({ ...classItem, muteInActiveCourses: true });
			setPreviewSchedule(updatedActiveSchedule);
		}
	};

	const handleHoverClassEnd = (classItem) => {
		if (previewSchedule.classes) {
			setHoveringClass(false);
			setPreviewSchedule({});
		}
	};

	useEffect(() => {
		setSearchError("");
		setActiveClass({});
		setSearchTerm("");
	}, [activeSchedule]);

	return (
		<div className="w-1/4 p-5 sidebarWrapper">
			<div className="LogoWrapper">
				<img id="logo" src="/CourseCompassLogo.png" alt="Logo" />
				<div id="logoText">UF Class Compass</div>
			</div>

			<div className="sidebarOptionsWrapper" style={{ width: "100%" }}>
				<button
					className={`sidebarOptionButton ${selectedButton === "schedulePlanner" ? "selected" : ""}`}
					onClick={() => setSelectedButton("schedulePlanner")}
				>
					<div>Schedule Planner</div>
					<img className="buttonIcon" id="defaultProfile" src="/schedule_icon.svg" />
				</button>
				<button
					className={`sidebarOptionButton ${selectedButton === "fullCourseSearch" ? "selected" : ""}`}
					onClick={() => setSelectedButton("fullCourseSearch")}
				>
					<div>Full Course Search</div>
					<img className="buttonIcon" id="defaultProfile" src="/search_icon.svg" />
				</button>
				{/* <button
					className={`sidebarOptionButton ${selectedButton === "profile" ? "selected" : ""}`}
					onClick={() => setSelectedButton("profile")}
				>
					<div>Profile</div>
					<img className="buttonIcon" id="defaultProfile" src="/profile_icon.svg" />
				</button> */}
			</div>
			<div className="line"></div>
			<div style={{ height: "3%" }} />
			{/* bad design to compensate for line having to be absolute */}

			{selectedButton === "schedulePlanner" && (
				<>
					<MySchedules
						schedules={schedules}
						setSchedules={setSchedules}
						activeSchedule={activeSchedule}
						setActiveSchedule={setActiveSchedule}
						activeClass={activeClass}
						setActiveClass={setActiveClass}
					/>

					{activeSchedule?.classes?.length > 0 && (
						<>
							<p className="mb-1">Active Courses</p>
							<div className="mb-4">
								{activeSchedule?.classes
									?.filter((classItem) => classItem?.muteInActiveCourses != true)
									?.map((classItem) => (
										<CourseCodeButton
											key={classItem.number}
											classItem={classItem}
											active={activeClass?.number == classItem.number}
											setActiveClass={setActiveClass}
											handleDeleteClass={handleDeleteClass}
										/>
									))}
							</div>
						</>
					)}

					<p className={`mb-1 ${activeSchedule?.classes ? "" : "opacity-40"}`}>Course Code Search</p>
					<input
						className={`w-full py-2 px-2 flex align-center bg-white border border-gray-300 ${
							searchError == "" && activeSchedule?.classes ? "mb-4" : "mb-1"
						} ${activeSchedule?.classes ? "" : "opacity-60 line-through"}`}
						placeholder="Enter class code (e.g. CIS4930)"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyUp={handleSearchInputKeyUp}
						disabled={!activeSchedule?.classes}
					/>
					{searchError != "" && <p className="text-red-400 text-sm mb-4">{searchError}</p>}
					{!activeSchedule?.classes && (
						<p className="italic text-sm mb-4">
							Select or create a schedule to start searching for classes.
						</p>
					)}

					{activeClass.code && (
						<>
							<p className="mb-1">Course Sections &#40;{activeClass.code}&#41;</p>
							{classResults.map((classItem) => (
								<CourseSectionBox
									key={classItem.number}
									classItem={classItem}
									handleAddClass={handleAddClass}
									activeSchedule={activeSchedule}
									handleHoverClassStart={handleHoverClassStart}
									handleHoverClassEnd={handleHoverClassEnd}
								/>
							))}
						</>
					)}
				</>
			)}

			{/* <div className="absolute bottom-2 left-2 w-full flex justify-start text-sm">
				Copyright &copy; 2024 Duck Duck Slow
			</div> */}
		</div>
	);
};

export default Sidebar;
