import React, { useState } from "react";
import icon from "../../images/icon__save.svg";

import "./MoviesCard.css";

const MoviesCard = ({ card }) => {
  const [isLiked, setIsLiked] = useState(false);
  // нажатие на кнопку сохранить
  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <li key={card.id} className="movies-card">
      <div className="movies-card__block">
        <h3 className="movies-card__title">{card.name}</h3>
        <p className="movies-card__time">{card.duration}</p>
      </div>
      <a
        className="movie-card__trailer"
        href="https://www.youtube.com/watch?v=GNrdg3PzpJQ"
        rel="noreferrer"
        target="_blank"
      >
        <img className="movies-card__image" src={card.src} alt="постер" />
      </a>
      <button
        className={`movies-card__save ${isLiked && "movies-card__save_active"}`}
        onClick={handleClick}
      >
        {isLiked ? <img src={icon} alt="Saved" /> : <p>Сохранить</p>}
      </button>
    </li>
  );
};

export default MoviesCard;
