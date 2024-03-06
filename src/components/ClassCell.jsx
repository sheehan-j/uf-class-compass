import PropTypes from "prop-types";
import "../styles/ClassCell.css"

const ClassCell = ({ color, code, instructor, location }) => {
	return (
		<div
			className="z-10 p-1 flex box-content relative classCellWrapper"
			style={{ backgroundColor: color, borderWidth: "1px", borderColor: color }}
		>
			<div className="font-sans w-full">
				<div className="font-semibold">{code}</div>
				<div className="text-sm">{instructor}</div>
				<div className="text-sm absolute bottom-0 font-semibold">{location}</div>
			</div>
		</div>
	);
};

ClassCell.propTypes = {
	color: PropTypes.string.isRequired,
	code: PropTypes.string,
	instructor: PropTypes.string,
	location: PropTypes.string,
};

export default ClassCell;
