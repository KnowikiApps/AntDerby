import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
} from 'react-native';

import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {}

  async handleLogin() {
    if (this.state.username !== '' && this.state.password !== '') {
      try {
        await AsyncStorage.setItem('@authenticated', true);
      } catch (e) {
        console.log(e);
      } finally {
        this.props.onLoggedIn(this.state.username);
      }
    } else {
      Alert.alert(
        'Empty Login Error',
        'Username and Password Required',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.colLayout}>
        <View style={styles.rowStyle}>
          <Text style={styles.label}>Username</Text>
        </View>
        <View style={styles.rowStyle}>
          <TextInput
            onChangeText={text => this.setState({ username: text })}
            value={this.state.username}
            style={styles.field}
          />
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.label}>Password</Text>
        </View>
        <View style={styles.rowStyle}>
          <TextInput
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
            style={styles.field}
            secureTextEntry
          />
        </View>
        <View style={styles.rowStyle}>
          <Button title="Login" onPress={this.handleLogin} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  colLayout: {
    flex: 1,
  },
  field: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  label: {
    width: 100,
    height: '100%',
  },
  rowStyle: {
    flex: 1,
  },
});

LoginPage.propTypes = {
  onLoggedIn: PropTypes.func,
};

export default LoginPage;
