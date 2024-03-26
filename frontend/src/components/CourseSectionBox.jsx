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
		// Use a wrapper around the main element with padding so there is a visual gap between the boxes, but there is no
		// actual gap in between each box. This avoids a flicker effect when you move your mouse down each of the course section
		// boxes because of the small gap in between each box where you wouldn't be hovering over anything if margin was used
		<div
			className={`pb-1 ${classItem?.conflicts?.length > 0 ? "opacity-90" : ""}`}
			onMouseEnter={() => handleHoverClassStart(classItem)}
			onMouseLeave={() => handleHoverClassEnd()}
		>
			<div
				className={`relative border border-gray-300 py-2 px-3 cursor-pointer bg-white ${
					classItem?.conflicts?.length > 0 ? "cursor-not-allowed" : ""
				}`}
			>
				<div
					className={`flex items-center justify-between ${
						classItem?.conflicts?.length > 0 ? "line-through" : ""
					}`}
				>
					<p className="text-sm">{`Class #${classItem.number}`}</p>
					{classItem?.conflicts?.length == 0 && (
						<button style={{ width: "1.1rem" }} onClick={addClass}>
							{activeSchedule?.classes?.some(
								(activeScheduleClass) =>
									activeScheduleClass._id == classItem._id &&
									activeScheduleClass?.muteInActiveCourses != true
							) ? (
								<img src="/check.svg" />
							) : (
								<img src="/add.svg" />
							)}
						</button>
					)}
				</div>
				{classItem?.conflicts?.length > 0 && (
					<div className={`flex items-center justify-between text-sm italic text-gray-600`}>
						Conflicts: {classItem.conflicts.join(", ")}
					</div>
				)}
			</div>
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
