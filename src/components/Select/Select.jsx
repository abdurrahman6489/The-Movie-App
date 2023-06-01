import React, { useState } from "react";
import "../../App.css";
import "./Select.css";
function Select({ options, labelContent, onChange, name }) {
  const [currentValue, setCurrentValue] = useState(options[0].value || "");
  function handleChange(event) {
    let value = event.target.value;
    setCurrentValue(value);
    onChange({ value, name });
  }
  return (
    <>
      <label htmlFor="select">{labelContent} &nbsp;</label>
      <select id="select" className="input-Elements" onChange={handleChange}>
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.content}
          </option>
        ))}
      </select>
    </>
  );
}
export default Select;
