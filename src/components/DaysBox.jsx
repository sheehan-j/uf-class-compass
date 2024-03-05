import Days from "../constants/Days";

const DaysBox = () => {
    return (
        <>
            {Days.map((day, index) => (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(135, 135, 135, 0.5)",
                    border: "2px solid gray",
                    borderRadius: "20% / 100%",
                    width: "100%",
                    height: "100%"
        
                }}>
                    {day}
                </div>
            ))}
        </>

    )
}

export default DaysBox;