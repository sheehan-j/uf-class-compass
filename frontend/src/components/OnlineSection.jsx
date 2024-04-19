const onlineSection = ({ cell, onCellClick, width }) => {
	const { instructor, color, code, location } = cell;
	return (
		<div
			className={`overflow-scroll h-28 z-10 p-1.5 flex flex-col justify-between border-2 relative`}
			style={{ backgroundColor: color, borderColor: color, cursor: "pointer", width: width }}
			onClick={onCellClick}
		>
			<div>
				<div className="font-semibold" style={{ fontSize: "1.05rem", lineHeight: "1.1rem" }}>
					{code}
				</div>
				<div className="hidden sm:block" style={{ fontSize: "0.9rem" }}>
					{instructor}
				</div>
			</div>
			<div
				className="flex justify-between items-end whitespace-normal break-words"
				style={{ fontSize: "0.9rem", lineHeight: "1.2rem" }}
			>
				<div>
					<div className="font-semibold">{location}</div>
				</div>
			</div>
		</div>
	);
};

export default onlineSection;
