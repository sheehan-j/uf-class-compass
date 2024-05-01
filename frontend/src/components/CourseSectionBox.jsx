import PropTypes from "prop-types";

const CourseSectionBox = ({
	section,
	handleAddSection,
	activeSchedule,
	handleHoverSectionStart,
	handleHoverSectionEnd,
}) => {
	const addClass = (event) => {
		event.stopPropagation();
		handleAddSection(section);
	};

	return (
		// Use a wrapper around the main element with padding so there is a visual gap between the boxes, but there is no
		// actual gap in between each box. This avoids a flicker effect when you move your mouse down each of the course section
		// boxes because of the small gap in between each box where you wouldn't be hovering over anything if margin was used
		<div
			className={`pb-1 ${section?.conflicts?.length > 0 ? "opacity-90" : ""}`}
			onMouseEnter={() => handleHoverSectionStart(section)}
			onMouseLeave={() => handleHoverSectionEnd()}
		>
			<div
				className={`relative border border-gray-300 py-2 px-3 cursor-pointer bg-white ${
					section?.conflicts?.length > 0 ? "cursor-not-allowed" : ""
				}`}
				onClick={section.conflicts.length === 0 ? addClass : null}
			>
				<div
					className={`flex items-center justify-between ${
						section?.conflicts?.length > 0 ? "line-through" : ""
					}`}
				>
					<p className="text-sm">{`Class #${section.number}`}</p>
					{section?.conflicts?.length == 0 && (
						<button style={{ width: "1.1rem" }}>
							{activeSchedule?.sections?.some(
								(activeScheduleClass) =>
									activeScheduleClass._id == section._id &&
									activeScheduleClass?.muteInActiveCourses != true
							) ? (
								<img src="/check.svg" />
							) : (
								<img src="/add.svg" />
							)}
						</button>
					)}
				</div>
				{section?.conflicts?.length > 0 && (
					<div className={`flex items-center justify-between text-sm italic text-gray-600`}>
						Conflicts: {section.conflicts.join(", ")}
					</div>
				)}
			</div>
		</div>
	);
};

CourseSectionBox.propType = {
	section: PropTypes.object.isRequired,
	handleAddSection: PropTypes.func.isRequired,
	activeSchedule: PropTypes.object.isRequired,
	handleHoverSectionStart: PropTypes.func.isRequired,
	handleHoverSectionEnd: PropTypes.func.isRequired,
};

export default CourseSectionBox;
