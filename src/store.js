// In a react app where the state is provided by the server, 
// can pass in an intial state into createStore.
	// Can also save initial state in localStorage and... 
	// use that state in the same way with createStore
import {createStore} from 'redux';
import reducer from './reducer';
export default createStore(reducer);