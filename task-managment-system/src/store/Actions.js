import * as actionTypes from './ActionTypes';

export function registerUser(user) {
    localStorage.setItem('loggedUser', JSON.stringify(user))
    let users = JSON.parse(localStorage.getItem('users'));
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return {
        type: actionTypes.REGISTER_USER,
        user
    }
}

export function loginUser(user) {
    let loggedUser = {};

    let users = JSON.parse(localStorage.getItem('users'));
    users.forEach(userEntity => {
        if (user.username === userEntity.username && user.password === userEntity.password) {
            loggedUser = userEntity;
        }
    });

    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    return {
        type: actionTypes.LOGIN_USER,
        user: loggedUser
    };
}

export function logoutUser() {
    localStorage.setItem('loggedUser', JSON.stringify({}))
    return {
        type: actionTypes.LOGOUT_USER,
        user: {}
    }
}

export function checkUserSession() {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    return {
        type: actionTypes.USER_SESSION,
        user: loggedUser
    }
}
