import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import '../styles/FilterDropdown.css';
import "bootstrap/dist/css/bootstrap.min.css";

const CreditsFilter = ({ onSelect }) => {
  const handleFilterSelection = (eventKey) => {
    const newKey = "Credits: " + eventKey;
    onSelect(newKey);
  };

  const CreditsToggle = React.forwardRef(({ children, onClick }, ref) => (
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

  return (
    <Dropdown drop={'end'}>
      <Dropdown.Toggle as={CreditsToggle} id="dropdown-custom-components">
        Credits <span style={{ padding: '0px 10px 0px 64px' }}>&#x25B8;</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleFilterSelection("1")}>1</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("2")}>2</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("3")}>3</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("4")}>4</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("5")}>5</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CreditsFilter;
