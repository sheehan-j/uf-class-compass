import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const buttonsRef = useRef([]);

  useEffect(() => {
    if (buttonsRef.current && buttonsRef.current.length > 0) {
      const maxWidth = Math.max(
        ...buttonsRef.current.map((button) => button.offsetWidth)
      );

      buttonsRef.current.forEach((button) => {
        button.style.width = `${maxWidth}px`;
      });
    }
  }, [buttonsRef]);

  return (
    <header className="w-full">
      <nav>
        <div className="flex justify-between px-10 py-5">
          <div className="flex gap-x-10">
            <Link className="link-item" to="/">
              <button className="navbarButton" ref={(el) => (buttonsRef.current[0] = el)}>Home</button>
            </Link>
            <Link className="link-item" to="/SchedulePage">
              <button className="navbarButton" ref={(el) => (buttonsRef.current[1] = el)}>Schedule</button>
            </Link>
            <Link className="link-item" to="/CourseSearch">
              <button className="navbarButton" ref={(el) => (buttonsRef.current[2] = el)}>Course Search</button>
            </Link>
          </div>
          <Link className="link-item" to="/UserPage">
            <button className="navbarButton" ref={(el) => (buttonsRef.current[3] = el)}>Login</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
