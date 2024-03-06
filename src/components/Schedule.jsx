import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import Colors from "../constants/Colors";
import DaysBox from "./DaysBox"
import {Days} from "../constants/Days"
import {getPeriodTimes } from "../constants/BlockTimes";

const Schedule = ({ colCount, maxRowCount }) => {
	const dummyClasses = [
		{
			instructor: "Albert Ritzhaupt",
			code: "CIS4930",
			meetings: [
				{
					col: Days.Monday,
					row: 1, //TODO figure out if we want to zero index?
					length: 1,
					location: "FLG 0260"
				},
				{
					col: Days.Wednesday,
					row: 3,
					length: 1,
					location: "FLG 0230"
				},
				{
					col: Days.Friday,
					row: 3,
					length: 1,
					location: "FLG 0260"
				},
			],
		},
		{
			instructor: "Alexander Gomes",
			code: "COP4600",
			meetings: [
				{
					col: Days.Tuesday,
					row: 4,
					length: 2,
					location: "CAR 0100"
				},
				{
					col: Days.Thursday,
					row: 4,
					length: 1,
					location: "CAR 0100"
				},
			],
		},
		{
			instructor: "David Wright",
			code: "PHI3681",
			meetings: [
				{
					col: Days.Monday,
					row: 5,
					length: 1,
					location: "Online"
				},
				{
					col: Days.Wednesday,
					row: 5,
					length: 1,
					location: "Online"
				},
				{
					col: Days.Friday,
					row: 6,
					length: 1,
					location: "Online"
				},
			],
			
		},
	];

	const [grid, setGrid] = useState([]);
	const [classes] = useState(dummyClasses);
	const [credits, setCredits] = useState(0)
	const [newRowCount, setRowCount] = useState(maxRowCount)

	useEffect(() => {
		const rows = [];
		for (var i = 0; i < maxRowCount; i++) {
			const row = [];
			for (var j = 0; j < colCount; j++) row.push({ isClass: false, row: i+1 });
			rows.push(row);
		}

		var colorIndex = 0;
		let totalCredits = 0;
		classes.forEach((classItem) => {
			classItem.meetings.forEach((meetingItem) => {
				totalCredits += meetingItem.length;
				rows[meetingItem.row][meetingItem.col] = {
					row: meetingItem.row+1,
					instructor: classItem.instructor,
					isClass: true,
					color: Colors.classColors[colorIndex],
					code: classItem.code,
					location: meetingItem.location,
					length: meetingItem.length,
				};

				for (var i = 1; i < meetingItem.length; i++) {
					rows[meetingItem.row + i][meetingItem.col] = {
						row: meetingItem.row+1,
						isClass: true,
						color: Colors.classColors[colorIndex],
					};
				}
			});
			colorIndex++;
		});

		while (rows.length > 1 && !rows[0].some(cell => cell.isClass) && !rows[1].some(cell => cell.isClass)) {
			rows.shift();
		}

		while (rows.length > 1 && !rows[rows.length-1].some(cell => cell.isClass) && !rows[rows.length-2].some(cell => cell.isClass)) {
			rows.pop();
		}
		
		setRowCount(rows.length);
		setGrid(rows);
		setCredits(totalCredits);
	}, [colCount, maxRowCount, classes]);

	return (
		<>
		<div style={{gap:"3%", display: "flex", flexDirection:"column", height: "100%", marginRight:"2%", width: "10%"}}>
			<div className="font-medium" style={{ height:"5%", whiteSpace: "nowrap",  marginBottom: "5%", display: "flex", justifyContent: "center",alignItems: "center"}}>
				CREDITS: {credits}
			</div>
			<div className="h-full" style={{display:"flex", flexDirection:"column"}}>
				{grid.map((row) => (
					<div className="relative" style={{display: 'flex', alignItems: "center",height: '100%' }}>
						<div className="left-5 top-0 italic absolute" style={{ whiteSpace: "nowrap", fontSize: "0.9em", height:"100%"}}>
							{getPeriodTimes(row[0].row).start}
						</div>
						<div style={{flex: "1", display: 'flex', justifyContent: 'right', alignItems: 'center', height: '100%'}}>
							{row[0].row}
						</div>
					</div>
				))}
			</div>
		</div>

		<div style={{ height: "100%", display: "flex", flexDirection: "column", width: "100%"}}>
			<div className="grid w-full relative" style={{ marginBottom: "3%", height: "5%", gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${1}, minmax(0, 1fr))`}}>
				<DaysBox/>
			</div>

			<div className="w-full h-full border border-slate-300 relative">
				{/* 
				There are TWO grids, one is a skeleton that creates the grid lines,
				the other is the grid actually containing the classes and their colored
				rectangles. This is done to achieve the visual effect of the grid lines
				behind the transparent class boxes.
				*/}
				<Grid key={"skeletonGrid"} grid={grid} colCount={colCount} rowCount={newRowCount} isSkeleton={false} />
				<Grid key={"coloredGrid"} grid={grid} colCount={colCount} rowCount={newRowCount} isSkeleton={true} />
			</div>
		</div>
		</>
	);
};

Schedule.propTypes = {
	colCount: PropTypes.number.isRequired,
	maxRowCount: PropTypes.number.isRequired,
};

export default Schedule;
