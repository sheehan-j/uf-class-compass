import Dropdown from 'react-multilevel-dropdown';
import React, { useState } from 'react';

const CreditsFilter = ({ onSelect }) => {
  const handleFilterSelection = (eventKey) => {
    const newKey = "Credits: " + eventKey;
    onSelect(newKey);
  };

  return (
    <>
      Credits 
      {/* <span style={{padding: '0px 10px 0px 64px'}}>&#x25B8;</span> */}
      <Dropdown.Submenu position='right' style={{ minWidth: '80px' }}>
         <Dropdown.Item onClick={() => handleFilterSelection("1")}>1 Credit</Dropdown.Item>
         <Dropdown.Item onClick={() => handleFilterSelection("2")}>2 Credits</Dropdown.Item>
         <Dropdown.Item onClick={() => handleFilterSelection("3")}>3 Credits</Dropdown.Item>
         <Dropdown.Item onClick={() => handleFilterSelection("4")}>4 Credits</Dropdown.Item>
         <Dropdown.Item onClick={() => handleFilterSelection("5")}>5 Credits</Dropdown.Item>
      </Dropdown.Submenu>
    </>
  );
}

export default CreditsFilter;
