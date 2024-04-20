import { useState, useEffect, useRef } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import StyleColors from "../constants/StyleColors";

const SlidingSidebar = ({ isClassClicked, setIsClassClicked, cell }) => {
	// const { credits, final, department, color, code, title, description, prerequisites, location } = cell;
	const handleMinimize = () => {
		setIsClassClicked(false);
	};
	const [mapConatinerWidth, setMapContainerWidth] = useState(0);
	const mapContainerRef = useRef(null);

	useEffect(() => {
		const handleResize = () => {
			if (mapContainerRef.current) {
				setMapContainerWidth(mapContainerRef.current.offsetWidth);
			}
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const position = { lat: 61.2176, lng: -149.8997 };
	return (
		<div
			style={{
				transition: "right 0.5s linear",
				right: isClassClicked ? "0" : "-100%",
			}}
			className="w-1/2 md:w-5/12 xl:w-4/12 z-40 absolute top-0 py-3 overflow-y-visible h-full bg-customGray flex flex-col"
		>
			<div className="px-2 mb-2" onClick={handleMinimize}>
				<img className="hover:cursor-pointer" src="/remove.svg" />
			</div>
			<div className="px-3 mb-3">
				<div className="border border-gray-300 bg-white pb-3 flex flex-col">
					<div
						className="font-semibold relative px-2 py-2 leading-6"
						style={{ backgroundColor: cell?.color }}
					>
						<div
							className="absolute left-0 top-0 w-1 h-full"
							style={{ backgroundColor: cell?.color }}
						></div>
						{cell?.code} - {cell?.title}
					</div>
					<div className="px-3 py-2 text-sm flex flex-col gap-2">
						<div className="mb-3" style={{ fontSize: "0.81rem", lineHeight: "1.1rem" }}>
							{cell?.description}
						</div>
						<div className="flex flex-row gap-2 justify-between items-center">
							<div className="font-semibold">Instructor</div>
							<div className="text-end">{cell?.instructor}</div>
						</div>
						<div className="flex flex-row gap-2 justify-between items-center">
							<div className="font-semibold">Location</div>
							<div className="text-end">{cell?.location}</div>
						</div>
						<div className="flex flex-row gap-2 justify-between items-center">
							<div className="font-semibold">Prereqs</div>
							<div className="text-end">{cell?.prerequisites == null ? "None" : cell?.prerequisites}</div>
						</div>
						<div className="flex flex-row gap-2 justify-between items-center">
							<div className="font-semibold">Credits</div>
							{cell?.credits && (
								<div className="text-end">{cell?.credits == 0 ? "VAR" : cell?.credits}</div>
							)}
						</div>
						{cell?.final && (
							<div className="flex flex-row gap-2 justify-between items-center">
								<div className="font-semibold">Final Exam</div>
								<div className="text-end">{cell?.final}</div>
							</div>
						)}
						{cell?.department && (
							<div className="flex flex-row gap-2 justify-between items-center">
								<div className="font-semibold">Department</div>
								<div className="text-end">{cell?.department}</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div ref={mapContainerRef} className="mx-3 border border-gray-300">
				<Map
					style={{ height: mapConatinerWidth * (2 / 3), width: "100%" }}
					defaultCenter={position}
					defaultZoom={10}
					disableDefaultUI={true}
				>
					<Marker
						defaultCenter={position}
						defaultZoom={3}
						gestureHandling={"greedy"}
						disableDefaultUI={true}
						controlled={true}
					/>
				</Map>
			</div>
		</div>
	);
};

SlidingSidebar.propTypes = {
	isClassClicked: PropTypes.bool.isRequired,
	setIsClassClicked: PropTypes.func.isRequired,
};

export default SlidingSidebar;
