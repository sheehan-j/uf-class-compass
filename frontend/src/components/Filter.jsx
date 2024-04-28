import Dropdown from 'react-multilevel-dropdown';
import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import ProfessorFilter from './ProfessorFilter';
import CreditsFilter from './CreditsFilter';
import LevelFilter from './LevelFilter';
import MeetingFilter from './MeetingFilter';
import BuildingFilter from './BuildingFilter';

const Filter = () => {
    const [activeItem, setActiveItem] = useState('Add Filter');
    const [clearInput, setClearInput] = useState(false);

    const handleFilterChange = (filter) => {
      setActiveItem(filter);
    };

    const clearFilters = () => {
      setActiveItem('Add Filter');
      // Additional logic to clear other filter states if needed
    };

  return(
    <Dropdown 
      position='right'
      title={activeItem}
      style={{ width: 'auto' }}
    >
        <Dropdown.Item style={{ width: '140px', margin: '0' }}> {/* Adjusted width and removed padding/margin */}
          <ProfessorFilter eventKey="Professor" onSelect={handleFilterChange}/>
        </Dropdown.Item>
        <Dropdown.Item style={{ width: '140px', margin: '0' }}>
          <CreditsFilter eventKey="Credits" onSelect={handleFilterChange}/>
        </Dropdown.Item>
        <Dropdown.Item style={{ width: '140px', margin: '0' }}>
          <LevelFilter eventKey="Level" onSelect={handleFilterChange}/>
        </Dropdown.Item>
        <Dropdown.Item style={{ width: '140px', margin: '0' }}>
          <MeetingFilter eventKey="Meeting" onSelect={handleFilterChange}/>
        </Dropdown.Item>
        <Dropdown.Item style={{ width: '140px', margin: '0' }}>
          <BuildingFilter eventKey="Building" onSelect={handleFilterChange}/>
        </Dropdown.Item>  
        <Dropdown.Item style={{ width: 'auto', margin: '0' }} onClick={clearFilters}>Clear Filter</Dropdown.Item>
      </Dropdown>
  );
}

export default Filter;
