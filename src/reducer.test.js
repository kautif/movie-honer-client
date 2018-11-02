import reducer from "./reducers/index";
import thunk from "redux-thunk";
import { userConstants, navConstants, movieConstants } from "./constants";

const initialState = {
  working: false,
  error: null
};

describe("authentication reducer", () => {
  it("handles login request", () => {
    const expected = {
      working: true,
      error: null,
      page: navConstants.ABOUT,
      search: {
        error: null,
        results: null,
        working: false
      }
    };
    expect(
      reducer(initialState, { type: userConstants.LOGIN_REQUEST })
    ).toEqual(expected);
  });

  it("handles login success", () => {
    const user = {
      email: "theman@gmail.com",
      movies: []
    };

    const expected = {
      user,
      working: false,
      error: null,
      page: navConstants.DASHBOARD,
      search: {
        error: null,
        results: null,
        working: false
      }
    };
    expect(
      reducer(initialState, { type: userConstants.LOGIN_SUCCESS, user })
    ).toEqual(expected);
  });

  it("handles login failure", () => {
    const error = "Invalid login";
    const expected = {
      working: false,
      error,
      page: navConstants.ABOUT,
      search: {
        error: null,
        results: null,
        working: false
      }
    };
    expect(
      reducer(initialState, { type: userConstants.LOGIN_FAILURE, error })
    ).toEqual(expected);
  });
});

describe("movie reducer", () => {
  it("handles ADD_MOVIE", () => {
    const movie = {
      id: 2,
      title: "Movie Y"
    };

    const initialState = {
      working: false,
      error: null,
      page: "RESULTS",
      search: {
        error: null,
        results: null,
        working: false
      },
      user: {
        email: "theman@gmail.com",
        movies: [{ id: 1, title: "Movie X" }]
      }
    };

    const expected = {
      ...initialState,
      user: {
        ...initialState.user,
        movies: [...initialState.user.movies, movie]
      }
    };

    expect(
      reducer(initialState, { type: movieConstants.ADD_MOVIE_SUCCESS, movie })
    ).toEqual(expected);
  });

  it("handles DELETE_MOVIE", () => {
    const initialState = {
      working: false,
      error: null,
      page: "RESULTS",
      search: {
        error: null,
        results: null,
        working: false
      },
      user: {
        email: "theman@gmail.com",
        movies: [{ id: 1, title: "Movie X" }]
      }
    };

    const expected = {
      ...initialState,
      user: {
        ...initialState.user,
        movies: []
      }
    };

    expect(
      reducer(initialState, {
        type: movieConstants.DELETE_MOVIE_SUCCESS,
        id: 1
      })
    ).toEqual(expected);
  });
});

describe("nav reducer", () => {
  it("handles nav request", () => {
    const page = "MOVIES";
    const initialState = {
      working: false,
      error: null,
      page: "RESULTS",
      search: {
        error: null,
        results: null,
        working: false
      },
      user: {
        email: "theman@gmail.com",
        movies: [{ id: 1, title: "Movie X" }]
      }
    };

    const expected = {
      ...initialState,
      page
    };

    expect(
      reducer(initialState, {
        type: navConstants.NAVIGATE,
        page
      })
    ).toEqual(expected);
  });
});

describe("search reducer", () => {
  it("handles search request", () => {
    const initialState = {
      working: false,
      error: null,
      page: "RESULTS",
      search: {
        error: null,
        results: null,
        working: false
      },
      user: {
        email: "theman@gmail.com",
        movies: [{ id: 1, title: "Movie X" }]
      }
    };

    const expected = {
      ...initialState,
      search: {
        error: null,
        results: null,
        working: true
      }
    };
    expect(
      reducer(initialState, { type: movieConstants.SEARCH_MOVIES_REQUEST })
    ).toEqual(expected);
  });

  it("handles search success", () => {
    const initialState = {
      working: false,
      error: null,
      page: navConstants.RESULTS,
      search: {
        error: null,
        results: null,
        working: false
      },
      user: {
        email: "theman@gmail.com",
        movies: [{ id: 1, title: "Movie X" }]
      }
    };
    const results = [{ id: 1, title: "Star Wars" }];

    const expected = {
      ...initialState,
      search: {
        error: null,
        results,
        working: false
      }
    };
    expect(
      reducer(initialState, {
        type: movieConstants.SEARCH_MOVIES_SUCCESS,
        movies: results
      })
    ).toEqual(expected);
  });
  it("handles search failure", () => {
    const initialState = {
      working: false,
      error: null,
      page: "RESULTS",
      search: {
        error: null,
        results: null,
        working: false
      },
      user: {
        email: "theman@gmail.com",
        movies: [{ id: 1, title: "Movie X" }]
      }
    };
    const error = "Movie not found";
    const expected = {
      ...initialState,
      search: {
        error,
        results: null,
        working: false
      }
    };
    expect(
      reducer(initialState, {
        type: movieConstants.SEARCH_MOVIES_FAILURE,
        error
      })
    ).toEqual(expected);
  });
});
