import {movieConstants} from '../constants';

export default function movieReducer(movies = [], action){
	switch (action.type){
		case movieConstants.DELETE_MOVIE_SUCCESS: 
			return movies.filter(movie => movie.id !== action.id);
// ...movie refers to all of the movie array
	// action.movie is one of the movie objects which the app will be working with
		case movieConstants.ADD_MOVIE_SUCCESS:
			return [...movies, action.movie]
	}
	return movies;
}