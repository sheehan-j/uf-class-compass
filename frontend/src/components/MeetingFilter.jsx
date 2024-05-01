import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import Dropdown from "react-multilevel-dropdown";
import { getPeriodLabel } from "../constants/Periods";

const MeetingFilter = ({ handleAddFilter }) => {
	const [value, setValue] = useState([1, 14]);
	const [selectedDays, setSelectedDays] = useState([]);

	const handleFilterSelection = (eventKey) => {
		const newKey = "Building: " + eventKey;
		onSelect(newKey);
	};

	const handleDayChange = (e) => {
		const day = e.target.value;
		const updatedSelectedDays = selectedDays.includes(day)
			? selectedDays.filter((d) => d !== day)
			: [...selectedDays, day].sort((a, b) => {
					const daysOfWeekOrder = ["M", "T", "W", "R", "F"];
					return daysOfWeekOrder.indexOf(a) - daysOfWeekOrder.indexOf(b);
			  });

		console.log(updatedSelectedDays);
		setSelectedDays(updatedSelectedDays);
		// onSelect(`Days: ${updatedSelectedDays.join(", ")} - Period: ${value[0]}-${value[1]}`);
		handleAddFilter("Days", updatedSelectedDays);
	};

	const handleSliderChange = (newValue) => {
		setValue(newValue);
		// onSelect(`Days: ${selectedDays.join(", ")} - Period: ${newValue[0]}-${newValue[1]}`);
		// handleAddFilter("Period Start", newValue[0]);
		// handleAddFilter("Period End", newValue[1]);
		handleAddFilter("Periods", [...newValue]);
	};

	const daysOfWeek = ["M", "T", "W", "R", "F"];

	return (
		<>
			Day and Time
			{/* <span style={{padding: '0px 10px 0px 21px'}}>&#x25B8;</span> */}
			<Dropdown.Submenu position="right" style={{ minWidth: "200px", padding: "0.5rem" }}>
				<div className="flex justify-between">
					{daysOfWeek.map((day, index) => (
						<div
							key={day}
							style={{
								display: "inline-block",
							}}
						>
							<input
								type="checkbox"
								id={`day-${day}`}
								value={day}
								checked={selectedDays.includes(day)}
								onChange={handleDayChange}
								style={{ display: "none" }}
							/>
							<label
								htmlFor={`day-${day}`}
								style={{
									display: "inline-block",
									width: "30px",
									height: "30px",
									borderRadius: "5px",
									background: selectedDays.includes(day) ? "#007bff" : "#fff",
									color: selectedDays.includes(day) ? "#fff" : "#000",
									textAlign: "center",
									lineHeight: "30px",
									cursor: "pointer",
								}}
							>
								{day}
							</label>
						</div>
					))}
				</div>
				<div className="flex mt-3 justify-between items-center p-2">
					<div className="mr-2 text-black">
						Period {getPeriodLabel(value[0])}-{getPeriodLabel(value[1])}
					</div>
					<RangeSlider min={1} max={14} step={1} value={value} onInput={handleSliderChange} />
				</div>
			</Dropdown.Submenu>
		</>
	);
};

export default MeetingFilter;
