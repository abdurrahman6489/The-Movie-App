import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Card from "./components/Card/Card";
import Nav from "./components/Nav/Nav";
import Genre from "./components/Genre/Genre";
import Select from "./components/Select/Select";
import Input from "./components/Input/Input";
import Modal from "./components/Modal/Modal";
import "./App.css";
function App() {
  //state hooks apply
  const [movieData, setMovieData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [sortBy, setSortBy] = useState("ratingDesc");
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [queryParameter, setQueryParameter] = useState("now_playing");
  const [modalStatus, setModalStatus] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  //API endpoint Url & queries
  const API_KEY = "api_key=7c5c9621868ea67c0f1ac5f1719ab556";
  const BASE_URL = "https://api.themoviedb.org/3/";
  const query = `movie/${queryParameter}?`;
  const languageQuery = "&language=en-US";
  const pageQuery = "&page=1";
  const API_URL = BASE_URL + query + API_KEY + languageQuery + pageQuery;
  const genreQuery = BASE_URL + "genre/movie/list?" + API_KEY + languageQuery;
  const searchQuery = "search/movie?";
  const searchURL = BASE_URL + searchQuery + API_KEY + "&query=";
  const withGenreUrl =
    API_URL + "&with_genres=" + encodeURI(selectedGenre.join(","));

  async function fetchMovieData() {
    let url = getCurrentUrl();
    const response = await fetch(url);
    const data = await response.json();
    setMovieData(data.results);
  }

  async function fetchGenreData() {
    const response = await fetch(genreQuery);
    const data = await response.json();
    setGenreData(data.genres);
  }
  async function fetchSelectedMovie(id) {
    // https://api.themoviedb.org/3/movie/157336?api_key=7c5c9621868ea67c0f1ac5f1719ab556
    let url = BASE_URL + "movie/" + id + "?" + API_KEY;
    console.log(url);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setSelectedMovie(data);
    setModalStatus(true);
  }

  useEffect(() => {
    fetchMovieData();
  }, [selectedGenre, searchedMovie, queryParameter]);

  useEffect(() => {
    fetchGenreData();
  }, []);

  function getCurrentUrl() {
    let url =
      searchedMovie || (selectedGenre.length > 0 && withGenreUrl) || API_URL;
    return url;
  }

  function handleSelectedMovie(id) {
    console.log(id);
    if (id === 0) {
      setModalStatus(false);
      return;
    }
    fetchSelectedMovie(id);
  }

  function handleGenre(genreData) {
    setSelectedGenre((current) =>
      genreData.isClicked
        ? [...current, genreData.id]
        : current.filter((elem) => elem != genreData.id)
    );
    setSearchedMovie("");
  }

  function handleInput(value) {
    setCurrentSearch(value);
  }

  function handleSearch() {
    if (currentSearch) setSearchedMovie(searchURL + currentSearch);
    setCurrentSearch("");
  }

  function convertSelectItemsIntoOptions(valueArray, contentArray) {
    const options = valueArray.map((item, index) => ({
      value: item,
      content: contentArray[index],
    }));
    return options;
  } //it may make the code complicated. its better to make separate optons array for each selected tag.

  function onOptionChangeHandler({ value, name }) {
    // setSortBy(value);
    if (name === "setQueryParameter") setSearchedMovie("");
    selectObj[name](value);
  }

  //make all the select tag arrays here and put the setuSeState method name in the selectObj below the arrays here
  const sortingOptions = [
    { value: "ratingDesc", content: "Rating-Descending" },
    { value: "ratingAsc", content: "Rating-Ascending" },
    { value: "releaseAsc", content: "Release-Ascending" },
    { value: "releaseDesc", content: "Release-Descending" },
  ];

  const apiQueryOptions = [
    { value: "now_playing", content: "Now Playing" },
    { value: "popular", content: "Popularity" },
    { value: "top_rated", content: "Top Rated" },
    { value: "upcoming", content: "Upcoming" },
  ];

  const selectObj = { setSortBy, setQueryParameter };

  const sortedArray =
    movieData.slice().sort((a, b) => {
      if (sortBy === "ratingAsc") return a.vote_average - b.vote_average;
      else if (sortBy === "ratingDesc") return b.vote_average - a.vote_average;
      else if (sortBy === "releaseAsc")
        return a.release_date.localeCompare(b.release_date);
      else return b.release_date.localeCompare(a.release_date);
    }) || [];

  return (
    <main className="flexContainer">
      {modalStatus && (
        <Modal {...selectedMovie} onClick={handleSelectedMovie} />
      )}
      <Nav>
        <div className="container queryContainer">
          <Select
            onChange={onOptionChangeHandler}
            labelContent="Get Movies by"
            options={apiQueryOptions}
            name="setQueryParameter"
          />
        </div>
        <div className="container sortContainer">
          <Select
            onChange={onOptionChangeHandler}
            labelContent="Sort Movies by"
            options={sortingOptions}
            name="setSortBy"
          />
        </div>
        <div className="container searchContainer">
          <Input
            id="searchInput"
            type="text"
            value={currentSearch}
            placeholder="Search Movie"
            onChange={handleInput}
          />
          &nbsp;
          <button id="searchBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </Nav>
      <div className="genreContainer">
        {genreData.length === 0 ||
          genreData.map((genre) => (
            <Genre {...genre} onClick={handleGenre} key={genre.id} />
          ))}
      </div>
      <div className="movieContainer">
        {sortedArray.length > 0 &&
          sortedArray.map((movieObj) => (
            <Card
              {...movieObj}
              onClick={handleSelectedMovie}
              key={movieObj.id}
            />
          ))}
      </div>
    </main>
  );
}
export default App;
/* 
other end point Urls
https://api.themoviedb.org/3/movie/upcoming
https://api.themoviedb.org/3/movie/top_rated
https://api.themoviedb.org/3/movie/popular
*/
