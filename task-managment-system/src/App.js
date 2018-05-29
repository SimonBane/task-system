import React, { Component } from 'react';
import styles from './App.css';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Login from './components/Authentication/Login/Login';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  state = {
    isAuthenticated: false,
    isAdmin: false
  }

  render() {
    const forceAuthentication = !this.state.isAuthenticated ? <Redirect from="/" to="/login" /> : null;

    return (
      <div className={styles.App}>
        <Layout>

        </Layout>
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
