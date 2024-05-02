import { useState } from "react";
import { ConflictsUtil } from "../../util/ConflictsUtil";
import { SchedulesApi } from "../api/SchedulesApi";

const AttributionsModal = ({ modalOpen, setModalOpen }) => {
	return (
		<>
			{modalOpen ? (
				<div
					className="fixed z-[100] w-screen h-screen bg-orange top-0 left-0 flex justify-center items-center"
					style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
					onClick={() => setModalOpen(false)}
				>
					<div
						className="p-6 w-11/12 md:w-2/3 xl:w-1/3 rounded gap-2 flex flex-col bg-white relative"
						onClick={(event) => {
							event.stopPropagation();
						}}
						style={{ minWidth: "33%" }}
					>
						<div className="w-full flex justify-between items-center">
							<div className="text-xl font-bold">Attributions</div>
							<img
								className="hover:cursor-pointer w-6"
								onClick={() => setModalOpen(false)}
								src="/remove.svg"
							/>
						</div>
						<div className="text-base mb-3">
							<span className="text-bold">MacBook Mockup: </span>
							<span className="underline text-blue-500">
								<a href="https://www.freepik.com/free-psd/digital-device-mockup_4264999.htm#query=macbook%20mockup&position=0&from_view=keyword&track=ais&uuid=bd936f87-3feb-4451-9b71-f5c4ca6eb225">
									Image by rawpixel.com
								</a>{" "}
								on Freepik
							</span>
							<br />
							<span className="italic" style={{ fontSize: "0.75rem", lineHeight: "0.01rem" }}>
								{
									"(Clicking the link will likely lead to a 403 Forbidden error due to restrictions on Freepik's website. You can copy the link and paste it into your browser to visit it.)"
								}
							</span>
						</div>
						<div className="text-base mb-3">
							<span className="text-bold">Maps JavaScript API: </span>
							<a
								className="underline text-blue-500"
								href="https://developers.google.com/maps/documentation/javascript"
							>
								Link
							</a>
						</div>
						<div className="text-base mb-3">
							<span className="text-bold">Distance Matrix API: </span>
							<a
								className="underline text-blue-500"
								href="https://developers.google.com/maps/documentation/distance-matrix/overview"
							>
								Link
							</a>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default AttributionsModal;
