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
				<div className="flex flex-col sm:flex-row justify-between items-center px-10 py-5">
					<div className="block w-full h-10 sm:hidden">
						<img className="float-left h-full" src="/mobileMenu.svg" onClick={toggleMobileMenu} />
					</div>
					<div
						className={`${
							!isMobileMenuOpen ? "hidden" : "flex"
						} items-center w-full sm:w-auto sm:flex flex-col sm:flex-row sm:grid sm:grid-cols-3 sm:gap-5`}
					>
						<Link className={`link-item  mb-2 sm:mb-0 w-3/5 sm:w-full`} to="/">
							<button
								className="py-2.5 px-5 rounded-lg w-full"
								style={{ backgroundColor: StyleColors.orange }}
							>
								Home
							</button>
						</Link>
						{auth.user && (
							<Link className={`link-item  mb-2 sm:mb-0 w-3/5 sm:w-full`} to="/schedule">
								<button
									className="py-2.5 px-5 rounded-lg w-full"
									style={{ backgroundColor: StyleColors.orange }}
								>
									Schedule
								</button>
							</Link>
						)}
						<Link className={`link-item  mb-2 sm:mb-0 w-3/5 sm:w-full`} to="/search">
							<button
								className="py-2.5 px-5 rounded-lg w-full"
								style={{ backgroundColor: StyleColors.orange }}
							>
								Course Search
							</button>
						</Link>
					</div>
					{auth.user ? (
						// LOGOUT BUTTON
						<div
							className={`sm:w-auto ${
								!isMobileMenuOpen ? "hidden" : "flex"
							} justify-center w-full sm:flex sm:w-auto`}
						>
							<button
								className="py-2.5 px-5 rounded-lg w-full"
								style={{ backgroundColor: StyleColors.orange }}
								onClick={() => {
									auth.logout();
								}}
							>
								Logout
							</button>
						</div>
					) : (
						// LOGIN BUTTON
						<div
							className={`sm:w-auto ${
								!isMobileMenuOpen ? "hidden" : "flex"
							} justify-center w-full sm:flex sm:w-auto`}
						>
							<Link className={`link-item w-3/5 sm:w-full`} to="/login">
								<button
									className="py-2.5 px-5 rounded-lg w-full"
									style={{ backgroundColor: StyleColors.orange }}
								>
									Login
								</button>
							</Link>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
