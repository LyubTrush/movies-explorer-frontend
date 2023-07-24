import React, { useState, useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

const MoviesCardList = (props) => {
  const [visibleCards, setVisibleCards] = useState(4); // Начальное количество видимых карточек
  //const [filteredMovies, setFilteredMovies] = useState([]); // Отфильтрованные фильмы
  const handleShowMore = () => {
    if (window.innerWidth >= 1277) {
      // Если ширина экрана больше или равна 880px, добавляем по 3 карточки
      setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
    } else if (window.innerWidth >= 768 && window.innerWidth < 1276) {
      // Если ширина экрана меньше 500px, добавляем по 2 карточки
      setVisibleCards((prevVisibleCards) => prevVisibleCards + 2);
    } else {
      // В остальных случаях (ширина экрана от 500px до 879px), добавляем по 2 карточки
      setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (props.isSavedPage) {
        // Если находимся на странице сохраненных фильмов, показываем все фильмы
        setVisibleCards(props.movies.length);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1276) {
        setVisibleCards(8); // Устанавливаем 8 видимых карточек для экранов шириной от 768px до 1276px
      } else if (window.innerWidth >= 1275) {
        setVisibleCards(12); // Устанавливаем 12 видимых карточек для экранов шириной от 1275px и выше
      } else {
        setVisibleCards(5); // Устанавливаем 5 видимых карточки для мобильных экранов шириной менее 768px
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
          <MoviesCard card={card} isSavedPage={props.isSavedPage} />
        ))}
      </ul>
      {visibleCards < props.movies.length && (
        <button
          className={`movies__more-btn ${
            props.isSavedPage ? "movies__more-btn_save" : ""
          }`}
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
