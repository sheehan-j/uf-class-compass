import Schedule from "../components/Schedule";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

const SchedulePage = () => {
	const [sidebarVisible, setSidebarVisible] = useState(true);
  	const toggleSidebar = () => {
    	setSidebarVisible(!sidebarVisible);
  	};

	
	return (
		<>
		<Navbar />
		<div className="w-full h-full flex relative">
			{sidebarVisible && <Sidebar handleToggleSidebar={toggleSidebar}/>}
			<Schedule colCount={5} maxRowCount={11} handleToggleSidebar={toggleSidebar}/>
		</div>
		</>
	);
};

export default SchedulePage;
