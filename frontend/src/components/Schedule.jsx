import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import Colors from "../constants/Colors";
import DaysBox from "./DaysBox";
import { Days } from "../constants/Days";
import { getPeriodTimes } from "../constants/BlockTimes";
import { getPeriodLabel } from "../constants/Periods";
import { SchedulesApi } from "../api/SchedulesApi";
import SlidingSidebar from "./SlidingSidebar";
import OnlineSection from "./OnlineSection";

const Schedule = ({
	colCount,
	maxRowCount,
	activeSchedule,
	previewSchedule,
	handleToggleSidebar,
	isClassClicked,
	setIsClassClicked,
	cell,
	setCell,
}) => {
	const [grid, setGrid] = useState([]);
	const [credits, setCredits] = useState(0);
	const [newRowCount, setRowCount] = useState(maxRowCount);
	const [gridWidth, setGridWidth] = useState(null);
	const [onlineSections, setOnlineSections] = useState([]);
	const gridRefMain = useRef(null);
	const gridRefSkeleton = useRef(null);

	// Step 2: Create a state to hold the width
	const [width, setWidth] = useState(0);

	// Step 3: Add an event listener for the window resize event
	useEffect(() => {
		const handleResize = () => {
			if (gridRefMain.current) {
				setWidth(gridRefMain.current.offsetWidth);
			}
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const rows = [];
		for (var i = 0; i < maxRowCount; i++) {
			const row = [];
			for (var j = 0; j < colCount; j++) row.push({ isClass: false, period: i + 1 });
			rows.push(row);
		}

		setRowCount(rows.length);
		setGrid(rows);

		var colorIndex = 0;
		let totalCredits = 0;
		let sections = null;
		if (previewSchedule?.sections?.length > 0) sections = previewSchedule.sections;
		else if (activeSchedule?.sections?.length > 0) sections = activeSchedule.sections;
		const newOnlineSections = [];

		if (sections) {
			sections.forEach((section) => {
				totalCredits += section.credits;

				let sectionInfoObject = {
					_id: section._id,
					number: section.number,
					instructor: section.instructor.name,
					credits: section.credits,
					final: section.final,
					department: section.department,
					color: Colors.classColors[colorIndex % Colors.classColors.length],
					code: section.class.code,
					title: section.class.title,
					description: section.class.description,
					prerequisites: section.class?.prerequisites ? section.class?.prerequisites : null,
					rmpData: section.instructor.rmpData,
					isOnline: section.isOnline,
				};

				if (section?.isOnline) {
					const onlineSection = {
						...sectionInfoObject,
						location: "Online",
					};
					newOnlineSections.push(onlineSection);
				}

				section?.meetings?.forEach((meetingItem) => {
					// ** Subtract 1 from the period to zero it (all periods stored for sections are 1-based)
					rows[meetingItem.period - 1][meetingItem.day] = {
						...sectionInfoObject,
						period: meetingItem.period,
						building: meetingItem.building,
						location: `${meetingItem.building.code} ${meetingItem.room}`,
						length: meetingItem.length,
						distance: meetingItem?.distance && meetingItem.length == 1 ? meetingItem.distance : null,
						isClass: true,
						displayText: true,
					};

					for (var i = 1; i < meetingItem.length; i++) {
						rows[meetingItem.period - 1 + i][meetingItem.day] = {
							...sectionInfoObject,
							building: meetingItem.building,
							location: `${meetingItem.building.code} ${meetingItem.room}`,
							period: meetingItem.period,
							isClass: true,
							displayText: false,
							distance:
								// If this is class > 2 in length, add the distance to the last cell
								meetingItem?.distance && i == meetingItem.length - 1 ? meetingItem.distance : null,
						};
					}
				});

				colorIndex++;
			});
			while (rows.length > 1 && !rows[0].some((cell) => cell.isClass) && !rows[1].some((cell) => cell.isClass)) {
				rows.shift();
			}

			while (
				rows.length > 1 &&
				!rows[rows.length - 1].some((cell) => cell.isClass) &&
				!rows[rows.length - 2].some((cell) => cell.isClass)
			) {
				rows.pop();
			}

			setRowCount(rows.length);
			setGrid(rows);
			setOnlineSections(newOnlineSections);
			setCredits(totalCredits);
		}
	}, [colCount, maxRowCount, activeSchedule, previewSchedule]);

	return (
		<div className="pl-3 pr-1 sm:px-10 py-20 w-full overflow-y-scroll flex flex-col relative overflow-x-clip">
			<div className="flex flex-row grow">
				<div className="absolute top-5 right-5 font-bold p-2">CREDITS: {credits}</div>
				<div
					className="flex pl-10 pr-3 rounded-r-md align-items-center absolute top-5 text-white left-0 font-bold lg:hidden p-2 hover:cursor-pointer bg-customOrange hover:bg-customOrange-dark"
					onClick={handleToggleSidebar}
				>
					{/* View Schedules */}
					<img src="./expand_right.svg" className="h-7 w-auto" />
				</div>
				<div className="flex flex-col mr-2 sm:mr-3 w-4 sm:w-1/12">
					<div
						className="font-medium"
						style={{
							minHeight: "2.5rem",
							whiteSpace: "nowrap",
							marginBottom: "2rem",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					></div>
					<div className="h-full flex flex-col">
						{grid.map((row, index) => (
							<div key={index} className="relative flex grow items-center justify-end">
								<div
									className="italic absolute right-4 lg:right-6"
									style={{ whiteSpace: "nowrap", fontSize: "0.9rem", top: "-0.45rem" }}
								>
									<span className="hidden sm:block">{getPeriodTimes(row[0].period).start}</span>
								</div>
								<div
									style={{
										flex: "1",
										display: "flex",
										justifyContent: "right",
										alignItems: "center",
									}}
								>
									{getPeriodLabel(row[0].period)}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="flex flex-col w-full grow">
					<div
						className="grid w-full relative"
						style={{
							marginBottom: "2rem",
							height: "2.5rem",
							gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
						}}
					>
						<DaysBox />
					</div>

					<div className="w-full grow relative">
						{/* 
				There are TWO grids, one is a skeleton that creates the grid lines,
				the other is the grid actually containing the sections and their colored
				rectangles. This is done to achieve the visual effect of the grid lines
				behind the transparent class boxes.
				*/}
						<Grid
							key={"skeletonGrid"}
							grid={grid}
							colCount={colCount}
							rowCount={newRowCount}
							isSkeleton={false}
							isClassClicked={isClassClicked}
							setIsClassClicked={setIsClassClicked}
							setCell={setCell}
							gridRef={gridRefSkeleton}
						/>
						<Grid
							key={"coloredGrid"}
							grid={grid}
							colCount={colCount}
							rowCount={newRowCount}
							isSkeleton={true}
							isClassClicked={isClassClicked}
							setIsClassClicked={setIsClassClicked}
							setCell={setCell}
							gridRef={gridRefMain}
						/>
					</div>
				</div>
			</div>
			<div className="w-full flex flex-col items-end">
				{/* <OnlineSection width={width} /> */}
				{onlineSections.map((onlineSection) => (
					<OnlineSection
						key={onlineSection._id}
						width={width}
						cell={onlineSection}
						onCellClick={() => {
							setIsClassClicked(true);
							setCell(onlineSection);
						}}
					/>
				))}
			</div>
		</div>
	);
};

Schedule.propTypes = {
	colCount: PropTypes.number.isRequired,
	maxRowCount: PropTypes.number.isRequired,
	activeSchedule: PropTypes.object.isRequired,
	previewSchedule: PropTypes.object.isRequired,
	handleToggleSidebar: PropTypes.func.isRequired,
};

export default Schedule;
