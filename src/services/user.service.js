import {authHeader} from '../helpers';

export const userService = {
	login,
	logout
};

function login(username, password){
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({username, password});
	};

	return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
		.then(handleResponse)
		.then(user => {
			if(user.token){
				localStorage.setItem('user', JSON.stringify(user));
			}

			return user;
		});
}

function logout(){
	localStorage.removeItem('user');
}

function signup(user){
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(user);
	};

	return fetch(`${config.apiUrl}/users/signup`, requestOptions).then(handleResponse);
}