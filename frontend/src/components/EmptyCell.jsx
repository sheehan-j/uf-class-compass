import PropTypes from "prop-types";

const EmptyCell = ({ hasBorder }) => {
	const classes = hasBorder ? "border border-slate-200" : "border border-transparent";
	return <div className={classes}></div>;
};

EmptyCell.propTypes = {
	hasBorder: PropTypes.bool.isRequired,
};

export default EmptyCell;
