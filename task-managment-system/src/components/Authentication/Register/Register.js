import React from 'react';

const register = (props) => {
    return (
        <form>
            <input type="text" placeholder="name" />
            <input type="password" placeholder="password" />
            <input type="text" placeholder="email address" />
            <button>create</button>
            <p onClick={props.transitionHandler}>Already registered? <a href="#">Sign In</a></p>
        </form>
    );
};

export default register;