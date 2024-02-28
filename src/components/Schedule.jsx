import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import Colors from "../constants/Colors";

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
					length: 3,
				},
			],
		},
		{
			code: "PHI3681",
			meetings: [
				{
					col: 2,
					row: 4,
					length: 3,
				},
			],
		},
	];

	const [grid, setGrid] = useState([]);
	const [classes] = useState(dummyClasses);

	useEffect(() => {
		const rows = [];
		for (var i = 0; i < rowCount; i++) {
			const row = [];
			for (var j = 0; j < colCount; j++) row.push({ isClass: false });
			rows.push(row);
		}

		var colorIndex = 0;
		classes.forEach((classItem) => {
			classItem.meetings.forEach((meetingItem) => {
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
	}, [colCount, rowCount, classes]);

	return (
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
	);
};

Schedule.propTypes = {
	colCount: PropTypes.number.isRequired,
	rowCount: PropTypes.number.isRequired,
};

export default Schedule;
