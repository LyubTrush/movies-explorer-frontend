import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Cards from "../../utils/Cards";

const Movies = () => {
  return (
    <section className="movies">
      <SearchForm />
      {<MoviesCardList movies={Cards} />}
    </section>
  );
};

export default Movies;
