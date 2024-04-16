import PropTypes from "prop-types";

const CourseCodeButton = ({ section, active, handleCourseCodeButtonClicked, handleDeleteClass }) => {
	const deleteClass = (e) => {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		handleDeleteClass(section);
	};

	return (
		<div
			className={`relative border border-gray-300 py-2 px-3 mb-1 flex items-center justify-between cursor-pointer ${
				active ? "bg-gray-200" : "bg-white"
			}`}
			onClick={() => handleCourseCodeButtonClicked(section)}
		>
			<p className="text-sm">{section?.class.code}</p>
			<button style={{ width: "1.1rem" }} onClick={deleteClass}>
				<img src="/remove.svg" />
			</button>
		</div>
	);
};

CourseCodeButton.propTypes = {
	section: PropTypes.object.isRequired,
	active: PropTypes.bool.isRequired,
	handleCourseCodeButtonClicked: PropTypes.func.isRequired,
	handleDeleteClass: PropTypes.func.isRequired,
};

export default CourseCodeButton;
