import React from "react";
import "./SearchForm.css";

const SearchForm = (props) => {
  const [filmName, setFilmName] = React.useState('');
  const [checkbox, setCheckbox] = React.useState(false)
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    setFilmName(props.filmName || props.defaultValue);
    setCheckbox(props.isShortFilms);
  },[props.defaultValue, props.isShortFilms, props.filmName]);
  

  function handleNameChange(e) {
    setFilmName(e.target.value);
    setError(''); 
  }

  function handleCheckboxChange(e) {
    const isShortFilms = e.target.checked;
    setCheckbox(isShortFilms);
    localStorage.setItem("searchFormCheckbox", checkbox);
    props.handleSearch(filmName, isShortFilms);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!filmName.trim()) {
      setError('Нужно ввести ключевое слово'); // Установка ошибки, если поле пустое
    } else {
      props.handleSearch(filmName, checkbox);
      setError(''); // Очистка ошибки, если введены данные
    }
  }

  return (
    <form className="search" onSubmit={handleSubmit} >
      <div className="search__block">
        <input className="search__input" value={filmName}  onChange={handleNameChange} type="text" placeholder="Фильм" />
         <span className="search__error">{error}</span>
        <button className="search__button" type="submit">Найти</button>
      </div>
      <div className="search__toggle">
        <label className="search__tumbler">
          <input className="search__checkbox" checked={checkbox} onChange={handleCheckboxChange} type="checkbox" />

          <span className="search__slider"></span>
        </label>
        <p className="search__text">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;
