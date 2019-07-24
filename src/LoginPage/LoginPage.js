import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';

import PropTypes from 'prop-types';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

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

LoginPage.propTypes = {};

export default LoginPage;
