import Schedule from "../components/Schedule";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { SchedulesApi } from "../api/SchedulesApi";
import { DistanceUtil } from "../../util/DistanceUtil";
import { useAuth } from "../hooks/AuthProvider";
import SlidingSidebar from "../components/SlidingSidebar";

const SchedulePage = () => {
	const [sidebarVisible, setSidebarVisible] = useState(false);
	const toggleSidebar = () => {
		setSidebarVisible(!sidebarVisible);
	};
	const [schedules, setSchedules] = useState([]);
	const [activeSchedule, setActiveSchedule] = useState({});
	const [activeClass, setActiveClass] = useState(""); // the CODE of the active class (e.g. COP3502C)
	const [previewSchedule, setPreviewSchedule] = useState({});
	const [cell, setCell] = useState({});
	const [isClassClicked, setIsClassClicked] = useState(false);
	const auth = useAuth();

	useEffect(() => {
		const loadSchedules = async () => {
			const data = await SchedulesApi.getSchedulesByUser(auth.user._id);
			setSchedules(data);

			if (data.length > 0) {
				const newActiveSchedule = await DistanceUtil.updateScheduleWithDistances(data[0]);
				setActiveSchedule(newActiveSchedule);
			}
			// TODO: Along with handleSelectSchedule in MySchedules.jsx, decide if we want to auto select an active class or no
			// This is little wack but it's just checking if there are any schedules and then if the first schedule has any classes
			// setActiveClass(data.length > 0 ? (data[0].classes.length > 0 ? data[0].classes[0] : {}) : {});
		};

		if (auth.user) {
			loadSchedules();
		}

		// const handleResize = () => {
		// 	if (!window.matchMedia("(max-width: 768px)").matches) {
		// 		setSidebarVisible(true);
		// 	}
		// };

		// window.addEventListener("resize", handleResize);

		// return () => {
		// 	window.removeEventListener("resize", handleResize);
		// };
	}, [auth]);

	return (
		<div className="w-screen h-screen overflow-hidden flex flex-col relative">
			<Navbar />
			<div className="flex grow overflow-hidden relative">
				<Sidebar
					schedules={schedules}
					setSchedules={setSchedules}
					activeSchedule={activeSchedule}
					setActiveSchedule={setActiveSchedule}
					activeClass={activeClass}
					setActiveClass={setActiveClass}
					previewSchedule={previewSchedule}
					setPreviewSchedule={setPreviewSchedule}
					sidebarVisible={sidebarVisible}
					handleToggleSidebar={toggleSidebar}
				/>
				<Schedule
					colCount={5}
					maxRowCount={14}
					activeSchedule={activeSchedule}
					previewSchedule={previewSchedule}
					handleToggleSidebar={toggleSidebar}
					isClassClicked={isClassClicked}
					setIsClassClicked={setIsClassClicked}
					cell={cell}
					setCell={setCell}
				/>
				<SlidingSidebar isClassClicked={isClassClicked} setIsClassClicked={setIsClassClicked} cell={cell} />
			</div>
		</div>
	);
};

export default SchedulePage;
