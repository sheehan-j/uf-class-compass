import React, { useState } from "react";
import { Link } from "react-router-dom";
import StyleColors from "../constants/StyleColors";
import { useAuth } from "../hooks/AuthProvider";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen((prev) => !prev);
	};
	const auth = useAuth();

	return (
		<header className="w-full text-white relative" style={{ backgroundColor: StyleColors.blue }}>
			<nav className="w-full relative" style={{ borderBottom: "1px solid rgba(235,235,235, 0.5)" }}>
				<div className="flex flex-col sm:flex-row justify-between items-center py-3 px-5">
					<div className="block w-full h-10 sm:hidden">
						<img className="float-left h-full" src="/mobileMenu.svg" onClick={toggleMobileMenu} />
					</div>
					<div
						className={`${
							!isMobileMenuOpen ? "hidden" : "flex"
						} items-center w-full sm:flex flex-col sm:flex-row sm:justify-between sm:gap-5`}
					>
						<Link className={`link-item mb-2 sm:mb-0 max-sm:hidden flex items-center`} to="/">
							<img
								className="w-16 sm:w-28 px-5 object-scale-down"
								id="logo"
								src="/CourseCompassLogo.png"
								alt="Logo"
							/>
							<span className="max-md:hidden font-bold text-start md:text-l lg:text-2xl">
								UF Class Compass
							</span>
						</Link>

						<div className="flex flex-col w-full mt-2 sm:mt-0 sm:w-auto sm:flex-row gap-3">
							<Link className={`link-item w-full sm:w-auto sm:hidden`} to="/">
								<button className="py-2.5 px-5 rounded-lg w-full bg-customOrange hover:bg-customOrange-dark">
									Home
								</button>
							</Link>
							<Link className={`link-item`} to="/schedule">
								<button className="py-2.5 px-10 rounded-lg w-full bg-customOrange hover:bg-customOrange-dark">
									Schedule
								</button>
							</Link>
							<Link className={`link-item`} to="/search">
								<button className="py-2.5 px-10 rounded-lg w-full bg-customOrange hover:bg-customOrange-dark">
									Course Search
								</button>
							</Link>
							<button
								className="py-2.5 px-5 rounded-lg w-full sm:w-auto bg-customOrange hover:bg-customOrange-dark"
								onClick={
									auth?.user
										? () => {
												auth.logout();
										  }
										: () => {
												auth.login();
										  }
								}
							>
								{auth?.user ? "Logout" : "Login"}
							</button>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
