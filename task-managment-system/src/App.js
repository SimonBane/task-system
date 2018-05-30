import React, { Component } from 'react';
import styles from './App.css';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  state = {
    isAuthenticated: false,
    isAdmin: false
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
        prevState.isLogged = typeof (nextProps.currentUser.username) !== 'undefined';
        prevState.isAdmin = nextProps.currentUser.role === 'admin';
      });
    }
  }

  render() {
    const forceAuthentication = !this.state.isAuthenticated ? <Redirect from="/" to="/login" /> : null;

    return (
      <div className={styles.App}>
        {forceAuthentication}
        
        <Layout isAuthenticated={this.state.isAuthenticated}>
        </Layout>

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" />
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
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
