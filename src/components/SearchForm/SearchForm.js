import "./SearchForm.css";

const SearchForm = () => {
  return (
    <form className="search">
      <div className="search__block">
        <input className="search__input" type="text" placeholder="Фильм" />
        <button className="search_button">Найти</button>
      </div>
      <div className="search__toggle">
        <label className="search__tumbler">
          <input className="search__checkbox" type="checkbox" />

          <span className="search__slider"></span>
        </label>
        <p className="search__text">Короткометражки</p>
      </div>
    </form>
  );
};

export default SearchForm;
