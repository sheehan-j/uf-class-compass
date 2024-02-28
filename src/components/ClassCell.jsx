import PropTypes from "prop-types";

const ClassCell = ({ color, code }) => {
	return (
		<div
			className="z-10 p-1 flex box-content"
			style={{ backgroundColor: color, borderWidth: "1px", borderColor: color }}
		>
			<div className="font-sans font-semibold w-full">{code}</div>
		</div>
	);
};

ClassCell.propTypes = {
	color: PropTypes.string.isRequired,
	code: PropTypes.string,
};

export default ClassCell;
