import "../styles/Sidebar.css";
import React, { useState } from "react";

const Sidebar = () => {
    const [selectedButton, setSelectedButton] = useState("schedulePlanner");

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    return (
        <div className="w-1/3 sidebarWrapper">
				<div className="LogoWrapper">
					<img id="logo" src="/CourseCompassLogo.png" alt="Logo" />
					<div id="logoText"><b>UF CLASS COMPASS</b></div>
				</div>

				<div className="sidebarOptionsWrapper" style={{ width: "100%" }}>
					<button
						className={`sidebarOptionButton ${selectedButton === "schedulePlanner" ? "selected" : ""}`}
						onClick={() => handleButtonClick("schedulePlanner")}
					>
						<div>Schedule Planner</div>
						<div className="buttonIconWrapper">
							<img className="buttonIcon" id="defaultProfile" src="/calendarIcon.png"/>
						</div>
					</button>
					<button
						className={`sidebarOptionButton ${selectedButton === "fullCourseSearch" ? "selected" : ""}`}
						onClick={() => handleButtonClick("fullCourseSearch")}
					>
						<div>Full Course Search</div>
						<div className="buttonIconWrapper">
							<img className="buttonIcon" id="defaultProfile" src="/searchSchedule.png"/>
						</div>
					</button>
					<button
						className={`sidebarOptionButton ${selectedButton === "profile" ? "selected" : ""}`}
						onClick={() => handleButtonClick("profile")}
					>
						<div>Profile</div>
						<div className="buttonIconWrapper">
							<img className="buttonIcon" id="defaultProfile" src="/defaultProfile.png"/>
						</div>
					</button>
				</div>
			<div className="line"></div>

            <div style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: "10px",
                display: "flex",
            }}>
                Copyright &copy; 2024 Duck Duck Slow
            </div>
        </div>
    );
};

export default Sidebar;
