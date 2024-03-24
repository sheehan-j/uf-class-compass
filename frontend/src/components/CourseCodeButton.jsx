import PropTypes from "prop-types";

const CourseCodeButton = ({ classItem, active, setActiveClass, handleDeleteClass }) => {
	const deleteClass = (e) => {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		handleDeleteClass(classItem);
	};

	return (
		<div
			className={`relative border border-gray-300 py-2 px-3 mb-1 flex items-center justify-between cursor-pointer ${
				active ? "bg-gray-200" : "bg-white"
			}`}
			onClick={() => setActiveClass(classItem)}
		>
			<p className="text-sm">{classItem.code}</p>
			<button style={{ width: "1.1rem" }} onClick={deleteClass}>
				<img src="/remove.svg" />
			</button>
		</div>
	);
};

CourseCodeButton.propTypes = {
	classItem: PropTypes.object.isRequired,
	active: PropTypes.bool.isRequired,
	setActiveClass: PropTypes.func.isRequired,
	handleDeleteClass: PropTypes.func.isRequired,
};

export default CourseCodeButton;
