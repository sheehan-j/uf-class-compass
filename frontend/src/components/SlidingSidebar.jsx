import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import StyleColors from "../constants/StyleColors";

const SlidingSidebar = ({ isClassClicked, setIsClassClicked,  cell }) => {
    if (!cell || !cell.instructor) {
        return null;
    }
    const handleMinimize = () => {
        setIsClassClicked(false);
    }
    return (
        <div
            style={{
                backgroundColor: StyleColors.gray,
                transition: "right 0.3s ease",
                right: isClassClicked ? "0" : "-100%",
                maxWidth: "25%",
            }}
            className="z-50 top-0 w-full h-full p-5 text-black absolute right-0 overflow-y-auto"
        >
            <div className="absolute right-5" onClick={handleMinimize}>
                <img src="/remove.svg" />
            </div>
             <div className="flex justify-center">
            <b>{cell.code}</b>
            </div>

            <div>
                <b>CLASS</b>
            </div>

            {/* GET CLASS DATES */}

            <div className="relative flex mb-1">
                <div style={{ width: '50%' }}>INSTRUCTOR</div>
                <div style={{ width: '50%' }}><b>{cell.instructor.toUpperCase()}</b></div>
            </div>

            <div className="relative flex mb-1">
                <div style={{ width: '50%' }}>CREDITS </div> 
                <div style={{ width: '50%' }}><b>3</b></div> {/*HARD CODED*/}
            </div>

            <div className="relative flex mb-1" >
                <div style={{ width: '50%' }}>FINAL EXAM</div>
                <div className="text-sm" style={{ width: '50%' }}><b>5/22/2024</b></div> {/*HARD CODED*/}
            </div>

            <div className="relative flex mb-1" >
                <div style={{ width: '50%' }}>LOCATION</div>
                <div style={{ width: '50%' }}><b>{cell.location}</b></div>
            </div>

            <div className="relative flex mb-1">
                <div style={{ width: '50%' }}>CLASS DATES</div>
                <div className="text-sm" style={{ width: '50%' }}><b>1/08/2024-04/24/2024</b></div> {/*HARD CODED*/}
            </div>

            <div className="flex justify-between my-5 gap-5">
                <button className="p-2 text-white rounded-md" style={{backgroundColor: StyleColors.blue}}>
                    <span style={{ display: 'block' }}>PROFESSOR</span>
                    <span style={{ display: 'block' }}>INFO</span>
                </button>
                <button className="p-2 text-white rounded-md" style={{backgroundColor: StyleColors.blue}}>
                    <span style={{ display: 'block' }}>TEXTBOOK</span>
                    <span style={{ display: 'block' }}>LOOKUP</span>
                </button>
            </div>

        </div>
    );
};

SlidingSidebar.propTypes = {
	isClassClicked: PropTypes.bool.isRequired,
    setIsClassClicked: PropTypes.func.isRequired
};

export default SlidingSidebar;
