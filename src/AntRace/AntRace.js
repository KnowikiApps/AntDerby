import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import PropTypes from 'prop-types';

class AntRace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.layout}>
        <View style={styles.animatedAnt}>
          <Image
            source={require('../img/Ant.png')}
            style={styles.antImage}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    height: '15%',
    width: '100%',
    backgroundColor: '#EAD0A8',
  },
  antImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  animatedAnt: {
    width: '20%',
    height: '100%',
  },
});

AntRace.propTypes = {};

export default AntRace;
