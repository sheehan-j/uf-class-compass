import React from "react";
import PropTypes from "prop-types";

const MyScheduleBox = ({ schedule, selected, setActiveSchedule, onRemove }) => {
	const handleRemove = (event) => {
		event.stopPropagation();
		onRemove(name);
	};

	return (
		<div
			className={`w-full h-auto relative cursor-pointer border border-gray-400 flex items-center justify-between my-2 p-1 ${
				selected ? "bg-gray-300" : "bg-white"
			}`}
			onClick={() => setActiveSchedule(schedule)}
		>
			<p className="ml-2 text-gray-500">{schedule.name}</p>
			<button className="removeScheduleButton" onClick={handleRemove}>
				<img src="/minus.svg" />
			</button>
		</div>
	);
};

MyScheduleBox.propTypes = {
	schedule: PropTypes.object.isRequired,
	selected: PropTypes.bool.isRequired,
	setActiveSchedule: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
};

export default MyScheduleBox;
