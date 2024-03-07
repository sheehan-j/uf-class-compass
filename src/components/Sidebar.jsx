import "../styles/Sidebar.css";
import { useState } from "react";

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

			<div
				style={{
					position: "absolute",
					bottom: "0.5rem",
					left: "0.5rem",
					width: "100%",
					display: "flex",
					fontSize: "0.7rem",
				}}
			>
				Copyright &copy; 2024 Duck Duck Slow
			</div>
		</div>
	);
};

export default Sidebar;
