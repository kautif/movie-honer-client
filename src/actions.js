import { userConstants, movieConstants, navConstants } from "./constants";
import {
  findMovies,
  login,
  logout as doLogout,
  signup,
  getUser,
  addMovie,
  deleteMovie
} from "./api";

// Need synchronous and asynchronous versions of the actions below
// (Why do we need both a synchronous and asynchronous version)
// Asynchronous version making api call
// Synchronous is what's updating the internal state

export function navigate(page) {
  return { type: navConstants.NAVIGATE, page };
}

export function makeLoginAsync(login) {
  return function loginAsync(username, password) {
    return dispatch => {
      dispatch(request());

      login(username, password)
        .then(user => {
          dispatch(success(user));
        })
        .catch(error => {
          dispatch(failure(error.message));
          // dispatch(alertActions.error(error.message));
        });
    };

    function request() {
      return { type: userConstants.LOGIN_REQUEST };
    }
    function success(user) {
      return { type: userConstants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
      return { type: userConstants.LOGIN_FAILURE, error };
    }
  };
}

export const loginAsync = makeLoginAsync(login);

export function logout() {
  doLogout();
  return { type: userConstants.LOGOUT };
}

// Signup/register action

export function signupAsync(email, password) {
  return dispatch => {
    dispatch(request());

    return signup(email, password)
      .then(user => {
        dispatch(success(user));
      })
      .catch(error => {
        dispatch(failure(error.message));
      });
  };

  function request() {
    return { type: userConstants.SIGNUP_REQUEST };
  }
  function success(user) {
    return { type: userConstants.SIGNUP_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.SIGNUP_FAILURE, error };
  }
}

export function getUserAsync() {
  return dispatch => {
    dispatch(request());

    getUser()
      .then(user => {
        dispatch(success(user));
      })
      .catch(error => {
        dispatch(failure(error.message));
      });
  };

  function request() {
    return { type: userConstants.GETUSER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GETUSER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GETUSER_FAILURE, error };
  }
}

// Submit search action

// Missing a parameter?
export function searchAsync(category, year, quality) {
  // Put apiKey In .env file for server
  return dispatch => {
    dispatch(request());
    findMovies(category, year, quality)
      .then(movies => {
        if (movies.length === 0) {
          dispatch(failure("No results found. Try a different search."));
        } else {
          dispatch(success(movies));
        }
      })
      .catch(error => {
        dispatch(failure(error.message));
      });
  };

  function request() {
    return { type: movieConstants.SEARCH_MOVIES_REQUEST };
  }
  function success(movies) {
    return { type: movieConstants.SEARCH_MOVIES_SUCCESS, movies };
  }
  function failure(error) {
    return { type: movieConstants.SEARCH_MOVIES_FAILURE, error };
  }
}

// Add movie action
export function addMovieAsync(title, genre, year, quality, image, tmdbID) {
  return dispatch => {
    dispatch(request());
    addMovie(title, genre, year, quality, image, tmdbID)
      .then(movie => dispatch(success(movie)))
      .catch(error => dispatch(failure(error.message)));
  };

  function request() {
    return { type: movieConstants.ADD_MOVIE_REQUEST, tmdbID };
  }
  function success(movie) {
    return { type: movieConstants.ADD_MOVIE_SUCCESS, movie };
  }
  function failure(error) {
    return { type: movieConstants.ADD_MOVIE_FAILURE, error };
  }
}

export function deleteMovieAsync(id) {
  return dispatch => {
    dispatch(request());
    deleteMovie(id)
      .then(() => dispatch(success()))
      .catch(error => dispatch(failure(error.message)));
  };

  function request() {
    return { type: movieConstants.DELETE_MOVIE_REQUEST, id };
  }
  function success() {
    return { type: movieConstants.DELETE_MOVIE_SUCCESS, id };
  }
  function failure(error) {
    return { type: movieConstants.DELETE_MOVIE_FAILURE, error };
  }
}
// Follow example: https://github.com/reduxjs/redux-thunk
// incrementAsync will be an example of the pattern
// Start search action
// For each step in search, need an action
// (e.g. Category, Decade, year, quality);
