import * as actionTypes from './ActionTypes';

export function authenticationReducer(state = {}, action){
    switch (action.type) {
        case actionTypes.REGISTER_USER:
        case actionTypes.LOGIN_USER:
        case actionTypes.LOGOUT_USER:
        case actionTypes.USER_SESSION:
            return Object.assign({}, action.user);

        default:
            return state;
    }
}