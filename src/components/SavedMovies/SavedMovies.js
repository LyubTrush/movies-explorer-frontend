import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Cards from "../../utils/CardsSave";

const SavedMovies = () => {
  return (
    <section className="movies">
      <SearchForm />
      {<MoviesCardList movies={Cards} />}
    </section>
  );
};

export default SavedMovies;
