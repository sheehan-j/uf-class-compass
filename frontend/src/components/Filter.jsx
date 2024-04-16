import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import '../styles/FilterDropdown.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import ProfessorFilter from './ProfessorFilter';
import CreditsFilter from './CreditsFilter';
import LevelFilter from './LevelFilter';
import MeetingFilter from './MeetingFilter';
import BuildingFilter from './BuildingFilter';


const Filter = ({filter,key,onSelect,onDelete}) => {
    const [activeItem, setActiveItem] = useState('Add Filter');
    const [activeState, setActiveState] = useState('+');
    

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className = "drop"
      >
        {children}
      </a>
      )
    );
  
    const CustomX = React.forwardRef(({ children, onClick }, ref) => (
      <a
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className = "FilterX"
      >
        {children}
      </a>
      )
    );

    const [value, setValue] = useState('');

    const handleFilterChange = (filter) => {
      setValue('');
      setActiveItem(filter);
      setActiveState('x');
      onSelect(filter);
    };
  
    const CustomMenu = React.forwardRef(
      ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
  
        return (
          <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
          >
            <ul className="list-unstyled">
              {React.Children.toArray(children).filter(
                (child) =>
                  !value || child.props.children.toLowerCase().startsWith(value),
              ).map((child) => (
                <li key={child.props.eventKey} className={child.props.eventKey === activeItem ? 'active' : ''}>
                  {React.cloneElement(child, { onSelect: handleFilterChange })} {/* Pass handleFilterChange as onSelect prop */}
                </li>
              ))}
            </ul>
          </div>
        );
      },
    );
  
    const handleClick = () => {
      setActiveState('+');
      setActiveItem('Add Filter');
      onDelete();
    }

  return(
    <Dropdown as={ButtonGroup}>
    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
      {activeItem}
    </Dropdown.Toggle>

    <Dropdown.Menu as={CustomMenu}>
      <ProfessorFilter eventKey="Professor" onSelect={handleFilterChange} />
      <CreditsFilter eventKey="Credits" onSelect={handleFilterChange} />
      <LevelFilter eventKey="Level" onSelect={handleFilterChange} />
      <MeetingFilter evetnKey="Meeting" onSelect={handleFilterChange} />
      <BuildingFilter eventKey="Building" onSelect={handleFilterChange} />
    </Dropdown.Menu>
    <Button as={CustomX} onClick={handleClick}>{activeState}</Button>
  </Dropdown>
  );
}

export default Filter;
