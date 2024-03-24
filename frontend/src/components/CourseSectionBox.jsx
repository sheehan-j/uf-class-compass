import PropTypes from "prop-types";

const CourseSectionBox = ({
	classItem,
	handleAddClass,
	activeSchedule,
	handleHoverClassStart,
	handleHoverClassEnd,
}) => {
	const addClass = (event) => {
		event.stopPropagation();
		handleAddClass(classItem);
	};

	return (
		<div
			className={`relative border border-gray-300 py-2 px-3 mb-1 flex items-center justify-between cursor-pointer bg-white`}
			onMouseEnter={() => handleHoverClassStart(classItem)}
			onMouseLeave={() => handleHoverClassEnd(classItem)}
		>
			<p className="text-sm">{`Class #${classItem.number}`}</p>
			<button style={{ width: "1.1rem" }} onClick={addClass}>
				{activeSchedule?.classes?.some(
					(activeScheduleClass) =>
						activeScheduleClass._id == classItem._id && activeScheduleClass?.muteInActiveCourses != true
				) ? (
					<img src="/check.svg" />
				) : (
					<img src="/add.svg" />
				)}
			</button>
		</div>
	);
};

CourseSectionBox.propType = {
	classItem: PropTypes.object.isRequired,
	handleAddClass: PropTypes.func.isRequired,
	activeSchedule: PropTypes.object.isRequired,
	handleHoverClassStart: PropTypes.func.isRequired,
	handleHoverClassEnd: PropTypes.func.isRequired,
};

export default CourseSectionBox;
