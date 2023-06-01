import React from "react";
import "../../App.css";
import "./Input.css";
function Input({ value, onChange, id, type, placeholder }) {
  function handleChange(event) {
    const value = event.target.value;
    onChange(value);
  }
  return (
    <input
      id={id}
      className="input-Elements"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
export default Input;
