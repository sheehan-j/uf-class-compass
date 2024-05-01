const FilterChip = ({ type, value, handleRemoveFilter }) => {
	return (
		<div className="bg-white shrink-0 text-sm border border-gray-300 px-2 py-1 rounded flex gap-2 items-center">
			<span>
				{type}: {value}
			</span>
			<span
				className="hover:cursor-pointer"
				onClick={() => {
					handleRemoveFilter(type, value);
				}}
			>
				<img src="./remove_alt.svg" className="w-2" />
			</span>
		</div>
	);
};

export default FilterChip;
