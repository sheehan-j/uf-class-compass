import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../styles/FilterDropdown.css';
import "bootstrap/dist/css/bootstrap.min.css";

const ProfessorFilter = ({onSelect}) => {
  const handleFilterSelection = (eventKey) => {
    const newKey = "Professor: " + eventKey;
    onSelect(newKey);
  };

  const ProfToggle = React.forwardRef(({ children, onClick }, ref) => (
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

  const ProfMenu = React.forwardRef(
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
      <Dropdown.Toggle as={ProfToggle} id="dropdown-custom-components">
        {/* Professor <span style={{float:'right', padding: '0px 10px 0px 0px'}}>&#x25B8;</span> */}
        Professor <span style={{padding: '0px 10px 0px 49px'}}>&#x25B8;</span>
      </Dropdown.Toggle>

      <Dropdown.Menu as={ProfMenu}>
        <Dropdown.Item onClick={() => handleFilterSelection("Rong Zhang")}>Rong Zhang</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("David Wright")}>David Wright</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("Albert Ritzhaupt")}>Albert Ritzhaupt</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("Albert Gator")}>Albert Gator</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfessorFilter;
