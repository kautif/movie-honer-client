// In a react app where the state is provided by the server, 
// can pass in an intial state into createStore.
	// Can also save initial state in localStorage and... 
	// use that state in the same way with createStore
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
export default createStore(reducer, applyMiddleware(thunk));