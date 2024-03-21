import PropTypes from "prop-types";

const CourseCodeButton = ({name}) => {
    return (
        <div className="relative border border-gray-300 py-2 px-2 flex items-center" style={{borderRadius:"1000px", width: "auto"}}>
             <p className="text-sm" style={{width: "80%"}}>{name}</p>
            <button style={{width: "20%"}}><img src="/remove.svg"/></button>
        </div>
    )
}

CourseCodeButton.propTypes = {
    name: PropTypes.string.isRequired
}

export default CourseCodeButton;