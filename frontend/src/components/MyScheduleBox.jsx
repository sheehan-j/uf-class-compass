import React from "react";
import PropTypes from "prop-types";
import StyleColors from "../constants/StyleColors";

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
            style={{backgroundColor: selected ? StyleColors.blue : "white", color: selected ? "white" : "black"}}
            className={`courseSectionBox w-full h-9 relative cursor-pointer border border-gray-400 flex items-center mb-2 `}
            onClick={handleClick}
        >
            <p className="ml-2">{name}</p>
            <button className="removeScheduleButton absolute right-0 w-6 h-full hover:bg-gray-400" onClick={handleRemove}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke={selected ? "white" : "#7E869E"} stroke-opacity="0.25" stroke-width="1.2"/>
                <path d="M7.5 12H16.5" stroke={selected ? "white" : "#222222"} stroke-width="1.2"/>
            </svg>
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
