import { useState, useRef, useEffect } from "react";
import { SchedulesApi } from "../api/SchedulesApi";
import MyScheduleBox from "./MyScheduleBox";

const MySchedules = ({ schedules, setSchedules, activeSchedule, setActiveSchedule, activeClass, setActiveClass }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const schedulesMenuRef = useRef(null);

	const handleNewSchedule = async () => {
		const newScheduleNumber = schedules.length + 1;
		const newSchedules = await SchedulesApi.createSchedule(`Schedule ${newScheduleNumber}`);
		if (newSchedules.length == schedules.length + 1) setActiveSchedule(newSchedules[newSchedules.length - 1]);
		setSchedules(newSchedules);
	};

	const handleDeleteSchedule = async (id) => {
		const newSchedules = await SchedulesApi.deleteSchedule(id);
		setActiveSchedule(newSchedules.length > 0 ? newSchedules[newSchedules.length - 1] : {});
		setSchedules(newSchedules);
	};

	const handleSelectSchedule = async (schedule) => {
		setActiveSchedule(schedule);
		setActiveClass(schedule.classes.length > 0 ? schedule.classes[0] : {});
	};

	const handleToggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	// Update the maxHeight of the schedule menu
	useEffect(() => {
		updateMenuHeight();
	}, [isCollapsed, schedules]);

	const updateMenuHeight = () => {
		if (isCollapsed) {
			schedulesMenuRef.current.style.maxHeight = "0px";
		} else {
			const children = schedulesMenuRef.current.children;
			let totalHeight = 0;
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				const computedStyle = window.getComputedStyle(child);
				const marginTop = parseInt(computedStyle.marginTop);
				const marginBottom = parseInt(computedStyle.marginBottom);
				totalHeight += child.offsetHeight + marginTop + marginBottom;
			}
			schedulesMenuRef.current.style.maxHeight = `${totalHeight}px`;
		}
	};

	return (
		<div className="w-full">
			<div
				className="relative py-3 px-4 mb-3"
				style={{ backgroundColor: "rgba(235, 235, 235, 1)", borderRadius: "0.75rem" }}
			>
				<div className="flex items-center justify-between cursor-pointer" onClick={handleToggleCollapse}>
					<p>My Schedules</p>
					<img src="/folder.svg" style={{ height: "1.3rem" }} />
				</div>
				<div
					className="overflow-hidden"
					ref={schedulesMenuRef}
					style={{
						transition: "all 0.1s linear",
					}}
				>
					{schedules.map((schedule, index) => (
						<MyScheduleBox
							key={index}
							schedule={schedule}
							selected={activeSchedule._id == schedule._id}
							onSelect={handleSelectSchedule}
							onDelete={handleDeleteSchedule}
						/>
					))}
					<button
						className="px-4 py-1 mt-2 block mx-auto bg-white border border-gray-400"
						style={{ borderRadius: "1000px" }}
						onClick={handleNewSchedule}
					>
						New Schedule
					</button>
				</div>
				<button
					className="w-full flex items-center justify-center py-1.5 mt-2"
					onClick={handleToggleCollapse}
					style={{ backgroundColor: "rgb(220, 220, 220)", borderRadius: "0.2rem" }}
				>
					{isCollapsed ? (
						<img src="expand.svg" style={{ height: "0.5rem" }}></img>
					) : (
						<img src="collapse_vertical.svg" style={{ height: "0.5rem" }}></img>
					)}
				</button>
			</div>
			<div className="flex justify-center w-full">
				<div
					className="flex justify-center mb-4 py-1 bg-white"
					style={{ border: "1px solid gray", borderRadius: "1000px", width: "80%" }}
				>
					{activeSchedule?.name ? activeSchedule.name : "No Schedule Selected"}
				</div>
			</div>
		</div>
	);
};

export default MySchedules;
