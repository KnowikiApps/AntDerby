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

    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('@authenticated').then(value => {
      console.log(value);
      this.setState({ authenticated: value > 0 });
    });
  }

  logOut() {
    AsyncStorage.setItem('@authenticated', false)
      .then(() => this.setState({ authenticated: false }))
      .catch(err => console.log(err));
  }

  render() {
    return this.state.authenticated ? <AntPage /> : <LoginPage />;
  }
}

export default Home;
