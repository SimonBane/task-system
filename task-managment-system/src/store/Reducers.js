import * as actionTypes from './ActionTypes';

export function userAuthenticationReducer(state = {}, action){
    switch (action.type) {
        case actionTypes.REGISTER_USER:
        case actionTypes.LOGIN_USER:
        case actionTypes.LOGOUT_USER:
        case actionTypes.IS_LOGGED_USER:
            return Object.assign({}, action.user);

        default:
            return state;
    }
}