import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    isAuthenticated: false,
    isAdmin: false
  }

  render() {
    const forceAuthentication = !this.state.isAuthenticated ? <Redirect from="/" to="/login" /> : null;

    return (
      <div className="App">
        {forceAuthentication}

        <Switch>
          <Route name="Login" path="/login" component={Login} />
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
