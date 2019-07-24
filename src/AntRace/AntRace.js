import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types';

class AntRace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ant1: new Animated.Value(0),
      ant2: new Animated.Value(0),
      ant3: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.ant1, {
      toValue: Dimensions.get('window').width,
      easing: Easing.ease,
      duration: Math.floor(Math.random() * 20000 + 10000),
    }).start();
    Animated.timing(this.state.ant2, {
      toValue: Dimensions.get('window').width,
      easing: Easing.ease,
      duration: Math.floor(Math.random() * 20000 + 10000),
    }).start();
    Animated.timing(this.state.ant3, {
      toValue: Dimensions.get('window').width,
      easing: Easing.ease,
      duration: Math.floor(Math.random() * 20000 + 10000),
    }).start();
  }

  render() {
    return (
      <View style={styles.layout}>
        <Animated.View style={[styles.racetrack]}>
          <Animated.Image
            source={require('../img/Ant.png')}
            style={[styles.antImage, { left: this.state.ant1 }]}
            resizeMode="contain"
          />
          <Animated.Image
            source={require('../img/Ant.png')}
            style={[styles.antImage, { left: this.state.ant2 }]}
            resizeMode="contain"
          />
          <Animated.Image
            source={require('../img/Ant.png')}
            style={[styles.antImage, { left: this.state.ant3 }]}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    height: '25%',
    width: '100%',
    backgroundColor: '#EAD0A8',
  },
  racetrack: {
    height: '100%',
    width: '100%',
  },
  antImage: {
    flex: 1,
  },
});

AntRace.propTypes = {};

export default AntRace;
