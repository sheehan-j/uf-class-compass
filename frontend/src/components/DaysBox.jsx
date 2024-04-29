import { Days, getDayString } from "../constants/Days";
import { useState, useEffect } from "react";
const DaysBox = () => {
	const [isMobileScreen, setIsMobileScreen] = useState(window.matchMedia("(max-width: 640px)").matches);

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
					className={`flex justify-center items-center h-full w-full bg-customGray text-[#8F8F8F] border border-solid border-[#DEDEDE] ${
						isMobileScreen ? "rounded-l" : "rounded-3xl"
					}`}
				>
					{!isMobileScreen ? getDayString(day) : getDayString(day).charAt(0)}
				</div>
			))}
		</>
	);
};

export default DaysBox;
