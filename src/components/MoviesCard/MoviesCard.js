import React, { useState } from "react";
import icon from "../../images/icon__save.svg";
import icon_delete from "../../images/delete_icon.svg";
import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import "./MoviesCard.css";

const MoviesCard = ({ card, isSavedPage }) => {
  const { savedMovies, setSavedMovies } = React.useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  // Проверяем наличие фильма в сохраненных фильмах для установления начального состояния
  React.useEffect(() => {
    console.log(savedMovies);
    const likedMovie = savedMovies.some(
      (movie) => movie.movieId === (card.id || card.movieId)
    );
    setIsLiked(likedMovie);
  }, [savedMovies, setSavedMovies, card.id, card.movieId]);
  //удаление
  function handleCardDelete(card) {
    const jwt = localStorage.getItem("jwt");
    const addedMovie = savedMovies.find(
      (movie) => movie.movieId === (card.id || card.movieId)
    );
    console.log(card);
    mainApi
      .deleteMovies(addedMovie._id)
      .then(() => {
        //удаляем выбранный фильм
        const updatedList = savedMovies.filter(
          (movie) => movie.movieId !== (card.id || card.movieId)
        );
        console.log(updatedList);
        setSavedMovies(updatedList);
        console.log(savedMovies);
        setIsLiked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // нажатие на кнопку сохранить
  const handleClick = () => {
    // Если фильм уже добавлен в сохраненные, удаляем его из сервера
    if (isLiked) {
      handleCardDelete(card);
    } else {
      // Если фильм не добавлен в сохраненные, сохраняем его на сервере
      const movieData = {
        movieId: card.id,
        country: card.country || "Unknown",
        director: card.director || "Unknown",
        duration: card.duration || 0,
        year: card.year || "Unknown",
        description: card.description || "No description available",
        image: `https://api.nomoreparties.co${card.image.url}` || "",
        trailerLink: card.trailerLink || "",
        nameRU: card.nameRU || "Unknown",
        nameEN: card.nameEN || "Unknown",
        thumbnail:
          `https://api.nomoreparties.co${card.image.formats.thumbnail.url}` ||
          "Unknown",
      };
      mainApi
        .addMovies(movieData)
        .then((data) => {
          // Добавляем фильм
          savedMovies.push(data);
          setSavedMovies(savedMovies);
          setIsLiked(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <li key={card.id} className="movies-card">
      <div className="movies-card__block">
        <h3 className="movies-card__title">{card.nameRU}</h3>
        <p className="movies-card__time">{card.duration} минут</p>
      </div>
      <a
        className="movies-card__trailer"
        href={card.trailerLink}
        rel="noreferrer"
        target="blank"
      >
        <img
          className="movies-card__image"
          src={
            isSavedPage
              ? `${card.image}`
              : `https://api.nomoreparties.co${card.image.url}`
          }
          alt="постер"
        />
      </a>
      <button
        className={`movies-card__save ${
          isLiked && !isSavedPage
            ? "movies-card__save_active"
            : isSavedPage
            ? "movies-card__delete_active"
            : ""
        }`}
        onClick={handleClick}
      >
        {isLiked && isSavedPage ? (
          <img src={icon_delete} alt="Delete" />
        ) : isLiked ? (
          <img src={icon} alt="Saved" />
        ) : (
          <span>Сохранить</span>
        )}
      </button>
    </li>
  );
};

export default MoviesCard;
