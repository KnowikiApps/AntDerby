import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
  Image,
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
        await AsyncStorage.setItem('@authenticated', 'true');
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerLogo}>
          <Image
            source={require('../img/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.loginBox}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.fieldBkg}>
            <TextInput
              style={styles.field}
              onChangeText={text => this.setState({ username: text })}
              value={this.state.username}
            />
          </View>
          <Text style={styles.label}>Password</Text>
          <View style={styles.fieldBkg}>
            <TextInput
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
              style={styles.field}
              secureTextEntry
            />
          </View>
          <View style={styles.btnBox}>
            <Button title="Login" onPress={this.handleLogin} />
            {/* <Button title="Login" onPress={this.handleLogin} /> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#9A4242',
  },
  headerLogo: {
    width: '100%',
    height: '20%',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  fieldBkg: {
    backgroundColor: 'lightgrey',
  },
  label: {
    color: '#C1D895',
    fontSize: 20,
  },
  field: {
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 15,
    height: 40,
  },
  btnBox: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#2B580C',
  },
});

LoginPage.propTypes = {
  onLoggedIn: PropTypes.func,
};

export default LoginPage;
