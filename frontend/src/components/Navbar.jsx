import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import StyleColors from "../constants/StyleColors";

const Navbar = () => {
  const buttonsRef = useRef([]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };


  useEffect(() => {
      if (isMobileScreen) {
          return;
      }
      console.log("here");
        if(buttonsRef.current && buttonsRef.current.length > 0){
          const maxWidth = Math.max(
            ...buttonsRef.current.map((button) => button.offsetWidth)
          );

          buttonsRef.current.forEach((button) => {
            button.style.width = `${maxWidth}px`;
          });
      }
  }, [buttonsRef, isMobileScreen]);

  return (
    <header className="w-full text-white" style={{ backgroundColor: StyleColors.blue }}>
    <nav className="w-full relative" style={{ borderBottom: "1px solid rgba(235,235,235, 0.5)" }}>
      <div className="flex flex-col sm:flex-row justify-between items-center px-10 py-5">
        <div className="block w-full h-10 sm:hidden">
          <img className="float-left h-full" src="/mobileMenu.svg" onClick={toggleMobileMenu}/>
        </div>
        <div className={`${!isMobileMenuOpen ? "hidden" : "flex"} items-center w-full sm:w-auto sm:flex flex-col sm:flex-row sm:gap-5`}>
          <Link className={`link-item  mb-2 sm:mb-0 ${isMobileScreen ? "w-3/5" : "" }`} to="/">
            <button className="py-2.5 px-5 rounded-lg w-full" style={{ backgroundColor: StyleColors.orange }} ref={(el) => (buttonsRef.current[0] = el)}>Home</button>
          </Link>
          <Link className={`link-item  mb-2 sm:mb-0 ${isMobileScreen ? "w-3/5" : "" }`} to="/SchedulePage">
            <button className="py-2.5 px-5 rounded-lg w-full" style={{ backgroundColor: StyleColors.orange }} ref={(el) => (buttonsRef.current[1] = el)}>Schedule</button>
          </Link>
          <Link className={`link-item  mb-2 sm:mb-0 ${isMobileScreen ? "w-3/5" : "" }`} to="/CourseSearch">
            <button className="py-2.5 px-5 rounded-lg w-full" style={{ backgroundColor: StyleColors.orange }} ref={(el) => (buttonsRef.current[2] = el)}>Course Search</button>
          </Link>
        </div>
        <div className={`sm:w-auto ${!isMobileMenuOpen ? "hidden" : "flex"} justify-center w-full sm:flex sm:w-auto`}>
          <Link className={`link-item ${isMobileScreen ? "w-3/5" : "" }`} to="/UserPage">
            <button className="py-2.5 px-5 rounded-lg w-full" style={{ backgroundColor: StyleColors.orange }} ref={(el) => (buttonsRef.current[3] = el)}>Login</button>
          </Link>
        </div>
      </div>
    </nav>
  </header>
  

  );
};

export default Navbar;
