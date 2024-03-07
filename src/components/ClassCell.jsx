import PropTypes from "prop-types";
import "../styles/ClassCell.css";
import { getPeriodTimes } from "../constants/BlockTimes";

const ClassCell = ({ cell }) => {
	console.log(cell);
	const { color, code, instructor, location, length, row } = cell;
	return (
		<div
			className="z-10 p-1.5 flex flex-col justify-between box-content relative classCellWrapper"
			style={{ backgroundColor: color, borderWidth: "1px", borderColor: color }}
		>
			<div>
				<div className="font-semibold" style={{ fontSize: "1.05rem", lineHeight: "1.1rem" }}>
					{code}
				</div>
				<div style={{ fontSize: "0.9rem" }}>{instructor}</div>
			</div>
			<div style={{ fontSize: "0.9rem", lineHeight: "1.2rem" }}>
				{length && (
					<div>
						{getPeriodTimes(row).start}-{getPeriodTimes(row + length - 1).end}
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
};

export default ClassCell;
