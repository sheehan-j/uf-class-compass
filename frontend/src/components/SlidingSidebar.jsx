import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import StyleColors from "../constants/StyleColors";

const SlidingSidebar = ({ isClassClicked, setIsClassClicked, cell }) => {
	const handleMinimize = () => {
		setIsClassClicked(false);
	};
	return (
		<div
			style={{
				transition: "right 0.3s linear",
				right: isClassClicked ? "0" : "-100%",
			}}
			className="min-w-fit z-40 absolute top-0 h-full text-black bg-customGray"
		>
			<div className="sticky p-5 top-0 overflow-auto">
			<div className="absolute left-2 top-2" onClick={handleMinimize}>
				<img src="/remove.svg" />
			</div>
			<div className="flex justify-center">
				<b>{cell?.code}</b>
			</div>

			{/* GET CLASS DATES */}

			<div className="relative flex mb-1 grid grid-cols-2">
				<div>INSTRUCTOR</div>
				<div>
					<b>{cell?.instructor?.toUpperCase()}</b>
				</div>
			</div>

			<div className="relative flex mb-1 grid grid-cols-2">
				<div>CREDITS </div>
				<div>
					<b>3</b>
				</div>
			</div>

			<div className="relative flex mb-1 grid grid-cols-2">
				<div>FINAL EXAM</div>
				<div className="text-sm">
					<b>5/22/2024</b>
				</div>
			</div>

			<div className="relative flex mb-1 grid grid-cols-2">
				<div>LOCATION</div>
				<div>
					<b>{cell?.location}</b>
				</div>
			</div>

			<div className="relative flex mb-1 grid grid-cols-2">
				<div>CLASS DATES</div>
				<div className="text-sm">
					<b>1/08/2024-04/24/2024</b>
				</div>
			</div>

			<div className="flex w-full justify-between my-5">
				<button className="p-2 text-white rounded-md" style={{ backgroundColor: StyleColors.blue }}>
					<span className="block">PROFESSOR</span>
					<span className="block">INFO</span>
				</button>
				<button className="p-2 text-white rounded-md" style={{ backgroundColor: StyleColors.blue }}>
					<span className="block">TEXTBOOK</span>
					<span className="block">LOOKUP</span>
				</button>
			</div>
			</div>
		</div>
	);
};

SlidingSidebar.propTypes = {
	isClassClicked: PropTypes.bool.isRequired,
	setIsClassClicked: PropTypes.func.isRequired,
};

export default SlidingSidebar;
