import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <View style={styles.rowLayout} />;
  }
}

const styles = StyleSheet.create({
  rowLayout: {
    flex: 1,
    flexDirection: 'row',
  },
});

Header.propTypes = {};

export default Header;
