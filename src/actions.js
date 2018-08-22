import { userConstants} from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';


// Need synchronous and asynchronous versions of the actions below
	// (Why do we need both a synchronous and asynchronous version)
		// Asynchronous version making api call
		// Synchronous is what's updating the internal state
	// Login action
		const LOGIN = 'LOGIN';

		function login(){
			return {
				type: LOGIN
			};
		}

		function loginAsync(username, password){
			return dispatch => {
				dispatch(request({username}));

				userService.login(username, password)
					.then(
						user => {
							dispatch(success(user));
							history.push('/');
						},
						error => {
							dispatch(failure(error.toString()));
							dispatch(alertActions.error(error.toString()));
						}
					);
			};

			function request(user) {return {type: userConstants.LOGIN_REQUEST, user}}
			function success(user) {return {type: userConstants.LOGIN_SUCCESS, user}}
			function failure(user) {return {type: userConstants.LOGIN_FAILURE, error}}
		}
	// Logout action
		const LOGOUT = 'LOGOUT';

		function logout(){
			return {
				type: LOGOUT
			};
		}

		function logoutAsync(){
			return dispatch => {
				
			}
		}
	// Signup/register action
		const SIGN_UP = 'SIGN_UP';

		function signup(){
			return {
				type: SIGN_UP
			};
		}

		function signupAsync(){
			return dispatch => {
				
			}
		}
	// Submit search action
		const SEARCH = 'SEARCH';

		function search(){
			return {
				type: SEARCH
			};
		}

		function searchAsync(){
			return dispatch => {
				
			}
		}
	// Add movie action
		const ADD_MOVIE = 'ADD_MOVIE';

		function addMovie(){
			return {
				type: ADD_MOVIE
			};
		}

		function addMovieAsync(){
			return dispatch => {
				
			}
		}
	// Follow example: https://github.com/reduxjs/redux-thunk
		// incrementAsync will be an example of the pattern
// Start search action 
	// For each step in search, need an action 
		// (e.g. Category, Decade, year, quality);

		const CATEGORY = 'CATEGORY';

		function searchCategory(){
			return {
				type: CATEGORY
			};
		}

		const DECADE = 'DECADE';

		function searchDecade(){
			return {
				type: DECADE
			};
		}		

		const YEAR = 'YEAR';

		function searchYear(){
			return {
				type: YEAR
			};
		}

		const QUALITY = 'QUALITY';

		function searchQuality(){
			return {
				type: QUALITY
			};
		}