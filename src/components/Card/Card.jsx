import React, { useState } from "react";
import "../../App.css";
import "./Card.css";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";
function Card({
  poster_path: src,
  title,
  vote_average: rating,
  original_language: language,
  release_date: date,
  id,
  overview,
  onClick,
}) {
  const [isClicked, setClicked] = useState(false);
  const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const moviePoster = IMAGE_URL + src;
  function handleClick(event) {
    console.dir(event.currentTarget);
    console.dir(event.target);
    if (
      event.currentTarget.id === "favorite" ||
      event.currentTarget.id === "unfavorite"
    ) {
      setClicked(!isClicked);
      event.stopPropagation();
      return;
    }
    onClick(id);
    console.log(id);
  }
  return (
    <div className="card stacked" key={title} name="card" onClick={handleClick}>
      <img src={moviePoster} alt={title} className="image" />
      <div className="descriptionContainer">
        <h1 className="title">{title}</h1>
        <p>Rating : {rating.toFixed(2)}</p>
        <p>Language : {language.toUpperCase()}</p>
        <p>Release Date : {date}</p>
        <p>
          {!isClicked && (
            <MdFavoriteBorder
              color="red"
              size={25}
              title="Add to Favorite"
              id="unfavorite"
              onClick={handleClick}
            />
          )}
          {isClicked && (
            <MdFavorite
              color="red"
              size={25}
              title="Remove from Favorite"
              id="favorite"
              onClick={handleClick}
            />
          )}
        </p>
      </div>
    </div>
  );
}
export default Card;
