import { useState, useEffect, useRef } from "react";
import { Map, Marker, useMap, useMarkerRef } from "@vis.gl/react-google-maps";
// import Map from "./Map";
import PropTypes from "prop-types";

const SlidingSidebar = ({ isClassClicked, setIsClassClicked, cell }) => {
	const handleMinimize = () => {
		setIsClassClicked(false);
	};
	const [mapConatinerWidth, setMapContainerWidth] = useState(0);
	const mapContainerRef = useRef(null);
	const map = useMap();
	const [loading, setLoading] = useState(false);
	const [textbooks, setTextbooks] = useState([]);


	useEffect(() => {
		const handleResize = () => {
			if (mapContainerRef.current) {
				setMapContainerWidth(mapContainerRef.current.offsetWidth);
			}
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		const iframe = document.getElementById('mapIframe');
		if (iframe) {
			iframe.style.height = `${mapContainerRef.current.offsetWidth}px`;
		}
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (!map) return;

		if (cell?.building?.lat && cell?.building?.long) {
			map.setCenter({ lat: cell?.building?.lat, lng: cell?.building?.long });
			map.setZoom(18);
		}
	}, [map, cell]);
	const position = { lat: 61.2176, lng: -149.8997 };
	const iframeUrl = `https://campusmap.ufl.edu/#/1024`;

	const renderStars = (numStars) => {
		const roundedStars = Math.round(numStars * 2) / 2;
		const wholeStars = Math.floor(roundedStars);
		const hasHalfStar = roundedStars % 1 !== 0 && roundedStars % 1 >= 0.25 && roundedStars % 1 < 0.75;
		const stars = [];
		for (let i = 0; i < wholeStars; i++) {
			stars.push(<img key={"star" + i} src="/star.svg" alt="Star" />);
		}
		if (hasHalfStar) {
			stars.push(<img key="half-star" src="/halfStar.svg" alt="Half Star" />);
		}
		return (<span className="flex">{stars}</span>);
	};

	async function fetchTextbookData(sectionNumber) {
		const url = `https://www.bsd.ufl.edu/textadoption/studentview/displayadoption1sect.aspx?SECT=${sectionNumber}&YEAR=23&TERM=8`;

		const response = await fetch(url); // Fetches HTML
		const htmlContent = await response.text();

		const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
		const table = doc.querySelector("table.books");

		if (table) {
			const data = [];
			const rows = doc.querySelectorAll("table.books tbody tr");

			const requiredInfo = [
				"Title",
				"ISBN",
				"Cover",
				"Author",
				"Edition",
				"Copyright",
				"Publisher",
				"NewRetailPrice",
				"UsedRetailPrice",
				"NewRentalFee",
				"UsedRentalFee",
			];

			let tempObject = {};

			rows.forEach((row) => {
				const tds = row.querySelectorAll("td");
				tds.forEach((td, index) => {
					const key = td.textContent.trim().replace(":", "");
					const value = tds[index + 1] ? tds[index + 1].textContent.trim() : '';

					const trimmedKey = key.trim();
					const normalizedKey = trimmedKey.replace(/\s/g, "");

					if (key && requiredInfo.includes(normalizedKey)) {
						tempObject[normalizedKey.toLowerCase()] = value;
					}

					if (normalizedKey.startsWith("Thistextis")) {
						const restOfKey = normalizedKey.substring("Thistextis".length);
						tempObject["textis"] = restOfKey.toUpperCase();
					}
				});

				if (Object.keys(tempObject).length > 0) {
					data.push(tempObject);
					tempObject = {};
				}
			});

			const combinedObjects = [];
			for (let i = 0; i < data.length; i += 4) {
				const combined = {};
				for (let j = 0; j < 4 && i + j < data.length; j++) {
					Object.assign(combined, data[i + j]);
				}
				combinedObjects.push(combined);
			}

			return combinedObjects;
		} else {
			return [];
		}

	}

	const TextbookTable = ({ textbooks }) => {
		return (
			<table className="table-auto">
				<thead>
					<tr>
						<th className="px-4 py-2">Title</th>
						<th className="px-4 py-2">Author</th>
						<th className="px-4 py-2">ISBN</th>
					</tr>
				</thead>
				<tbody>
					{textbooks.map(textbook => (
						<tr key={textbook.id}>
							<td className="border px-4 py-2">{textbook.title}</td>
							<td className="border px-4 py-2">{textbook.author}</td>
							<td className="border px-4 py-2">{textbook.isbn}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	const handleGetTextbooks = async (sectionNumber) => {
		setLoading(true);
		try {
			const textbooksData = await fetchTextbookData(sectionNumber);
			setTextbooks(textbooksData);
		} catch (error) {
			console.error('Error fetching textbooks:', error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div
			style={{
				transition: "right 0.5s linear",
				right: isClassClicked ? "0" : "-100%",
			}}
			className="w-10/12 md:w-5/12 xl:w-4/12 z-40 absolute top-0 py-3 overflow-y-scroll h-full bg-customGray flex flex-col border-l border-gray-400"
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
						{cell?.rmpData && (
							<>
								<div className="w-full bg-gray-300 my-3" style={{ height: "1px" }}></div>
								<div className="font-semibold w-full">RMP Data</div>
								<div className="flex flex-row gap-2 justify-between items-center">
									<div className="text-end flex flex-col items-center">
										{" "}
										<span>
											<span className="font-semibold mr-1">Rating: </span>{" "}
											{JSON.stringify(cell.rmpData.rating)} / 5
										</span>{" "}
										<span className="ml-2 ">{renderStars(cell.rmpData.rating)}</span>
									</div>
									<div className="text-end">
										{" "}
										<span className="font-semibold">Difficulty: </span>
										{JSON.stringify(cell.rmpData.difficulty)} / 5
									</div>
									<div className="text-end text-blue-700">
										{" "}
										<a href={`https://www.ratemyprofessors.com/professor/${cell.rmpData.rmpId}`}>
											Link to RMP
										</a>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			{!cell?.isOnline && (
				<div ref={mapContainerRef} className="mx-3 border border-gray-300">
					<Map
						style={{ height: mapConatinerWidth * (2 / 3), width: "100%" }}
						defaultCenter={{ lat: 0, lng: 0 }}
						defaultZoom={10}
						disableDefaultUI={true}
					/>
				</div>
			)}
				</Map>
			</div>
			<div ref={mapContainerRef} className="mx-3 border border-gray-300">
				<iframe
					id="mapIframe"
					title="Campus Map"
					width="100%"
					src={iframeUrl}
					frameBorder="0"
					allowFullScreen
				></iframe>
			</div>
		</div>
	);
};

SlidingSidebar.propTypes = {
	isClassClicked: PropTypes.bool.isRequired,
	setIsClassClicked: PropTypes.func.isRequired,
};



export default SlidingSidebar;
