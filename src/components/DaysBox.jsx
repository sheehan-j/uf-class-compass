import React from 'react';
import Days from "../constants/Days";

const DaysBox = () => {
    const currentDate = new Date().getDay() -  1; //our days start on Monday not sunday so subtract 1 since getDay is enum
    
    return (
        <>
            {Days.map((day, index) => (
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
                        height: "100%"
                    }}
                >
                    {day}
                </div>
            ))}
        </>
    );
};

export default DaysBox;
