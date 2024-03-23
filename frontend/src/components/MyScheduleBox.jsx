import React from "react";
import PropTypes from "prop-types";

const MyScheduleBox = ({ name, onSelect, selected, onRemove }) => {
	const handleClick = () => {
		onSelect(name);
	};

	const handleRemove = (event) => {
		event.stopPropagation();
		onRemove(name);
	};

	return (
		<div
			className={`w-full h-auto relative cursor-pointer border border-gray-400 flex items-center justify-between my-2 p-1 ${
				selected ? "bg-gray-300" : "bg-white"
			}`}
			onClick={handleClick}
		>
			<p className="ml-2 text-gray-500">{name}</p>
			<button className="removeScheduleButton" onClick={handleRemove}>
				<img src="/minus.svg" />
			</button>
		</div>
	);
};

MyScheduleBox.propTypes = {
	name: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
	selected: PropTypes.bool.isRequired,
	onRemove: PropTypes.func.isRequired,
};

export default MyScheduleBox;
