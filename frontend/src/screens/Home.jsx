import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import AttributionsModal from "../components/AttributionsModal";
import { useState } from "react";

const Home = () => {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<div className="w-screen">
			<Navbar />
			<div className="border-b flex flex-col sm:flex-row justify-center items-center px-10 py-20 md:py-10">
				<div className="p-5 w-full md:w-5/12 text-center md:text-left">
					<h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-3">UF Class Compass</h1>
					<h3 className="text-2xl xl:text-3xl mb-3">Plan your schedule with ease</h3>
					<Link className="link-item" to="/schedule">
						<button className="py-2.5 px-5 rounded-lg text-white text-lg lg:text-xl bg-customOrange hover:bg-customOrange-dark">
							Build Your Schedule Now
						</button>
					</Link>
				</div>
				<div className="hidden md:block md:w-7/12 px-5 h-auto">
					<img src="https://ufcc.jordansheehan.com/mockup.webp" className="w-full h-auto" alt="Logo" />
				</div>
			</div>
			<div
				className="flex flex-col justify-center items-center bg-customGray"
				style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
			>
				<h1 className="text-center w-full text-2xl xl:text-3xl font-bold mb-7 text-customOrange">
					What is UF Class Compass?
				</h1>
				{/* <div className="w-full md:w-2/5 md:item-center">
						<img className="w-full object-scale-down" src="/homeExample.png" />
					</div> */}
				<div className="w-7/12 md:w-8/12 xl:w-1/2 flex flex-col md:flex-row gap-8">
					<div className="text-center text-lg flex-1">
						<h1 className="text-customOrange">Your One-Stop Hub For All Things Scheduling</h1>
						<p>
							UF Class Compass serves as a centralized platform for all tools needed to streamline the
							scheduling process every semester.
						</p>
					</div>
					<div className="text-center text-lg flex-1">
						<h1 className="text-customOrange">Made By UF Students For UF Students</h1>
						<p>
							As students, we understand the frustration of last minute schedule planning and the
							challenges of adjusting schedules on short notice. Our goal is to enhance this experience
							for all UF students.
						</p>
					</div>
					<div className="text-center text-lg flex-1">
						<h1 className="text-customOrange">Enhanced Scheduling Tools</h1>
						<p>
							We aim to provide robust features including support for multiple schedules, seamless course
							lookup, and personalized schedule suggestions.
						</p>
					</div>
				</div>
			</div>
			<div
				className="flex flex-col justify-center items-center bg-white"
				style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
			>
				<h1 className="text-center w-full text-2xl xl:text-3xl font-bold text-customBlue">Documentation</h1>
				<p className="text-customBlue mb-4">Our Project Documentation for Reference</p>
				{/* <div className="w-full md:w-2/5 md:item-center">
						<img className="w-full object-scale-down" src="/homeExample.png" />
					</div> */}
				<div className="w-7/12 md:w-5/12 xl:w-3/12 flex flex-col max-md:gap-4 md:flex-row justify-center items-center">
					<div className="text-center text-lg px-5 grow">
						<a href="/manual.pdf" target="_blank" className="text-semibold underline">
							Manual
						</a>
					</div>
					<div className="text-center text-lg px-5 grow">
						<a href="./erd.png" target="_blank" className="text-semibold underline">
							ERD
						</a>
					</div>
				</div>
			</div>
			<div className="bg-gray-300" style={{ height: "0.05rem" }}></div>
			<div className="flex justify-between items-center bg-white py-3 px-5">
				<p className="text-sm">&#169; 2024 Duck Duck Slow. All rights reserved.</p>
				<button
					onClick={() => {
						setModalOpen(true);
					}}
					className="text-sm underline"
				>
					Attributions
				</button>
			</div>
			<AttributionsModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
		</div>
	);
};

export default Home;
