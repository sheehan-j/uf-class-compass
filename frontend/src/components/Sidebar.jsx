import "../styles/Sidebar.css";
import { useState } from "react";
import CourseSectionBox from "./CourseSectionBox";
import MySchedules from "./MySchedules";
import CourseCodeButton from "./CourseCodeButton";
import StyleColors from "../constants/StyleColors";

const Sidebar = () => {
	const [selectedButton, setSelectedButton] = useState("schedulePlanner");

	const handleButtonClick = (button) => {
		setSelectedButton(button);
	};

	return (
		<div style={{backgroundColor: StyleColors.gray}} className="w-1/4 p-5 text-black relative sidebarWrapper left-0 overflow-y-auto">
			<div className="LogoWrapper">
				<img id="logo" src="/CourseCompassLogo.png" alt="Logo" />
				<div id="logoText">UF Class Compass</div>
			</div>
		
			{selectedButton === "schedulePlanner" && (
				<>
				<MySchedules/>

				<div className="courseSearchBox relative mb-2">
					<input
						className="w-full py-2 px-2 flex align-center bg-white border border-gray-300"
						placeholder="Course Code Search"
					/>
				</div>
				
				<div className="grid w-full relative flex flex-wrap justify-start mb-4" style={{gridTemplateColumns: `repeat(2, minmax(0, 1fr))`, gap:"5%"}}>
					<CourseCodeButton name="CIS4930" />
					<CourseCodeButton name="CIS4930" />
					<CourseCodeButton name="CIS4930" />
				</div>

				<p>Course Sections</p>
				<CourseSectionBox name="Class #1234"/>
				<CourseSectionBox name="Class #2345"/>
				<CourseSectionBox name="Class #3456"/>
				</>
			)}
			
			{/* <div className="absolute bottom-2 left-2 w-full flex justify-start text-sm">
				Copyright &copy; 2024 Duck Duck Slow
			</div> */}
		</div>
	);
};

export default Sidebar;
