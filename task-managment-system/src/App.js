import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Switch } from 'react-router-dom';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import { checkUserSession, logoutUser } from './store/Actions';
import { bindActionCreators } from 'redux';
import Tasks from './components/Tasks/Tasks';
import Users from './components/Users/Users';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props, { isAuthenticated: false, isAdmin: false, });
    this.seedData();
    this.props.sessionCheck();
  }

  seedData() {
    let users = JSON.parse(localStorage.getItem('users'));
    if (!users || users.length === 0) {
      localStorage.setItem('users', JSON.stringify([{
        username: "simo",
        password: "simo",
        email: "simo@abv.bg",
        role: "admin"
      }]));
    }

    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks || tasks.length === 0) {
      localStorage.setItem('tasks', JSON.stringify([{
        user: "Simo",
        title: "First task",
        description: "Default task description.",
        priority: 1,
        status: "awaiting"
      }]));
    }

    let user = JSON.parse(localStorage.getItem('loggedUser'));
    if (!user) {
      localStorage.setItem('loggedUser', JSON.stringify({}));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedUser !== this.props.loggedUser) {
      this.setState((prevState) => {
        prevState.loggedUser = nextProps.loggedUser;
        prevState.isAuthenticated = typeof (nextProps.loggedUser.username) !== 'undefined';
        prevState.isAdmin = nextProps.loggedUser.role === 'admin';
      });
    }
  }


  discardSession = () => {
    this.props.logout();
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="App">
        <Layout isAuthenticated={this.state.isAuthenticated} isAdmin={this.state.isAdmin} logOut={this.discardSession}>
        </Layout>

        <Switch>
          {!this.state.isAuthenticated ? <Route path="/login" component={Login} /> : null}
          {!this.state.isAuthenticated ? <Route path="/register" component={Register} /> : null}
          {!this.state.isAuthenticated ? <Route path="/" component={Login} /> : null}
          {this.state.isAuthenticated ? <Route path="/tasks" component={Tasks} /> : null}
          {this.state.isAuthenticated && this.state.isAdmin ? <Route path="/users" component={Users} /> : null}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.loggedUser
  };
}

const mapDispatchToProps = dispatch => {
  return {
    sessionCheck: bindActionCreators(checkUserSession, dispatch),
    logout: bindActionCreators(logoutUser, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
