import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = (props) => {
  const [visibleCards, setVisibleCards] = useState(4); // Начальное количество видимых карточек

  const handleShowMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 4); // Увеличиваем количество видимых карточек на 4
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1276) {
        setVisibleCards(8); // Устанавливаем 8 видимых карточек для экранов шириной от 768px до 1276px
      } else if (window.innerWidth >= 1275) {
        setVisibleCards(12); // Устанавливаем 12 видимых карточек для экранов шириной от 1275px и выше
      } else {
        setVisibleCards(5); // Устанавливаем 4 видимых карточки для мобильных экранов шириной менее 768px
      }
    };

    handleResize(); // Вызываем функцию при монтировании компонента, чтобы установить правильное количество видимых карточек в зависимости от размера экрана

    window.addEventListener("resize", handleResize); // Слушаем изменения размера экрана и обновляем количество видимых карточек при необходимости

    return () => {
      window.removeEventListener("resize", handleResize); // Отписываемся от событий при размонтировании компонента
    };
  }, []);

  return (
    <>
      <ul className="movies-list">
        {props.movies.slice(0, visibleCards).map((card) => (
          <MoviesCard card={card} isLiked={card.isLiked} />
        ))}
      </ul>
      {visibleCards < props.movies.length && (
        <button
          className="movies__more-btn"
          type="submit"
          onClick={handleShowMore}
        >
          Ещё
        </button>
      )}
    </>
  );
};

export default MoviesCardList;
