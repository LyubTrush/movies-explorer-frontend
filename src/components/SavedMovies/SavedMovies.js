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
  const [isSearched, setIsSearched] = React.useState(false);

  React.useEffect(() => {
    // Вместо использования состояния movies из SavedMovies, используем пропс savedMovies
    if (!isSearching) {
      setSearchResult(props.savedMovies);
    } else if (searchResult.length > 0) {
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
    setIsSearched(true);
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
       {isLoading && <Preloader />}
      {!isLoading && (
        // Добавляем дополнительную проверку, чтобы отобразить NotFoundMessage только если был хотя бы один поиск и результат поиска пустой
        isSearched && searchResult.length === 0 && <NotFoundMessage />
      )}
      {/* Если searchResult не пустой, то отображаем MoviesCardList */}
      {searchResult.length > 0 && (
        <MoviesCardList movies={isSearching ? searchResult : props.savedMovies} // Отображение фильмов из searchResult, если выполняется поиск
        isSavedPage={true}
        isSearching={isSearching} />
      )}
      
    </section>
  );
};

export default SavedMovies;
