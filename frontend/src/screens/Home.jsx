import { useEffect, useState } from "react";
import { SchedulesApi } from "../api/SchedulesApi";
import Schedule from "../components/Schedule";
import Sidebar from "../components/Sidebar";

const Home = () => {
	const [schedules, setSchedules] = useState([]);
	const [activeSchedule, setActiveSchedule] = useState({});

	useEffect(() => {
		const loadSchedules = async () => {
			const data = await SchedulesApi.getAllSchedules();
			setSchedules(data);
			setActiveSchedule(data.length > 0 ? data[0] : {});
		};

		loadSchedules();
	}, []);

	return (
		<div className="w-screen h-screen flex">
			<Sidebar
				schedules={schedules}
				setSchedules={setSchedules}
				activeSchedule={activeSchedule}
				setActiveSchedule={setActiveSchedule}
			/>
			<div className="w-full h-full overflow-y-scroll">
				<Schedule colCount={5} maxRowCount={11} activeSchedule={activeSchedule} />
			</div>
		</div>
	);
};

export default Home;
