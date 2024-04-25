import { useEffect } from "react";
import { getPeriodTimes } from "../constants/BlockTimes";

const SearchResultBox = ({ searchResult, expanded, handleClick, index }) => {
	const translateDay = (day) => {
		const days = {
			0: "M",
			1: "T",
			2: "W",
			3: "R",
			4: "F",
		};
		return days[day];
	};

	return (
		<div
			className={`w-full hover:cursor-pointer drop-shadow-sm bg-gray-50 p-3 rounded-lg border flex flex-col ${
				index % 2 == 0 ? `border-customBlue-transparent` : `border-customOrange-transparent`
			}`}
			onClick={handleClick}
		>
			<div className="flex flex-row">
				<div className="grow flex flex-col gap-2">
					<div className="text-xl text-gray-800">
						<span
							className={`${
								index % 2 == 0 ? `text-customBlue-dark` : `text-customOrange-dark`
							} font-semibold`}
						>
							{searchResult.code}
						</span>{" "}
						- {searchResult.title}
					</div>
					<div className="text-base font-light">{searchResult.description}</div>
					{searchResult?.prerequisites && (
						<div className="text-sm font-light">{searchResult.prerequisites}</div>
					)}
				</div>
				<div className="flex-none">
					<img
						className="w-6 p-1 rounded bg-gray-50 hover:bg-gray-100 hover:cursor-pointer"
						src="./expand.svg"
					/>
				</div>
			</div>
			{expanded === searchResult._id && (
				<div className="flex flex-col gap-2 mt-3">
					{searchResult.sections.map((section) => (
						<div
							key={section.number}
							className="bg-white border border-gray-200 rounded py-3 px-4"
							onClick={(event) => event.stopPropagation()}
						>
							Class <span className="font-semibold">#{section.number}</span>
							<div className="w-full bg-gray-300 my-3" style={{ height: "1px" }}></div>
							<div className="w-full flex flex-row">
								<div className="w-1/2">
									{section.meetings.length > 0 &&
										section.meetings
											.sort((a, b) => a.day - b.day)
											.map((meeting) => (
												<div key={meeting._id}>
													<span className="font-bold">{translateDay(meeting.day)}</span>{" "}
													{meeting.building.code} {meeting.room} | P{meeting.period}
													{meeting.length > 1
														? `-${meeting.period + meeting.length - 1}`
														: ""}{" "}
													{"("}
													{getPeriodTimes(meeting.period).start} -{" "}
													{getPeriodTimes(meeting.period + meeting.length - 1)?.end}
													{")"}
												</div>
											))}
									{section.meetings.length == 0 && <div>Online</div>}
								</div>
								<div className="w-1/2 flex flex-col gap-2">
									<div className="flex flex-row gap-2 justify-between items-center">
										<div className="font-semibold">Instructor</div>
										<div className="text-end">
											{section.instructor.name === "" ? "STAFF" : section.instructor.name}
										</div>
									</div>
									<div className="flex flex-row gap-2 justify-between items-center">
										<div className="font-semibold">Credits</div>
										<div className="text-end">
											{parseInt(section.credits) < 1 ? "VAR" : section.credits}
										</div>
									</div>
									{section?.final && (
										<div className="flex flex-row gap-2 justify-between items-center">
											<div className="font-semibold">Final Exam</div>
											<div className="text-end">{section.final}</div>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchResultBox;
