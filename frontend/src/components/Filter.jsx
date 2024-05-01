import Dropdown from "react-multilevel-dropdown";
import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import ProfessorFilter from "./ProfessorFilter";
import CreditsFilter from "./CreditsFilter";
import LevelFilter from "./LevelFilter";
import MeetingFilter from "./MeetingFilter";
import BuildingFilter from "./BuildingFilter";

const Filter = ({ handleAddFilter, clearFilters }) => {
	const [activeItem, setActiveItem] = useState("Add Filter");

	return (
		<Dropdown
			position="right"
			title={"Add Filter"}
			className="w-auto text-white bg-customBlue hover:bg-customBlue-dark text-sm border border-gray-300 p-2 rounded"
		>
			<Dropdown.Item style={{ width: "120px", margin: "0" }}>
				{" "}
				{/* Adjusted width and removed padding/margin */}
				<ProfessorFilter eventKey="Professor" handleAddFilter={handleAddFilter} />
			</Dropdown.Item>
			<Dropdown.Item style={{ width: "120px", margin: "0" }}>
				<CreditsFilter eventKey="Credits" handleAddFilter={handleAddFilter} />
			</Dropdown.Item>
			<Dropdown.Item style={{ width: "120px", margin: "0" }}>
				<LevelFilter eventKey="Level" handleAddFilter={handleAddFilter} />
			</Dropdown.Item>
			<Dropdown.Item style={{ width: "120px", margin: "0" }}>
				<MeetingFilter eventKey="Meeting" handleAddFilter={handleAddFilter} />
			</Dropdown.Item>
			<Dropdown.Item style={{ width: "120px", margin: "0" }}>
				<BuildingFilter eventKey="Building" handleAddFilter={handleAddFilter} />
			</Dropdown.Item>
			<Dropdown.Item style={{ width: "auto", margin: "0" }} onClick={clearFilters}>
				Clear Filter
			</Dropdown.Item>
		</Dropdown>
	);
};

export default Filter;
