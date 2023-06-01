import React, { useState } from "react";
import "../../App.css";
import "./Genre.css";
function Genre({ id, name, onClick }) {
  const [isClicked, setisClicked] = useState(false);
  function handleClick() {
    const value = !isClicked;
    setisClicked(value);
    onClick({ id: id, isClicked: value });
  }
  return (
    <button
      id={id}
      key={id}
      className={!isClicked ? "genre" : "genre active"}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}
export default Genre;
