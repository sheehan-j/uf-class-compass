import { useState } from "react";
import { ConflictsUtil } from "../../util/ConflictsUtil";
import { SchedulesApi } from "../api/SchedulesApi";

const AddSectionFromSearch = ({ schedules, setSchedules, modalOpen, setModalOpen, sectionToAdd }) => {
	const [scheduleToAddTo, setScheduleToAddTo] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleClickOff = () => {
		if (!loading) {
			setError("");
			setScheduleToAddTo("");
			setModalOpen(false);
		}
	};

	const handleAdd = async (event) => {
		setLoading(true);
		const targetSchedule = schedules.filter((schedule) => schedule._id === scheduleToAddTo)[0];

		const conflictList = ConflictsUtil.checkConflict(targetSchedule, sectionToAdd);
		const conflict = conflictList.length > 0;
		if (sectionToAdd.isOnline || !conflict) {
			if (!targetSchedule.sections.some((targetScheduleClass) => targetScheduleClass._id == sectionToAdd._id)) {
				// First, check that the class being clicked is not already in the schedule
				// Check if there is a different section of the class being added already on the schedule
				const activeClassesWithSameCode = targetSchedule.sections.filter(
					(targetScheduleClass) => targetScheduleClass.class.code == sectionToAdd.class.code
				);

				// Remove it from the schedule if its found
				if (activeClassesWithSameCode.length > 0) {
					await SchedulesApi.deleteClassFromSchedule(targetSchedule._id, activeClassesWithSameCode[0]._id);
				}

				const result = await SchedulesApi.addClassToSchedule(targetSchedule._id, sectionToAdd._id);
				setSchedules(result);
				setSuccess("Course successfully added!");
				setTimeout(() => {
					setSuccess("");
				}, 2000);
			} else {
				setError("Error: This section is already added to this schedule.");
			}
		} else {
			setError(
				`Error: Could not add due to conflict${conflictList.length > 1 ? "s" : ""} with ${conflictList.join(
					", "
				)}`
			);
		}
		setLoading(false);
	};

	return (
		<>
			{modalOpen ? (
				<div
					className="fixed z-[100] w-screen h-screen bg-orange top-0 left-0 flex justify-center items-center"
					style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
					onClick={(event) => handleClickOff(event)}
				>
					<div
						className="p-6 w-11/12 md:w-2/3 xl:w-1/3 rounded gap-2 flex flex-col bg-white relative"
						onClick={(event) => {
							event.stopPropagation();
						}}
						style={{ minWidth: "33%" }}
					>
						<div className="w-full flex justify-between items-center">
							<div className="text-xl font-bold">Add Section</div>
							<img
								className="hover:cursor-pointer w-6"
								onClick={(event) => handleClickOff(event)}
								src="/remove.svg"
							/>
						</div>
						<div className="w-full flex text-lg gap-3 justify-between items-center">
							<span className="text-base">Schedule to add to:</span>
							<select
								className="border-b p-0.5 border-customBlue text-base"
								value={scheduleToAddTo}
								onChange={(event) => {
									setScheduleToAddTo(event.target.value);
									setError("");
								}}
							>
								<option className="text-gray-100" value="" disabled>
									---
								</option>
								{schedules.map((schedule) => (
									<option key={schedule._id} className="" value={schedule._id}>
										{schedule.name}
									</option>
								))}
							</select>
						</div>
						{error !== "" && <div className="text-sm text-red-700">{error}</div>}
						{success !== "" && <div className="text-sm text-green-700">{success}</div>}
						<button
							onClick={
								scheduleToAddTo !== ""
									? (event) => {
											handleAdd(event);
									  }
									: () => {}
							}
							className={`p-1 bounded rounded bg-customBlue text-white text-base w-full flex justify-center items-center ${
								scheduleToAddTo === "" ? "opacity-70 cursor-not-allowed" : "hover:bg-customBlue-dark"
							}`}
						>
							Add
						</button>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default AddSectionFromSearch;
