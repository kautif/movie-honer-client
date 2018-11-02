import { movieConstants } from "../constants";

export default function movieReducer(movies = [], action) {
  switch (action.type) {
    case movieConstants.DELETE_MOVIE_SUCCESS:
      return movies.filter(movie => movie.id !== action.id);
    case movieConstants.ADD_MOVIE_SUCCESS:
      return [...movies, action.movie];
    default:
      return movies;
  }
}
