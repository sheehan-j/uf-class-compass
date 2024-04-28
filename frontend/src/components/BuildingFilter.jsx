import React, { useState } from "react";
import Dropdown from "react-multilevel-dropdown";

const BuildingFilter = ({ handleAddFilter }) => {
	const [searchInput, setSearchInput] = useState("");
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleAddFilter("Building", searchInput);
		}
	};

	// const BuildingToggle = React.forwardRef(({ children, onClick }, ref) => (
	//   <a
	//     href=""
	//     ref={ref}
	//     onClick={(e) => {
	//       e.preventDefault();
	//       onClick(e);
	//     }}
	//     className='FilterPadding'
	//   >
	//     {children}
	//   </a>
	// ));

	// const BuildingMenu = React.forwardRef(
	//   ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
	//     const [value, setValue] = useState('');

	//     return (
	//       <div
	//         ref={ref}
	//         style={style}
	//         className={className}
	//         aria-labelledby={labeledBy}
	//         drop={'end'}
	//       >
	//         <Form.Control
	//           autoFocus
	//           className="mx-3 my-2 w-auto"
	//           placeholder="Type to filter..."
	//           onChange={(e) => setValue(e.target.value)}
	//           value={value}
	//         />
	//         <ul className="list-unstyled">
	//           {React.Children.toArray(children).filter(
	//             (child) =>
	//               !value || child.props.children.toLowerCase().startsWith(value),
	//           )}
	//         </ul>
	//       </div>
	//     );
	//   },
	// );

	return (
		<>
			Building Code
			{/* <span style={{padding: '0px 10px 0px 56px'}}>&#x25B8;</span> */}
			<Dropdown.Submenu position="right">
				<div style={{ textAlign: "center" }}>
					<input
						type="text"
						placeholder="Add Building"
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						onKeyDown={handleKeyDown}
						style={{ color: "black", paddingLeft: "5px", marginLeft: "auto" }}
					/>
				</div>
			</Dropdown.Submenu>
		</>
	);
};

export default BuildingFilter;
