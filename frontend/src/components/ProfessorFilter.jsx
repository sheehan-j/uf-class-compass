import React, { useState } from 'react';
import Dropdown from 'react-multilevel-dropdown';

const ProfessorFilter = ({eventKey, onSelect, clearFilter}) => {
  const [searchInput, setSearchInput] = useState('');
  const handleFilterSelection = (eventKey) => {
    const newKey = "Professor: " + eventKey;
    onSelect(newKey);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFilterSelection(searchInput);
    }
  };

  // const ProfToggle = React.forwardRef(({ children, onClick }, ref) => (
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

  // const ProfMenu = React.forwardRef(
  //   ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {

  //     const [value, setValue] = useState('');

  //     return (
  //       <div
  //         ref={ref}
  //         style={{...style, zIndex: "99"}}
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


  return(
    <>
      Professor
       {/* <span style={{padding: '0px 10px 0px 50px'}}>&#x25B8;</span> */}
      <Dropdown.Submenu position='right'>
       <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder='Add Professor'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ color: 'black', paddingLeft: '5px', marginLeft: 'auto' }}
        />
      </div>
    </Dropdown.Submenu>
  </>
  );
}

export default ProfessorFilter;

