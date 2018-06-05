import { combineReducers } from 'redux';
import * as reducers from './Reducers';

const baseReducer = combineReducers({
    loggedUser: reducers.authenticationReducer
});

export default baseReducer;