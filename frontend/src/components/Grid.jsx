import PropTypes from "prop-types";
import EmptyCell from "./EmptyCell";
import ClassCell from "./ClassCell";
import React, { useState, useEffect } from "react";

const Grid = ({ grid, colCount, rowCount, isSkeleton, isClassClicked, setIsClassClicked, setCell }) => {
    const handleCellClick = (cell) => {
		setIsClassClicked(true);
		setCell(cell);
    };

    const [cellHeight, setCellHeight] = useState('5rem');

    useEffect(() => {
        const updateCellHeight = () => {
            if (window.matchMedia("(max-width: 640px)").matches) {
                setCellHeight('3rem');
            } else {
                setCellHeight('5rem');
            }
        };

        updateCellHeight();
        window.addEventListener('resize', updateCellHeight);

        return () => {
            window.removeEventListener('resize', updateCellHeight);
        };
    }, []);


    return (
        <div
            className="grid w-full h-full"
            style={{
                gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rowCount}, minmax(${cellHeight}, 1fr))`,
                position: isSkeleton ? "absolute" : "relative",
                top: 0,
                left: 0,
            }}
        >
            {grid.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    {row.map((cell, colIndex) =>
                        // If this grid is a skeleton, only draw empty cells with borders
                        isSkeleton ? (
                            <EmptyCell key={colIndex} hasBorder={true} />
                        ) : // If this grid is not a skeleton, draw a class cell if this cell is a class.
                        // Otherwise, draw an empty cell without a border to act as a spacer
                        cell.isClass ? (
                            <ClassCell
                                key={colIndex}
                                cell={cell}
                                onCellClick={() => handleCellClick(cell)}
                            />
                        ) : (
                            <EmptyCell key={colIndex} hasBorder={false} />
                        )
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

Grid.propTypes = {
    colCount: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired,
    grid: PropTypes.array.isRequired,
    isSkeleton: PropTypes.bool.isRequired,
	isClassClicked: PropTypes.bool,
	setIsClassClicked: PropTypes.func,
	setCell: PropTypes.func,
};

export default Grid;
