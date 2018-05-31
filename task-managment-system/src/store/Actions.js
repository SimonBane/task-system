import * as actionTypes from './ActionTypes';

export function registerUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
    let users = JSON.parse(localStorage.getItem('users'));
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return {
        type: actionTypes.REGISTER_USER,
        user
    }
}

export function loginUser(user) {
    let result = {};

    let users = JSON.parse(localStorage.getItem('users'));
    users.forEach(userEntity => {
        if (user.username === userEntity.username && user.password === userEntity.password) {
            result = userEntity;
        }
    });

    localStorage.setItem('currentUser', JSON.stringify(result));
    return {
        type: actionTypes.LOGIN_USER,
        user: result
    };
}

export function isUserLoggedIn() {
    let storedUser = JSON.parse(localStorage.getItem('currentUser'));
    return {
      type: actionTypes.IS_LOGGED_USER,
      user: storedUser
    }
  }