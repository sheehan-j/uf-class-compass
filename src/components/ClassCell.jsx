import PropTypes from "prop-types";
import "../styles/ClassCell.css"
import { getPeriodTimes } from "../constants/BlockTimes";

const ClassCell = ({cell}) => {
	console.log(cell)
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
        color: PropTypes.string,
        code: PropTypes.string,
        instructor: PropTypes.string,
        location: PropTypes.string,
		length: PropTypes.number,
		row: PropTypes.number,
    }).isRequired,
};

export default ClassCell;
