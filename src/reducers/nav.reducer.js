import { navConstants, movieConstants, userConstants } from "../constants";

const initialState = navConstants.ABOUT;

export default function navReducer(state = initialState, action) {
  switch (action.type) {
    case navConstants.NAVIGATE:
      return action.page;
    case movieConstants.SEARCH_MOVIES_SUCCESS:
      return navConstants.RESULTS;
    case userConstants.LOGIN_SUCCESS:
    case userConstants.SIGNUP_SUCCESS:
    case userConstants.GETUSER_SUCCESS:
      return navConstants.DASHBOARD;
    default:
      return state;
  }
}
