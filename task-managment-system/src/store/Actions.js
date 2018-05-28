import * as actionTypes from './ActionTypes';

function registerUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user))
    let users = JSON.parse(localStorage.getItem('users'));
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return {
        type: actionTypes.REGISTER_USER,
        user
    }
}

