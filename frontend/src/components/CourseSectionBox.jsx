import PropTypes from "prop-types";

const CourseSectionBox = ({ classItem }) => {
	return (
		<div
			className={`relative border border-gray-300 py-2 px-3 mb-1 flex items-center justify-between cursor-pointer bg-white`}
		>
			<p className="text-sm">{`Class #${classItem.number}`}</p>
			<button style={{ width: "1.1rem" }}>
				<img src="/add.svg" />
			</button>
		</div>
	);
};
CourseSectionBox.propType = {
	classItem: PropTypes.object.isRequired,
};

export default CourseSectionBox;
