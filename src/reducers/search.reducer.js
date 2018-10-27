import { movieConstants } from "../constants";

// Defining initialState here would be better here for readability

const initialState = { working: false, results: null, error: null };

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case movieConstants.SEARCH_MOVIES_REQUEST:
      return { working: true, error: null, results: null };
    case movieConstants.SEARCH_MOVIES_SUCCESS:
      return { working: false, results: action.movies, error: null };
    case movieConstants.SEARCH_MOVIES_FAILURE:
      return { working: false, error: action.error, results: null };
    default:
      return state;
  }
}
