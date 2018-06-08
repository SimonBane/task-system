import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../../../store/Actions';


class Login extends Component {
    state = {
        user: {
            username: '',
            password: ''
        }
    }

    onChangeHandler = (event, field) => {
        let updatedUser = this.state.user;
        updatedUser[field] = event.target.value;

        this.setState({ user: updatedUser });
    }

    onLoginHandler = () => {
        this.props.login(this.state.user);
        this.props.history.push('/tasks');
    }

    render() {
        return (
            <div className="LoginPage">
                <div className="Form">
                    <h3>Please login before proceeding further!</h3>
                    <form className="login-form">
                        <input type="text" placeholder="Username" onChange={(event) => this.onChangeHandler(event, "username")}/>
                        <input type="password" placeholder="Password" onChange={(event) => this.onChangeHandler(event, "password")}/>
                        <button type="button" onClick={this.onLoginHandler}>login</button>
                        <p className="Message">Not registered? <Link to="/register">Create an account</Link></p>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        loggedUser: state.loggedUser
    }
 }

 const mapDispatchToProps = dispatch => {
     return{
         login: bindActionCreators(loginUser, dispatch)
     }
  }

 export default connect(mapStateToProps, mapDispatchToProps)(Login);