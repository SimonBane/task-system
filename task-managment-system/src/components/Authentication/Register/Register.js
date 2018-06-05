import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Register.css";
import * as roles from '../Roles';
import { bindActionCreators } from 'redux'
import { registerUser } from '../../../store/Actions';
import { connect } from 'react-redux';

class Register extends Component {
    state = {
        user: {
            username: '',
            password: '',
            email: '',
            role: roles.USER
        }
    }

    onChangeHandler = (event, field) => {
        let updatedUser = this.state.user;
        updatedUser[field] = event.target.value;

        this.setState({ user: updatedUser });
    }

    registerUser = (event) => {
        this.props.registerUser(this.state.user);
    }

    render() {
        return (
            <div className={styles.RegisterPage}>
                <div className={styles.Form}>
                    <h3>Create an account!</h3>
                    <form>
                        <input type="text" placeholder="Username" onChange={(event) => this.onChangeHandler(event, "username")} />
                        <input type="password" placeholder="Password" onChange={(event) => this.onChangeHandler(event, "password")} />
                        <input type="text" placeholder="Email address" onChange={(event) => this.onChangeHandler(event, "email")} />
                        <button onClick={(event) => this.registerUser(event)} >create</button>
                        <p>Already registered? <Link to="/login">Sign In</Link></p>
                    </form>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        loggedUser: state.loggedUser
    };
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: bindActionCreators(registerUser, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);