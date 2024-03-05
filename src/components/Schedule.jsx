import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import Colors from "../constants/Colors";
import DaysBox from "./DaysBox"

const Schedule = ({ colCount, rowCount }) => {
	const dummyClasses = [
		{
			code: "CIS4930",
			meetings: [
				{
					col: 0,
					row: 1,
					length: 1,
				},
				{
					col: 2,
					row: 1,
					length: 1,
				},
				{
					col: 4,
					row: 1,
					length: 1,
				},
			],
		},
		{
			code: "COP4600",
			meetings: [
				{
					col: 1,
					row: 3,
					length: 2,
				},
				{
					col: 3,
					row: 3,
					length: 1,
				},
			],
		},
		{
			code: "PHI3681",
			meetings: [
				{
					col: 0,
					row: 4,
					length: 1,
				},
				{
					col: 2,
					row: 4,
					length: 1,
				},
				{
					col: 4,
					row: 4,
					length: 1,
				},
			],
			
		},
	];

	const [grid, setGrid] = useState([]);
	const [classes] = useState(dummyClasses);
	const [credits, setCredits] = useState(0)

	useEffect(() => {
		const rows = [];
		for (var i = 0; i < rowCount; i++) {
			const row = [];
			for (var j = 0; j < colCount; j++) row.push({ isClass: false });
			rows.push(row);
		}

		var colorIndex = 0;
		let totalCredits = 0;
		classes.forEach((classItem) => {
			classItem.meetings.forEach((meetingItem) => {
				totalCredits += meetingItem.length;
				rows[meetingItem.row][meetingItem.col] = {
					isClass: true,
					color: Colors.classColors[colorIndex],
					code: classItem.code,
				};

				for (var i = 1; i < meetingItem.length; i++) {
					rows[meetingItem.row + i][meetingItem.col] = {
						isClass: true,
						color: Colors.classColors[colorIndex],
					};
				}
			});
			colorIndex++;
		});

		setGrid(rows);
		setCredits(totalCredits);
	}, [colCount, rowCount, classes]);

	return (
		<>
		<div style={{marginRight:"2%"}}>
			<p style={{whiteSpace: "nowrap"}}>Credits: {credits}</p>
		</div>
		<div style={{ display: "flex", flexDirection: "column", width: "100%"}}>
			<div className="grid w-full h-full relative" style={{ marginBottom: "3vh", height: "5vh", gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${1}, minmax(0, 1fr))`}}>
				<DaysBox/>
			</div>

			<div className="w-full h-full border border-slate-300 relative">
				{/* 
				There are TWO grids, one is a skeleton that creates the grid lines,
				the other is the grid actually containing the classes and their colored
				rectangles. This is done to achieve the visual effect of the grid lines
				behind the transparent class boxes.
				*/}
				<Grid grid={grid} colCount={colCount} rowCount={rowCount} isSkeleton={false} />
				<Grid grid={grid} colCount={colCount} rowCount={rowCount} isSkeleton={true} />
			</div>
		</div>
		</>
	);
};

Schedule.propTypes = {
	colCount: PropTypes.number.isRequired,
	rowCount: PropTypes.number.isRequired,
};

export default Schedule;
