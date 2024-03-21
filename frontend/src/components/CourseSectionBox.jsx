import PropTypes from "prop-types";

const CourseSectionBox = ({name})  => {
    return (
        <div className="courseSectionBox w-full h-10 relative border border-gray-300 flex items-center mb-2 bg-white">
            <p className="ml-2 text-gray-500">{name}</p>
            <button className="addSectionButton absolute right-0 w-6 h-full hover:bg-gray-400"><img src="/add.svg"/></button>
        </div>
    )
}
CourseSectionBox.propType = {
    name: PropTypes.string.isRequired,
}

export default CourseSectionBox;