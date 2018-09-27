import { userConstants, navConstants } from "../constants";

const initialState = { user: undefined, working: false };

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
    case userConstants.SIGNUP_REQUEST:
    case userConstants.GETUSER_REQUEST:
      return {
        ...state,
        error: null,
        working: true
      };
    case userConstants.LOGIN_SUCCESS:
    case userConstants.SIGNUP_SUCCESS:
    case userConstants.GETUSER_SUCCESS:
      return {
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
    case userConstants.SIGNUP_FAILURE:
      return { ...state, error: action.error, working: false };
    case userConstants.GETUSER_FAILURE:
      return { ...state, error: null, working: false };
    case userConstants.LOGOUT:
      return initialState;
    case navConstants.NAVIGATE:
      return { ...state, error: null };
  }
  return state;
}
