import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import Colors from "../constants/Colors";
import DaysBox from "./DaysBox";
import { Days } from "../constants/Days";
import { getPeriodTimes } from "../constants/BlockTimes";
import { SchedulesApi } from "../api/SchedulesApi";
import StyleColors from "../constants/StyleColors";
import SlidingSidebar from "./SlidingSidebar"

const Schedule = ({ colCount, maxRowCount, activeSchedule, previewSchedule, handleToggleSidebar }) => {
	const [grid, setGrid] = useState([]);
	const [credits, setCredits] = useState(0);
	const [newRowCount, setRowCount] = useState(maxRowCount);
	const [isClassClicked, setIsClassClicked] = useState(false);
	const [cell, setCell] = useState();

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
		let classes = null;
		if (previewSchedule?.classes?.length > 0) classes = previewSchedule.classes;
		else if (activeSchedule?.classes?.length > 0) classes = activeSchedule.classes;

		if (classes) {
			classes.forEach((classItem) => {
				totalCredits += classItem?.credits;

				classItem?.meetings?.forEach((meetingItem) => {
					rows[meetingItem.period - 1][meetingItem.day] = {
						// ** Subtract 1 from the period to zero it (all periods stored for classes are 1-based)
						period: meetingItem.period,
						instructor: classItem.instructor,
						isClass: true,
						color: Colors.classColors[colorIndex],
						code: classItem.code,
						location: `${meetingItem.building} ${meetingItem.room}`,
						length: meetingItem.length,
					};

					for (var i = 1; i < meetingItem.length; i++) {
						rows[meetingItem.period - 1 + i][meetingItem.day] = {
							period: meetingItem.period,
							isClass: true,
							color: Colors.classColors[colorIndex],
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
			setCredits(totalCredits);
		}
	}, [colCount, maxRowCount, activeSchedule, previewSchedule]);

	return (
		<div className="px-0 sm:px-10 py-20 w-full min-h-full flex relative">
			<div className="absolute top-5 right-5 font-bold p-2">CREDITS: {credits}</div>
			<div className="absolute top-5 rounded-lg text-white left-5 font-bold md:hidden p-2" onClick={handleToggleSidebar} style={{backgroundColor: StyleColors.orange}}>View Schedules</div>
			<div
				className="flex flex-col sm:mr-3 w-4 sm:w-1/12"
			>
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
				>
				</div>
				<div className="h-full flex flex-col">
					{grid.map((row, index) => (
						<div key={index} className="relative flex grow items-center justify-end">
							<div
								className="italic absolute"
								style={{ whiteSpace: "nowrap", fontSize: "0.9rem", top: "-0.45rem", right: "1.5rem" }}
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
								{row[0].period}
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

				<div className="w-full grow border border-slate-300 relative">
					{/* 
				There are TWO grids, one is a skeleton that creates the grid lines,
				the other is the grid actually containing the classes and their colored
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
					/>
				</div>
			</div>
			<SlidingSidebar isClassClicked={isClassClicked} setIsClassClicked={setIsClassClicked} cell={cell}/>
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
