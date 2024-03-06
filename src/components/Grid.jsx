import PropTypes from "prop-types";
import EmptyCell from "./EmptyCell";
import ClassCell from "./ClassCell";

const Grid = ({ grid, colCount, rowCount, isSkeleton }) => {
	return (
		<div
			className="grid w-full h-full absolute"
			style={{
				gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
				gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
			}}
		>
			{grid.map((row, rowIndex) => (
				<>
					{row.map((cell, colIndex) =>
						// If this grid is a skeleton, only draw empty cells with borders
						isSkeleton ? (
							 <EmptyCell key={rowIndex * colCount + colIndex} hasBorder={true} />
						) : // If this grid is not a skeleton, draw a class cell if this cell is a class.
						// Otherwise, draw an empty cell without a border to act as a spacer
						cell.isClass ? (
							<ClassCell key={rowIndex * colCount + colIndex} color={cell.color} code={cell.code} instructor={cell.instructor} location={cell.location}/>
						) : (
							<EmptyCell key={rowIndex * colCount + colIndex} hasBorder={false} />
						)
					)}
				</>
			))}
		</div>
	);
};

Grid.propTypes = {
	colCount: PropTypes.number.isRequired,
	rowCount: PropTypes.number.isRequired,
	grid: PropTypes.array.isRequired,
	isSkeleton: PropTypes.bool.isRe,
};

export default Grid;
