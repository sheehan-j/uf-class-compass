import { Days, getDayString } from "../constants/Days";
import StyleColors from "../constants/StyleColors";
import { useState, useEffect } from "react";
const DaysBox = () => {
	const currentDate = new Date().getDay() - 1; // Adjusting for Monday start
	const [isMobileScreen, setIsMobileScreen] = useState(window.matchMedia("(max-width: 640px)").matches)

	useEffect(() => {
		const handleResize = () => {
		  setIsMobileScreen(window.matchMedia("(max-width: 640px)").matches);
		};
	
		window.addEventListener("resize", handleResize);
	
		return () => {
		  window.removeEventListener("resize", handleResize);
		};
	  }, []);
	
	// Convert enum to an array of day names
	const daysArray = Object.keys(Days).map((key) => Days[key]);

	return (
		<>
			{daysArray.map((day, index) => (
				<div
					key={"dayWrapper" + index}
					className={`${isMobileScreen ? "rounded-l" : "rounded-3xl"}`}
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: index === currentDate ? `${StyleColors.blue}` : `${StyleColors.gray}`,
						color: index === currentDate ? "white" : "#8F8F8F",
						border: index === currentDate ? "none" : "2px solid #DEDEDE",
						width: "100%",
						height: "100%",
					}}
				>
					{!isMobileScreen ? getDayString(day) : getDayString(day).charAt(0)}
				</div>
			))}
		</>
	);
};

export default DaysBox;
