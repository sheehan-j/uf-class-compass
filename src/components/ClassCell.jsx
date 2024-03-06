import PropTypes from "prop-types";
import "../styles/ClassCell.css"
import { getPeriodTimes } from "../constants/BlockTimes";

const ClassCell = ({ cell }) => {
	const { color, code, instructor, location, length, row } = cell;
	return (
		<div
			className="z-10 p-1 flex box-content relative classCellWrapper"
			style={{ backgroundColor: color, borderWidth: "1px", borderColor: color }}
		>
			<div className="font-sans w-full">
				<div className="font-semibold">{code}</div>
				<div className="text-sm">{instructor}</div>
				<div className="text-sm absolute bottom-0">
					{length && (
						<div>
							{getPeriodTimes(row).start}-{getPeriodTimes(row+length-1).end}
						</div>
					)}
					<div className="font-semibold">{location}</div>
				</div>
			</div>
		</div>
	);
};

ClassCell.propTypes = {
	cell: PropTypes.shape({
        color: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        instructor: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
		length: PropTypes.number.isRequired,
		row: PropTypes.number.isRequired,
    }).isRequired,
};

export default ClassCell;
