import "../styles/Sidebar.css";
import { useState } from "react";
import CourseSectionBox from "./CourseSectionBox";
import MySchedules from "./MySchedules";
import CourseCodeButton from "./CourseCodeButton";

const Sidebar = ({ schedules, setSchedules, activeSchedule, setActiveSchedule }) => {
	const [selectedButton, setSelectedButton] = useState("schedulePlanner");

	const handleButtonClick = (button) => {
		setSelectedButton(button);
	};

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
					/>

					<div className="courseSearchBox relative mb-2">
						<input
							className="w-full py-2 px-2 flex align-center bg-white border border-gray-300"
							placeholder="Course Code Search"
						/>
					</div>

					<div
						className="grid w-full relative flex flex-wrap justify-start mb-4"
						style={{ gridTemplateColumns: `repeat(2, minmax(0, 1fr))`, gap: "5%" }}
					>
						<CourseCodeButton name="CIS4930" />
						<CourseCodeButton name="CIS4930" />
						<CourseCodeButton name="CIS4930" />
					</div>

					<p>Course Sections</p>
					<CourseSectionBox name="Class #1234" />
					<CourseSectionBox name="Class #2345" />
					<CourseSectionBox name="Class #3456" />
				</>
			)}

			{/* <div className="absolute bottom-2 left-2 w-full flex justify-start text-sm">
				Copyright &copy; 2024 Duck Duck Slow
			</div> */}
		</div>
	);
};

export default Sidebar;
