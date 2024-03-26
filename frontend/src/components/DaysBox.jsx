import { Days, getDayString } from "../constants/Days";
import StyleColors from "../constants/StyleColors";

const DaysBox = () => {
	const currentDate = new Date().getDay() - 1; // Adjusting for Monday start

	// Convert enum to an array of day names
	const daysArray = Object.keys(Days).map((key) => Days[key]);

	return (
		<>
			{daysArray.map((day, index) => (
				<div
					key={"dayWrapper" + index}
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: index === currentDate ? `${StyleColors.blue}` : `${StyleColors.gray}`,
						color: index === currentDate ? "white" : "#8F8F8F",
						border: index === currentDate ? "none" : "2px solid #DEDEDE",
						borderRadius: "1000px",
						width: "100%",
						height: "100%",
					}}
				>
					{getDayString(day)}
				</div>
			))}
		</>
	);
};

export default DaysBox;
