import PropTypes from "prop-types";
import { getPeriodTimes } from "../constants/BlockTimes";
import { useRef, useState } from "react";

const ClassCell = ({ cell, onCellClick }) => {
	const { color, code, instructor, location, length, period } = cell;

	const cellRef = useRef(null);

	const clickClass = () => {
        onCellClick();
    };
	return (
		<div
			ref={cellRef}
			className="overflow-hidden sm:overflow-auto z-10 p-1.5 flex flex-col justify-between box-content relative"
			style={{ backgroundColor: color, borderWidth: "1px", borderColor: color, cursor: "pointer" }}
			onClick={clickClass}
		>
			<div>
				<div className="font-semibold" style={{ fontSize: "1.05rem", lineHeight: "1.1rem" }}>
					{code}
				</div>
				<div className="hidden sm:block" style={{ fontSize: "0.9rem" }}>{instructor}</div>
			</div>
			<div className="whitespace-normal break-words" style={{ fontSize: "0.9rem", lineHeight: "1.2rem" }}>
			{length  &&(
				<div >
					<span className="block sm:hidden">{getPeriodTimes(period).start}</span>
					<span className="hidden sm:block">{getPeriodTimes(period).start} - {getPeriodTimes((period + length - 1)).end}</span>
				</div>
				
			)}
				<div className="font-semibold">{location}</div>
			</div>
		</div>
	);
};

ClassCell.propTypes = {
	cell: PropTypes.shape({
		color: PropTypes.string,
		code: PropTypes.string,
		instructor: PropTypes.string,
		location: PropTypes.string,
		length: PropTypes.number,
		row: PropTypes.number,
	}).isRequired,
	onCellClick: PropTypes.func.isRequired, 
};

export default ClassCell;
