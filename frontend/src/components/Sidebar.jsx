import "../styles/Sidebar.css";
import { useState, useEffect } from "react";
import CourseSectionBox from "./CourseSectionBox";
import MySchedules from "./MySchedules";
import CourseCodeButton from "./CourseCodeButton";
import { ClassesApi } from "../api/ClassesApi";

const Sidebar = ({ schedules, setSchedules, activeSchedule, setActiveSchedule, activeClass, setActiveClass }) => {
	const [selectedButton, setSelectedButton] = useState("schedulePlanner");
	const [classResults, setClassResults] = useState([]);

	const handleButtonClick = (button) => {
		setSelectedButton(button);
	};

	// Fetch class sections corresponding to the active classs
	useEffect(() => {
		const updateClassResults = async () => {
			const result = await ClassesApi.getClassesByCode(activeClass.code);
			console.log(result.length);
			setClassResults(result);
		};

		if (activeClass.code) {
			updateClassResults();
		}
	}, [activeClass]);

	return (
		<div className="w-1/4 p-5 sidebarWrapper">
			<div className="LogoWrapper">
				<img id="logo" src="/CourseCompassLogo.png" alt="Logo" />
				<div id="logoText">UF Class Compass</div>
			</div>

			<div className="sidebarOptionsWrapper" style={{ width: "100%" }}>
				<button
					className={`sidebarOptionButton ${selectedButton === "schedulePlanner" ? "selected" : ""}`}
					onClick={() => handleButtonClick("schedulePlanner")}
				>
					<div>Schedule Planner</div>
					<img className="buttonIcon" id="defaultProfile" src="/schedule_icon.svg" />
				</button>
				<button
					className={`sidebarOptionButton ${selectedButton === "fullCourseSearch" ? "selected" : ""}`}
					onClick={() => handleButtonClick("fullCourseSearch")}
				>
					<div>Full Course Search</div>
					<img className="buttonIcon" id="defaultProfile" src="/search_icon.svg" />
				</button>
				{/* <button
					className={`sidebarOptionButton ${selectedButton === "profile" ? "selected" : ""}`}
					onClick={() => handleButtonClick("profile")}
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

					<p className="mb-1">Active Courses</p>
					<div className="mb-4">
						{activeSchedule?.classes?.map((classItem) => (
							<CourseCodeButton
								key={classItem.code}
								classItem={classItem}
								active={activeClass?.code == classItem.code}
								setActiveClass={setActiveClass}
							/>
						))}
					</div>

					<p className="mb-1">Course Code Search</p>
					<div className="courseSearchBox relative mb-4">
						<input
							className="w-full py-2 px-2 flex align-center bg-white border border-gray-300"
							placeholder="Enter course code (e.g. CIS4930)"
						/>
					</div>

					{activeClass && (
						<>
							<p className="mb-1">Course Sections &#40;{activeClass.code}&#41;</p>
							{classResults.map((classItem) => (
								<CourseSectionBox key={classItem.number} classItem={classItem} />
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
