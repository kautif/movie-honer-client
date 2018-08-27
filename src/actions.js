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
			userService.logout();
			return {type: userConstants.LOGOUT};
		}

		function logoutAsync(){
			return dispatch => {
				
			}
		}
	// Signup/register action
		const SIGN_UP = 'SIGN_UP';

		function signup(){
			return {
				type: SIGNUP
			};
		}

		function signupAsync(){
			return dispatch => {
				dispatch(request(user));

				userService.signupAsync(user)
					.then(
						user => {
							dispatch(success());
							history.push('/login');
							dispatch(alertActions.success('Successfully registered'));
						},

						error => {
							dispatch(failure(error.toString()));
							dispatch(alertActions.error(error.toString()));
						}
					);
			};

			function request(user){return {type: userConstants.SIGNUP_REQUEST, user}}
			function success(user){return {type: userConstants.SIGNUP_SUCCESS, user}}
			function failure(error){return {type: userConstants.SIGNUP_FAILURE, error}}
		}
	// Submit search action
		const SEARCH = 'SEARCH';

		function search(){
			return {
				type: SEARCH
			};
		}

		// Missing a parameter?
		function searchAsync(){
			let category;
			let decade;
			let year;
			let quality;
			let apiKey = '08eba60ea81f9e9cf342c7fa3df07bb6';
			return dispatch => {
				function getData(url = ``, data = {}){
					return fetch(url, {
						method: "GET",
						mode: "cors",
						cache: "no-cache",
						credentials: "same-origin",
						headers: {
							"Content-Type": "applicaiton/json; charset=utf-8"
						},
						redirect: "follow",
						referrer: "no-referrer",
						body: JSON.stringify(data)
					})
					.then(response => response.json());
				}
			}

			getData(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
				.then(data => console.log(JSON.stringify(data)))
				.catch(error => console.error(error));
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