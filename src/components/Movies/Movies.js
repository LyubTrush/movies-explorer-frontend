import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { moviesApi } from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NotFoundMessage from "../NotFoundMessage/NotFoundMessage";

const Movies = (props) => {
  // Это состояние будет содержать массив фильмов, полученных из API:
  const [movies, setMovies] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filmName, setFilmName] = useState("");
  const [isShortFilms, setIsShortFilms] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  //const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //эффект получения всех фильмов
  useEffect(() => {
    const savedFilms = JSON.parse(localStorage.getItem("allMovies"));
    if (savedFilms) {
      setMovies(savedFilms);
    } else {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((allMovies) => {
          setMovies(allMovies);
          localStorage.setItem("allMovies", JSON.stringify(allMovies));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
          setIsLoading(false);
        });
    }
  }, []);

  // Функция поиска фильмов по имени
  const searchMovie = (filmName, isShortFilms) => {
    setIsLoading(true);
    const filteredMoviesByName = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(filmName.toLowerCase())
    );
    let filteredMovies;
    // Если чекбокс активен (isShortFilms === true), применяем второй фильтр по короткометражкам
    if (isShortFilms) {
      filteredMovies = filteredMoviesByName.filter(
        (movie) => movie.duration <= 40
      );
    } else {
      filteredMovies = filteredMoviesByName;
    }
    setSearchResult(filteredMovies);
    setIsLoading(false);
    setIsSearched(true);
    // Сохраняем результат поиска в localStorage
    localStorage.setItem("searchResult", JSON.stringify(filteredMovies));
    localStorage.setItem("filmName", JSON.stringify(filmName));
    localStorage.setItem("isShortFilms", JSON.stringify(isShortFilms));
  };

  useEffect(() => {
    const savedSearchResult = JSON.parse(localStorage.getItem("searchResult"));
    if (savedSearchResult) {
      setSearchResult(savedSearchResult);
    }
    const savedFilmName = JSON.parse(localStorage.getItem("filmName"));
    if (savedFilmName) {
      setFilmName(savedFilmName);
    }

    const savedIsShortFilms = JSON.parse(localStorage.getItem("isShortFilms"));
    if (savedIsShortFilms) {
      setIsShortFilms(true);
    }
  }, []);
  return (
    <section className="movies">
      <SearchForm
        handleSearch={searchMovie}
        filmName={filmName}
        defaultValue={""}
        isShortFilms={isShortFilms}
      />
      {isLoading && <Preloader />}
      {!isLoading && (
        // Добавляем дополнительную проверку, чтобы отобразить NotFoundMessage только если был хотя бы один поиск и результат поиска пустой
        isSearched && searchResult.length === 0 && <NotFoundMessage />
      )}
      {/* Если searchResult не пустой, то отображаем MoviesCardList */}
      {searchResult.length > 0 && (
        <MoviesCardList movies={searchResult} isSavedPage={false} />
      )}
    </section>
  );
};

export default Movies;
