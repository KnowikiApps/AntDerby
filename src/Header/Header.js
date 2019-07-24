import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.colLayout}>
        <View style={styles.row1}>
          <Image
            source={require('../img/Logo.png')}
            style={styles.antImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.row2}>
          <Text>Welcome Dude!</Text>
        </View>
        <View style={styles.row3}>
          <Text>Welcome Dude!</Text>
          <Button
            title="Calculate Odds"
            onPress={() => {
              console.log('calculate odds');
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  colLayout: {
    height: '25%',
    width: '100%',
    backgroundColor: '#afa939',
  },
  row1: {
    flex: 1,
  },
  row2: {
    flex: 1,
  },
  row3: {
    flex: 1,
    flexDirection: 'row',
  },
  antImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});

Header.propTypes = {};

export default Header;
