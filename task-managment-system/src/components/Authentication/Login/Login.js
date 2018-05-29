import React, { Component } from 'react';
import styles from './Login.css';
import Register from '../Register/Register';
import $ from 'jquery';

export default class Login extends Component {
    transitionHandler = () => {
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    }

    render() {
        return (
            <div className={styles.LoginPage}>
                <div className={styles.Form}>
                    <h3>Please login before proceeding further!</h3>
                    <Register transitionHandler={this.transitionHandler} />
                    <form className="login-form">
                        <input type="text" placeholder="username" />
                        <input type="password" placeholder="password" />
                        <button>login</button>
                        <p className={styles.Message} onClick={this.transitionHandler}>Not registered? <a href="#">Create an account</a></p>
                    </form>
                </div>
            </div>
        );
    }
}