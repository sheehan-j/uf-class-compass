import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import '../styles/FilterDropdown.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {ToggleButton,ToggleButtonGroup} from "react-bootstrap";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const MeetingFilter = () => {
  const [value, setValue] = useState([1, 14]);

  const MeetingToggle = React.forwardRef(({ children, onClick }, ref) => (
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
      <Dropdown.Toggle as={MeetingToggle} id="dropdown-custom-components">
        Day and Time <span style={{padding: '0px 10px 0px 20px'}}>&#x25B8;</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <ToggleButtonGroup type="checkbox">
        <ToggleButton id="tbg-check-1" value={1}>
          M
        </ToggleButton>
        <ToggleButton id="tbg-check-2" value={2}>
          T
        </ToggleButton>
        <ToggleButton id="tbg-check-3" value={3}>
          W
        </ToggleButton>
        <ToggleButton id="tbg-check-4" value={4}>
          R
        </ToggleButton>
        <ToggleButton id="tbg-check-5" value={5}>
          F
        </ToggleButton>
        <ToggleButton id="tbg-check-6" value={6}>
          S
        </ToggleButton>
      </ToggleButtonGroup>
      <div className="slider">Period {value[0]}-{value[1]}</div>
      <RangeSlider min={1} max={14} step={1} onInput={setValue}/>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MeetingFilter;
