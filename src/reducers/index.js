import authenticationReducer from "./authentication.reducer";
import movieReducer from "./movie.reducer";
import searchReducer from "./search.reducer";
import navReducer from "./nav.reducer";

export default function reducer(state, action) {
  console.log(action);
  state = authenticationReducer(state, action);
  state = { ...state };

  state.search = searchReducer(state.search, action);
  if (state.user) {
    state.user.movies = movieReducer(state.user.movies, action);
  }
  state.page = navReducer(state.page, action);
  return state;
}
