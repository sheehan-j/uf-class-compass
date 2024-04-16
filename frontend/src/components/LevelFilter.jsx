import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import '../styles/FilterDropdown.css';
import "bootstrap/dist/css/bootstrap.min.css";

const LevelFilter = ({ onSelect }) => {
  const handleFilterSelection = (eventKey) => {
    const newKey = "Level: " + eventKey;
    onSelect(newKey);
  };

  const LevelToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className='FilterPadding'
    >
      {children}
    </a>
  ));

  return(
    <Dropdown drop={'end'}>
      <Dropdown.Toggle as={LevelToggle} id="dropdown-custom-components">
        Course Level <span style={{padding: '0px 10px 0px 27px'}}>&#x25B8;</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleFilterSelection("1000 - 1999")}>1000 - 1999</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("2000 - 2999")}>2000 - 2999</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("3000 - 3999")}>3000 - 3999</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("4000 - 4999")}>4000 - 4999</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("5000 - 5999")}>5000 - 5999</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("6000 - 6999")}>6000 - 6999</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("7000 - 7999")}>7000 - 7999</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("8000 - 8999")}>8000 - 8999</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LevelFilter;
