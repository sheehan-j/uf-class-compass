import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../styles/FilterDropdown.css';
import "bootstrap/dist/css/bootstrap.min.css";

const BuildingFilter = ({onSelect}) => {
  const handleFilterSelection = (eventKey) => {
    const newKey = "Building: " + eventKey;
    onSelect(newKey);
  };

  const BuildingToggle = React.forwardRef(({ children, onClick }, ref) => (
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

  const BuildingMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
          drop={'end'}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );


  return(
    <Dropdown drop={'end'}>
      <Dropdown.Toggle as={BuildingToggle} id="dropdown-custom-components">
        Building <span style={{padding: '0px 10px 0px 57px'}}>&#x25B8;</span>
      </Dropdown.Toggle>

      <Dropdown.Menu as={BuildingMenu}>
        <Dropdown.Item onClick={() => handleFilterSelection("Building 1")}>Building 1</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("Building 2")}>Building 2</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("Building 3")}>Building 3</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("Building 4")}>Building 4</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BuildingFilter;
