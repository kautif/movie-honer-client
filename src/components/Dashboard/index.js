import React from "react";
import { connect } from "react-redux";
import Movie from "../Movie";
import { deleteMovieAsync } from "../../actions";
import "./index.css";

export function generateMovie(deleteMovie, movie) {
  return (
    <Movie
      movie={movie}
      key={movie.id}
      image={movie.image}
      btnText="Delete Movie"
      action={deleteMovie.bind(null, movie.id)}
    />
  );
}

export function Dashboard(props) {
  const makeMovie = generateMovie.bind(null, props.deleteMovie);

  return (
    <div className="dashboard">
      <h2>My Movies</h2>
      <div className="movie-list">{props.movies.map(makeMovie)}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    movies: state.user ? state.user.movies : []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteMovie: id => dispatch(deleteMovieAsync(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

// Navigation bar component to display on all pages
// Going back to dashboard, able log out if logged in
// Searching
