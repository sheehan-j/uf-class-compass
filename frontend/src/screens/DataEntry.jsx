import { useState } from "react";
import { InstructorsApi } from "../api/InstructorsApi";
import { BuildingsApi } from "../api/BuildingsApi";
import { ClassesApi } from "../api/ClassesApi";
import { DataEntryApi } from "../api/DataEntryApi";

const DataEntry = () => {
	const [meetings, setMeetings] = useState([{ day: 0, period: 1, length: 1, building: "", room: "" }]);
	const [building, setBuilding] = useState({ code: "", name: "", pid: "" });
	const [classObj, setClassObj] = useState({
		code: "",
		number: "",
		title: "",
		instructor: "",
		title: "",
		credits: "",
	});
	const [instructor, setInstructor] = useState({ name: "" });
	const [buildingLookupName, setBuildingLookupName] = useState("");
	const [buildingLookupResult, setBuildingLookupResult] = useState("");
	const [instructorLookupName, setInstructorLookupName] = useState("");
	const [instructorLookupResult, setInstructorLookupResult] = useState("");
	const [classLookupNumber, setClassLookupNumber] = useState("");
	const [classLookupResult, setClassLookupResult] = useState("");

	const lookupBuilding = async (event) => {
		event.preventDefault();
		const result = await BuildingsApi.getBuildingByCode(buildingLookupName.toUpperCase());
		setBuildingLookupResult(result ? "This building exists." : "This building does not exist.");
	};

	const lookupInstructor = async (event) => {
		event.preventDefault();
		const result = await InstructorsApi.getInstructorByName(instructorLookupName);
		setInstructorLookupResult(result ? "This instructor exists." : "This instructor does not exist.");
	};

	const lookupClass = async (event) => {
		event.preventDefault();
		const result = await ClassesApi.getClassByNumber(classLookupNumber.toUpperCase());
		setClassLookupResult(result ? "This class exists." : "This class does not exist.");
	};

	const submitBuilding = async (event) => {
		event.preventDefault();
		const result = await DataEntryApi.createBuildingRecord({ ...building, code: building.code.toUpperCase() });
		alert(
			result
				? "Building successfully created."
				: "Building could not be created (make sure it doesn't already exist)."
		);
	};

	const submitInstructor = async (event) => {
		event.preventDefault();
		const result = await DataEntryApi.createInstructorRecord(instructor);
		alert(
			result
				? "Instructor successfully created."
				: "Instructor could not be created (make sure it doesn't already exist)."
		);
	};

	const submitClass = async (event) => {
		event.preventDefault();
		const newClass = {
			...classObj,
			code: classObj.code.toUpperCase(),
			number: parseInt(classObj.number),
			credits: parseInt(classObj.credits),
			meetings: [...meetings],
		};
		const result = await DataEntryApi.createClassRecord(newClass);
		if (result.status == 201) {
			alert("Class successfully created.");
		} else {
			alert(`Class could not be created.\nError message: ${result.error}`);
		}
	};

	const handleMeetingChange = (index, event) => {
		const { name, value } = event.target;
		const list = [...meetings];
		list[index][name] = value;
		setMeetings(list);
	};

	const handleAddMeeting = () => {
		setMeetings([...meetings, { day: 0, period: 1, length: 1, building: "", room: "" }]);
	};

	const handleRemoveMeeting = () => {
		const list = [...meetings];
		list.pop();
		setMeetings(list);
	};

	return (
		<div className="flex justify-center items-center flex-col pt-6 pb-12 gap-5 w-full">
			<h1 className="text-2xl font-bold">DB Data Entry</h1>
			<form
				onSubmit={lookupBuilding}
				className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 p-5 bg-gray-100 border border-gray-300 flex flex-col"
			>
				<h2 className="text-xl font-semibold mb-3">Building Lookup</h2>
				<input
					value={buildingLookupName}
					onChange={(e) => {
						setBuildingLookupName(e.target.value);
						setBuildingLookupResult("");
					}}
					className="border border-gray-300 w-full p-2 mb-3"
					type="text"
					placeholder="Enter building code (should be all caps)"
				/>
				<button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-1.5 text-white font-mediums">
					Submit
				</button>
				{buildingLookupResult && (
					<p
						className={`mt-2 font-bold ${
							buildingLookupResult == "This building exists." ? "text-red-600" : "text-green-700"
						}`}
					>
						{buildingLookupResult}
					</p>
				)}
			</form>

			<form
				onSubmit={submitBuilding}
				className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 p-5 mb-10 bg-gray-100 border border-gray-300 flex flex-col"
			>
				<h2 className="text-xl font-semibold mb-3">Enter New Building</h2>
				<h4 className="mb-2 font-medium">Code</h4>
				<input
					value={building.code}
					onChange={(e) => setBuilding({ ...building, code: e.target.value })}
					className="border border-gray-300 w-full mb-3 p-2"
					type="text"
					placeholder="Enter building code (should be all caps)"
				/>
				<h4 className="mb-2 font-medium">Name</h4>
				<input
					value={building.name}
					onChange={(e) => setBuilding({ ...building, name: e.target.value })}
					className="border border-gray-300 w-full mb-3 p-2"
					type="text"
					placeholder="Enter building name"
				/>
				<h4 className="font-medium">Place ID</h4>
				<p className="text-sm mb-2 italic">
					<span>You can lookup the place ID of the building </span>
					<a
						className="text-blue-400"
						href="https://developers.google.com/maps/documentation/places/web-service/place-id"
						target="_blank"
					>
						here
					</a>
				</p>
				<input
					value={building.pid}
					onChange={(e) => setBuilding({ ...building, pid: e.target.value })}
					className="border border-gray-300 w-full p-2 mb-3"
					type="text"
					placeholder="Enter building place ID"
				/>
				<button className="w-full bg-blue-600 hover:bg-blue-700 p-1.5 text-white font-medium">Submit</button>
			</form>

			<form
				onSubmit={lookupInstructor}
				className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 p-5 bg-gray-100 border border-gray-300 flex flex-col"
			>
				<h2 className="text-xl font-semibold mb-3">Instructor Lookup</h2>
				<input
					value={instructorLookupName}
					onChange={(e) => {
						setInstructorLookupName(e.target.value);
						setInstructorLookupResult("");
					}}
					className="border border-gray-300 w-full p-2 mb-3"
					type="text"
					placeholder="Enter instructor name (case sensitive)"
				/>
				<button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-1.5 text-white font-medium">
					Submit
				</button>
				{instructorLookupResult && (
					<p
						className={`mt-2 font-bold ${
							instructorLookupResult == "This instructor exists." ? "text-red-600" : "text-green-700"
						}`}
					>
						{instructorLookupResult}
					</p>
				)}
			</form>

			<form
				onSubmit={submitInstructor}
				className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 p-5 mb-10 bg-gray-100 border border-gray-300 flex flex-col"
			>
				<h2 className="text-xl font-semibold mb-3">Enter New Instructor</h2>
				<h4 className="mb-2 font-medium">Name &#40;Case Sensitive!&#41;</h4>
				<input
					value={instructor.name}
					onChange={(e) => setInstructor({ ...building, name: e.target.value })}
					className="border border-gray-300 w-full mb-3 p-2"
					type="text"
					placeholder="Enter instructor name"
				/>
				<button className="w-full bg-blue-600 hover:bg-blue-700 p-1.5 text-white font-medium">Submit</button>
			</form>

			<form
				onSubmit={lookupClass}
				className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 p-5 bg-gray-100 border border-gray-300 flex flex-col"
			>
				<h2 className="text-xl font-semibold mb-3">Class Lookup</h2>
				<input
					value={classLookupNumber}
					onChange={(e) => {
						setClassLookupNumber(e.target.value);
						setClassLookupResult("");
					}}
					className="border border-gray-300 w-full p-2 mb-3"
					type="text"
					placeholder="Enter class NUMBER"
				/>
				<button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-1.5 text-white font-medium">
					Submit
				</button>
				{classLookupResult && (
					<p
						className={`mt-2 font-bold ${
							classLookupResult == "This class exists." ? "text-red-600" : "text-green-700"
						}`}
					>
						{classLookupResult}
					</p>
				)}
			</form>

			<form
				onSubmit={submitClass}
				className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 p-5 bg-gray-100 border border-gray-300 flex flex-col"
			>
				<h2 className="text-xl font-semibold mb-3">Enter New Class</h2>
				<h4 className="mb-2 font-medium">Code</h4>
				<input
					value={classObj.code}
					onChange={(e) => setClassObj({ ...classObj, code: e.target.value })}
					className="border border-gray-300 w-full mb-3 p-2"
					type="text"
					placeholder="Enter class code  (should be all caps)"
				/>

				<h4 className="mb-2 font-medium">Number</h4>
				<input
					value={classObj.number}
					onChange={(e) => setClassObj({ ...classObj, number: e.target.value })}
					className="border border-gray-300 w-full mb-3 p-2"
					type="text"
					placeholder="Enter class number"
				/>

				<h4 className="mb-2 font-medium">Title</h4>
				<input
					value={classObj.title}
					onChange={(e) => setClassObj({ ...classObj, title: e.target.value })}
					className="border border-gray-300 w-full mb-3 p-2"
					type="text"
					placeholder="Enter class title"
				/>

				<h4 className="mb-2 font-medium">Instructor</h4>
				<input
					value={classObj.instructor}
					onChange={(e) => setClassObj({ ...classObj, instructor: e.target.value })}
					className="border border-gray-300 w-full mb-3 p-2"
					type="text"
					placeholder="Enter instructor name"
				/>

				<h4 className="mb-2 font-medium">Credits</h4>
				<input
					value={classObj.credits}
					onChange={(e) => setClassObj({ ...classObj, credits: e.target.value })}
					className="border border-gray-300 w-full mb-3 p-2"
					type="text"
					placeholder="Enter class credits"
				/>

				<h4 className="mb-2 font-medium">
					Meetings &#40;day, starting period, length in periods, building code, room #&#41;
				</h4>
				{meetings.map((meeting, index) => (
					<div key={index} className="flex mb-3 gap-1">
						<select
							name="day"
							value={meeting.day}
							onChange={(event) => handleMeetingChange(index, event)}
							className="bg-white p-2 border border-gray-300"
						>
							<option value="0">Monday</option>
							<option value="1">Tuesday</option>
							<option value="2">Wednesday</option>
							<option value="3">Thursday</option>
							<option value="4">Friday</option>
						</select>
						<select
							name="period"
							value={meeting.period}
							onChange={(event) => handleMeetingChange(index, event)}
							className="bg-white p-2 border border-gray-300"
						>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="E1">E1</option>
							<option value="E2">E2</option>
							<option value="E3">E3</option>
						</select>
						<select
							name="length"
							value={meeting.length}
							onChange={(event) => handleMeetingChange(index, event)}
							className="bg-white p-2 border border-gray-300"
						>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
						<input
							name="building"
							value={meeting.building}
							onChange={(event) => handleMeetingChange(index, event)}
							className="border border-gray-300 w-full p-2"
							type="text"
							placeholder="Building code"
						/>
						<input
							name="room"
							value={meeting.room}
							onChange={(event) => handleMeetingChange(index, event)}
							className="border border-gray-300 w-full p-2"
							type="text"
							placeholder="Room number"
						/>
					</div>
				))}
				<div className="flex flex-row w-full mb-3 gap-1">
					<button
						type="button"
						onMouseUp={handleAddMeeting}
						className="bg-green-600 hover:bg-green-700 grow text-white font-medium p-1.5"
					>
						Add Meeting
					</button>
					<button
						type="button"
						onMouseUp={meetings.length > 1 ? handleRemoveMeeting : () => {}}
						className={`bg-red-500 grow text-white font-medium p-1.5 ${
							meetings.length == 1 ? "opacity-50 cursor-not-allowed " : "hover:bg-red-600"
						}`}
					>
						Remove Meeting
					</button>
				</div>

				<button className="w-full bg-blue-600 hover:bg-blue-700 p-1.5 text-white font-medium">Submit</button>
			</form>
		</div>
	);
};

export default DataEntry;
