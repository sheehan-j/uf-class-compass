import "../styles/Sidebar.css";
import { useState } from "react";
import CourseSectionBox from "./CourseSectionBox";

const Sidebar = () => {
	const [selectedButton, setSelectedButton] = useState("schedulePlanner");

	const handleButtonClick = (button) => {
		setSelectedButton(button);
	};

	return (
		<div className="w-1/4 p-8 sidebarWrapper">
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
				<button
					className={`sidebarOptionButton ${selectedButton === "profile" ? "selected" : ""}`}
					onClick={() => handleButtonClick("profile")}
				>
					<div>Profile</div>
					<img className="buttonIcon" id="defaultProfile" src="/profile_icon.svg" />
				</button>
			</div>
			<div className="line"></div>
			<div style={{height: "3%"}}/>
			{/* bad design to compensate for line having to be absolute */}
		
			<p>Course Sections</p>
			<CourseSectionBox name="Class #1234"/>
			<CourseSectionBox name="Class #2345"/>
			<CourseSectionBox name="Class #3456"/>
			<div className="absolute bottom-2 left-2 w-full flex justify-start text-sm">
				Copyright &copy; 2024 Duck Duck Slow
			</div>
		</div>
	);
};

export default Sidebar;
