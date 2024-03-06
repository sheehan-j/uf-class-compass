import React from 'react';
import {Days, getDayString} from "../constants/Days";

const DaysBox = () => {
    const currentDate = new Date().getDay() - 1; // Adjusting for Monday start

    // Convert enum to an array of day names
    const daysArray = Object.keys(Days).map(key => Days[key]);

    return (
        <>
            {daysArray.map((day, index) => (
                <div
                    key={"dayWrapper" + index}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: index === currentDate ? "rgb(30,144,255)" : "rgba(135, 135, 135, 0.5)",
                        color: index === currentDate ? "white" : "black",
                        border: "2px solid gray",
                        borderRadius: "20% / 100%",
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
