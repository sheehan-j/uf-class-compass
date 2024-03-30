import PropTypes from "prop-types";
import EmptyCell from "./EmptyCell";
import ClassCell from "./ClassCell";
import { Fragment } from "react";

const Grid = ({ grid, colCount, rowCount, isSkeleton }) => {
	return (
		<div
			className="grid w-full h-full"
			style={{
				gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
				gridTemplateRows: `repeat(${rowCount}, minmax(7rem, 1fr))`,
				position: isSkeleton ? "absolute" : "relative",
				top: 0,
				left: 0,
			}}
		>
			{grid.map((row, rowIndex) => (
				<Fragment key={rowIndex}>
					{row.map((cell, colIndex) =>
						// If this grid is a skeleton, only draw empty cells with borders
						isSkeleton ? (
							<EmptyCell key={rowIndex * colCount + colIndex} hasBorder={true} />
						) : // If this grid is not a skeleton, draw a class cell if this cell is a class.
						// Otherwise, draw an empty cell without a border to act as a spacer
						cell.isClass ? (
							<ClassCell key={rowIndex * colCount + colIndex} cell={cell} />
						) : (
							<EmptyCell key={rowIndex * colCount + colIndex} hasBorder={false} />
						)
					)}
				</Fragment>
			))}
		</div>
	);
};

Grid.propTypes = {
	colCount: PropTypes.number.isRequired,
	rowCount: PropTypes.number.isRequired,
	grid: PropTypes.array.isRequired,
	isSkeleton: PropTypes.bool.isRequired,
};

export default Grid;
