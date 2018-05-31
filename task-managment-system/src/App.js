import React, { Component } from 'react';
import styles from './App.css';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Tasks from './components/Tasks/Tasks';
import { isUserLoggedIn } from './store/Actions';
import { bindActionCreators } from 'redux'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props, { isAuthenticated: false, isAdmin: false });
    this.props.isLoggedInUser();
  }

  seedData() {
    let usersArr = JSON.parse(localStorage.getItem('users'));
    if (!usersArr || usersArr.length === 0) {
      localStorage.setItem('users', JSON.stringify([{
        username: "simo",
        password: "simo",
        email: "simo@abv.bg",
        role: "admin"
      }]));
    }

    let _currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!_currentUser) {
      localStorage.setItem('currentUser', JSON.stringify({}));
    }
  }

  componentWillMount() {
    this.seedData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== this.props.currentUser) {
      this.setState((prevState) => {
        prevState.currentUser = nextProps.currentUser;
        prevState.isAuthenticated = typeof (nextProps.currentUser.username) !== 'undefined';
        prevState.isAdmin = nextProps.currentUser.role === 'admin';
      });
    }
  }

  render() {

    return (
      <div className={styles.App}>
        <Layout isAuthenticated={this.state.isAuthenticated}>
        </Layout>

        <Switch>
          {!this.state.isAuthenticated ? <Route path="/login" component={Login} /> : null}
          {!this.state.isAuthenticated ? <Route path="/register" component={Register} /> : null}
          {!this.state.isAuthenticated ? <Route path= "/" component={Login} /> : null}
          {this.state.isAuthenticated ? <Route path="/tasks" component={Tasks} /> : null}
          {this.state.isAuthenticated ? <Route path="/" component={Tasks} /> : null}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
}

const mapDispatchToProps = dispatch => {
  return {
    isLoggedInUser: bindActionCreators(isUserLoggedIn, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
