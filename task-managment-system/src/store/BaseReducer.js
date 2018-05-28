import { combineReducers } from 'redux';
import * as reducers from './Reducers';

const baseReducer = combineReducers({
    currentUser: reducers.userAuthenticationReducer
});

export default baseReducer;