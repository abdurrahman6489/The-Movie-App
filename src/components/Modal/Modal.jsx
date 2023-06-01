import React, { useState } from "react";
import ReactDom from "react-dom";
import "./Modal.css";
function Modal({
  backdrop_path: src,
  title,
  vote_average: rating,
  original_language: language,
  release_date: date,
  overview,
  runtime: duration,
  genres,
  onClick,
}) {
  const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const moviePoster = IMAGE_URL + src;
  return ReactDom.createPortal(
    <>
      <div className="modal" id="modal">
        <div className="modal-header">
          <h1 className="movie-title">{title}</h1>
          <button
            id="closeBtn"
            className="closeButton"
            onClick={() => onClick(0)}
          >
            &times;
          </button>
        </div>
        <img src={moviePoster} alt={title} className="poster" />
        <div className="movie-details-container">
          <p className="rating-movie">Rating : {rating.toFixed(2)}</p>
          <p className="language-movie">Language : {language.toUpperCase()}</p>
          <p className="runtime-movie">Duration : {duration} mins</p>
          <p className="genres">Genres :&nbsp;</p>
          {genres.map((genre, index) => (
            <span className="genres" key={genre.name}>
              {index > 0 ? " - " : false}
              {genre.name}
            </span>
          ))}
          <div className="overview">Overview : {overview}</div>
        </div>
      </div>
      <div id="overlay" onClick={() => onClick(0)}></div>
    </>,
    document.getElementById("portal")
  );
}
export default Modal;
