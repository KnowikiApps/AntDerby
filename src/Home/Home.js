import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import AntPage from '../AntPage/AntPage.js';
import LoginPage from '../LoginPage/LoginPage.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.handleLoggedIn = this.handleLoggedIn.bind(this);
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth() {
    AsyncStorage.getItem('@authenticated').then(value => {
      console.log(value);
      this.setState({ authenticated: value > 0 });
    });
  }

  handleLogOut() {
    AsyncStorage.setItem('@authenticated', false)
      .then(() => this.setState({ authenticated: false }))
      .catch(err => console.log(err));
  }

  handleLoggedIn(username) {
    this.checkAuth();
    this.setState({ username: username });
  }

  render() {
    return this.state.authenticated ? (
      <AntPage onLoggedOut={this.handleLogOut} />
    ) : (
      <LoginPage onLoggedIn={this.handleLoggedIn} />
    );
  }
}

export default Home;
