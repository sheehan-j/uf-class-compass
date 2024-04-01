import { useState } from "react";
import CourseSectionBox from "./CourseSectionBox";
import MySchedules from "./MySchedules";
import CourseCodeButton from "./CourseCodeButton";
import StyleColors from "../constants/StyleColors";
import PropTypes from "prop-types";


const Sidebar = ({handleToggleSidebar}) => {
	return (
		<div style={{backgroundColor: StyleColors.gray}} className="min-h-full top-0 left-0 w-1/2 p-5 text-black absolute md:w-5/12 lg:w-1/4 md:sticky overflow-y-auto z-50 border-r border-black md:border-none">
			 <div className="md:hidden w-full flex justify-end">
					<button onClick={handleToggleSidebar}><img src="/remove.svg"/></button>
			</div>
			<div className="w-full h-1/12 flex mb-5 justify-center items-center">
				<img className="w-1/2 px-5 object-scale-down" id="logo" src="/CourseCompassLogo.png" alt="Logo" />
				<div className="w-1/2 font-bold text-start md:text-l lg:text-2xl">UF Class Compass</div>
			</div>
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
		</div>
	);
};


Sidebar.propTypes = {
	handleToggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
