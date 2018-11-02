import React from "react";
import { connect } from "react-redux";
import Movie from "../Movie";
import { addMovieAsync } from "../../actions";
import "./index.css";

export function generateMovie(saveMovie, savedMovies, movie) {
  const hasMovie =
    savedMovies.find(movieItem => movieItem.tmdbID === movie.tmdbID) != null;
  return (
    <Movie
      movie={movie}
      key={movie.tmdbID}
      btnText={hasMovie ? "Movie Saved" : "Save Movie"}
      action={saveMovie.bind(null, movie)}
      disabled={hasMovie}
    />
  );
}

export function Results(props) {
  const makeMovie = generateMovie.bind(null, props.saveMovie, props.myMovies);

  return (
    <div className="results-page">
      <h2>Results</h2>
      <div className="results">{props.movies.map(makeMovie)}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    movies: state.search.results,
    myMovies: state.user.movies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveMovie: ({ title, genre, year, quality, image, tmdbID }) =>
      dispatch(addMovieAsync(title, genre, year, quality, image, tmdbID))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);
