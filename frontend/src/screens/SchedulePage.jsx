import Schedule from "../components/Schedule";
import Sidebar from "../components/Sidebar";
import SlidingSidebar from "../components/SlidingSidebar"
import Navbar from "../components/Navbar";
import { useState } from "react";

const SchedulePage = () => {
	
	return (
		<>
		<Navbar />
		<div className="w-full h-full flex">
			<Sidebar />
			<div className="w-full h-full">
				<Schedule colCount={5} maxRowCount={11}/>
			</div>
		</div>
		</>
	);
};

export default SchedulePage;
