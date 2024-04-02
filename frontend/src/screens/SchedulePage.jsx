import Schedule from "../components/Schedule";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { SchedulesApi } from "../api/SchedulesApi";

const SchedulePage = () => {
	const [sidebarVisible, setSidebarVisible] = useState(true);
	const toggleSidebar = () => {
		setSidebarVisible(!sidebarVisible);
	};

	const [schedules, setSchedules] = useState([]);
	const [activeSchedule, setActiveSchedule] = useState({});
	const [activeClass, setActiveClass] = useState({});
	const [previewSchedule, setPreviewSchedule] = useState({});

	useEffect(() => {
		const loadSchedules = async () => {
			const data = await SchedulesApi.getAllSchedules();
			setSchedules(data);
			setActiveSchedule(data.length > 0 ? data[0] : {});
			// TODO: Along with handleSelectSchedule in MySchedules.jsx, decide if we want to auto select an active class or no
			// This is little wack but it's just checking if there are any schedules and then if the first schedule has any classes
			// setActiveClass(data.length > 0 ? (data[0].classes.length > 0 ? data[0].classes[0] : {}) : {});
		};

		const handleResize = () => {
			if (!window.matchMedia("(max-width: 768px)").matches) {
				setSidebarVisible(true);
			}
		};

		window.addEventListener("resize", handleResize);

		loadSchedules();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="w-screen h-screen flex flex-col">
			<Navbar />
			<div className="flex grow relative">
				{sidebarVisible && (
					<Sidebar
						schedules={schedules}
						setSchedules={setSchedules}
						activeSchedule={activeSchedule}
						setActiveSchedule={setActiveSchedule}
						activeClass={activeClass}
						setActiveClass={setActiveClass}
						previewSchedule={previewSchedule}
						setPreviewSchedule={setPreviewSchedule}
						handleToggleSidebar={toggleSidebar}
					/>
				)}
				<Schedule
					colCount={5}
					maxRowCount={11}
					activeSchedule={activeSchedule}
					previewSchedule={previewSchedule}
					handleToggleSidebar={toggleSidebar}
				/>
			</div>
		</div>
	);
};

export default SchedulePage;
