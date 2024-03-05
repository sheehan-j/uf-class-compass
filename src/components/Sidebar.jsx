import "../styles/Sidebar.css";
import { useEffect, useRef } from "react";

const Sidebar = () => {
    return (
        <div className="w-1/3 sidebarWrapper">
            <div className="LogoWrapper">
                <img id="logo" src="/CourseCompassLogo.png" alt="Logo" />
                <div id="logoText"><b>UF CLASS COMPASS</b></div>
            </div>
            <div style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: "10px",
				display: "flex",
				justifyContent: "center"
            }}>
                Copyright &copy; 2024 Duck Duck Slow
            </div>
        </div>
    );
};

export default Sidebar;
