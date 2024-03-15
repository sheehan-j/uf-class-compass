import React, { useState } from "react";
import MyScheduleBox from "./MyScheduleBox";

const MySchedules = () => {
    const [selectedSchedule, setSelectedSchedule] = useState("Schedule 1");
    const [scheduleNames, setScheduleNames] = useState(["Schedule 1"]);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleScheduleSelect = (name) => {
        setSelectedSchedule(name);
    };

    const handleNewSchedule = () => {
        const nextSchedule = `Schedule ${scheduleNames.length + 1}`;
        setSelectedSchedule(nextSchedule);
        setScheduleNames([...scheduleNames, nextSchedule]);
    };

    const handleRemoveSchedule = (nameToRemove) => {
        const indexToRemove = scheduleNames.indexOf(nameToRemove);
        if (indexToRemove !== -1 && scheduleNames.length !== 1) {
            setScheduleNames(prevNames => prevNames.filter(name => name !== nameToRemove));
            setScheduleNames(prevNames => prevNames.map((name, index) => {
                return index >= indexToRemove ? `Schedule ${index + 1}` : name;
            }));
        }
    };

    const handleToggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };



    return (
        <div className="w-full">
            <div className="relative">
                <p>My Schedules</p>
                <img className="absolute right-0 top-0" src="/folder.svg"/>
            </div>
            <div className="bg-gray-200 w-full p-2 flex items-center justify-center flex-col mb-2">
                {!isCollapsed ? (
                    <>{scheduleNames.map((name) => (
                    <MyScheduleBox
                        key={name}
                        name={name}
                        onSelect={handleScheduleSelect}
                        selected={selectedSchedule === name}
                        onRemove={handleRemoveSchedule}
                    />
                ))}
                <div className="relative w-full flex items-center justify-center">
                    <button className="bg-white px-3 py-1" onClick={handleNewSchedule}>New Schedule</button>
                    <button className="absolute bottom-0 right-0" onClick={handleToggleCollapse}><img src="/collapse_vertical.svg" /></button>
                </div>
                </>) :(<button onClick={handleToggleCollapse}><img src="/expand.svg" /></button>)}
                
            </div>
            <div className="flex justify-center w-full" >
                <div className="mb-4 px-16 py-1" style={{border: "1px solid gray", borderRadius: "1000px", width: "80%"}}>{selectedSchedule}</div>
            </div>
        </div>
    );
};

export default MySchedules;
