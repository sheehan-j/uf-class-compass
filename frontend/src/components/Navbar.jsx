import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import StyleColors from "../constants/StyleColors";
import { useAuth } from "../hooks/AuthProvider";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const mobileMenuRef = useRef();
	const auth = useAuth();
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup function to remove the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		updateMenuHeight();
	}, [isMobileMenuOpen, screenWidth]);

	const updateMenuHeight = async () => {
		if (screenWidth < 640) {
			if (!isMobileMenuOpen) {
				mobileMenuRef.current.style.maxHeight = "0px";
			} else {
				const children = mobileMenuRef.current.children;
				let totalHeight = 0;
				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					const computedStyle = window.getComputedStyle(child);
					const marginTop = parseInt(computedStyle.marginTop);
					const marginBottom = parseInt(computedStyle.marginBottom);
					totalHeight += child.offsetHeight + marginTop + marginBottom;
				}
				mobileMenuRef.current.style.maxHeight = `${totalHeight}px`;
			}
		} else {
			mobileMenuRef.current.style.maxHeight = "";
		}
	};

	return (
		<header className="w-full text-white relative" style={{ backgroundColor: StyleColors.blue }}>
			<nav className="w-full relative" style={{ borderBottom: "1px solid rgba(235,235,235, 0.5)" }}>
				<div className="flex flex-col sm:flex-row justify-between items-center py-3 px-5">
					<div className="block w-full h-10 sm:hidden">
						<img
							className="float-left h-full"
							src="/mobileMenu.svg"
							onClick={() => setIsMobileMenuOpen((prev) => !prev)}
						/>
					</div>
					<div
						ref={mobileMenuRef}
						style={{
							transition: "all 0.1s linear",
						}}
						className={`items-center overflow-hidden w-full flex flex-col sm:flex-row sm:justify-between sm:gap-5`}
					>
						<Link className={`link-item mb-2 sm:mb-0 max-sm:hidden flex items-center`} to="/">
							<img
								className="w-16 sm:w-28 px-5 object-scale-down"
								id="logo"
								src="/CourseCompassLogo.png"
								alt="Logo"
							/>
							<span className="max-lg:hidden font-bold text-start lg:text-2xl">UF Class Compass</span>
						</Link>

						<div className="flex flex-col w-full mt-2 sm:mt-0 sm:w-auto sm:grid sm:grid-cols-3 gap-3">
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
							<Link className={`link-item`} to={auth?.user ? "" : "/login"}>
								<button
									className="py-2.5 px-5 rounded-lg w-full bg-customOrange hover:bg-customOrange-dark"
									onClick={() => {
										if (auth?.user) {
											auth.logout();
										}
									}}
								>
									{auth?.user ? "Logout" : "Login"}
								</button>
							</Link>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
