import React from "react";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NotFoundMessage from "../NotFoundMessage/NotFoundMessage";

const SavedMovies = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // Вместо использования состояния movies из SavedMovies, используем пропс savedMovies
    if (!isSearching) {
      setSearchResult(props.savedMovies);
    } else if (searchResult.length > 0) {
      console.log();
      console.log(
        searchResult.filter(
          (movie) => movie.movieId === props.savedMovies.movieId
        )
      );
      setSearchResult(
        searchResult.filter((movie) =>
          props.savedMovies.find(
            (savedMovie) => savedMovie.movieId === movie.movieId
          )
        )
      );
    }
  }, [props.savedMovies]);

  // Функция поиска фильмов по имени
  const searchMovie = (filmName, isShortFilms) => {
    setIsSearching(true);
    setIsLoading(true);
    const filteredMoviesByName = props.savedMovies.filter((movie) =>
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
  };

  // Функция сброса поиска и возврата к отображению всего списка фильмов
  const resetSearch = () => {
    setSearchResult(props.savedMovies);
    setIsSearching(false);
  };

  return (
    <section className="movies">
      <SearchForm handleSearch={searchMovie} defaultValue={""} />
      {isSearching && (
        <button className="movies__all" onClick={resetSearch}>
          Показать все фильмы
        </button>
      )}
      {isLoading ? (
        <Preloader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : searchResult.length === 0 ? (
        <NotFoundMessage />
      ) : (
        <MoviesCardList
          movies={isSearching ? searchResult : props.savedMovies} // Отображение фильмов из searchResult, если выполняется поиск
          isSavedPage={true}
          isSearching={isSearching}
        />
      )}
    </section>
  );
};

export default SavedMovies;
