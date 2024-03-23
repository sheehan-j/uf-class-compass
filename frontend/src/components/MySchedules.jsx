import { useState, useRef, useEffect } from "react";
import MyScheduleBox from "./MyScheduleBox";

const MySchedules = () => {
	const [selectedSchedule, setSelectedSchedule] = useState("Schedule 1");
	const [scheduleNames, setScheduleNames] = useState(["Schedule 1", "Schedule 2"]);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const schedulesMenuRef = useRef(null);

	const handleScheduleSelect = (name) => {
		setSelectedSchedule(name);
	};

	const handleNewSchedule = () => {
		const nextSchedule = `Schedule ${scheduleNames.length + 1}`;
		setSelectedSchedule(nextSchedule);
		setScheduleNames([...scheduleNames, nextSchedule]);
	};

	const handleRemoveSchedule = (nameToRemove) => {
		const indexToRemove = scheduleNames.indexOf(nameToRemove);
		if (indexToRemove !== -1 && scheduleNames.length !== 1) {
			setScheduleNames((prevNames) => prevNames.filter((name) => name !== nameToRemove));
			setScheduleNames((prevNames) =>
				prevNames.map((name, index) => {
					return index >= indexToRemove ? `Schedule ${index + 1}` : name;
				})
			);
			const scheduleNumber = parseInt(selectedSchedule.split(" ")[1]);
			if (scheduleNumber > indexToRemove) {
				//if selected schedule 2 and schedule 1 removed, want selected to shift to s.t. old schedule 2 still selected despite shifting to schedule 1
				setSelectedSchedule(scheduleNames[Math.max(0, scheduleNumber - 2)]);
			}
		}
	};

	const handleToggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	// Update the maxHeight of the schedule menu
	useEffect(() => {
		updateMenuHeight();
	}, [isCollapsed, scheduleNames]);

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

	const computeMenuHeight = () => {
		const children = schedulesMenuRef.current.children;
		let totalHeight = 0;
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			const computedStyle = window.getComputedStyle(child);
			const marginTop = parseInt(computedStyle.marginTop);
			const marginBottom = parseInt(computedStyle.marginBottom);
			totalHeight += child.offsetHeight + marginTop + marginBottom;
		}
		return totalHeight;
	};

	return (
		<div className="w-full">
			<div
				className="relative pt-3 pb-2 px-4 mb-3"
				style={{ backgroundColor: "#e6e6e6", borderRadius: "0.75rem" }}
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
					{scheduleNames.map((name, index) => (
						<MyScheduleBox
							key={index}
							name={name}
							onSelect={handleScheduleSelect}
							selected={selectedSchedule === name}
							onRemove={handleRemoveSchedule}
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
					style={{ backgroundColor: "rgb(210, 210, 210)", borderRadius: "0.25rem" }}
				>
					{isCollapsed ? (
						<img src="expand.svg" style={{ height: "0.5rem" }}></img>
					) : (
						<img src="collapse_vertical.svg" style={{ height: "0.5rem" }}></img>
					)}
				</button>
			</div>
			{/* <div className="bg-gray-200 w-full p-2 flex items-center justify-center flex-col mb-2">
				{!isCollapsed ? (
					<>
						{scheduleNames.map((name) => (
							<MyScheduleBox
								key={name}
								name={name}
								onSelect={handleScheduleSelect}
								selected={selectedSchedule === name}
								onRemove={handleRemoveSchedule}
							/>
						))}
						<div className="relative w-full flex items-center justify-center">
							<button className="bg-white px-3 py-1" onClick={handleNewSchedule}>
								New Schedule
							</button>
							<button className="absolute bottom-0 right-0" onClick={handleToggleCollapse}>
								<img src="/collapse_vertical.svg" />
							</button>
						</div>
					</>
				) : (
					<button onClick={handleToggleCollapse}>
						<img src="/expand.svg" />
					</button>
				)}
			</div> */}
			<div className="flex justify-center w-full">
				<div
					className="flex justify-center mb-4 py-1"
					style={{ border: "1px solid gray", borderRadius: "1000px", width: "80%" }}
				>
					{selectedSchedule}
				</div>
			</div>
		</div>
	);
};

export default MySchedules;
