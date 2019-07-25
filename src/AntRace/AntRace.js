import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
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
    Animated.loop(
      Animated.timing(this.state.ant1, {
        toValue: Dimensions.get('window').width,
        easing: Easing.ease,
        duration: Math.floor(Math.random() * 20000 + 10000),
      })
    ).start();
    Animated.loop(
      Animated.timing(this.state.ant2, {
        toValue: Dimensions.get('window').width,
        easing: Easing.ease,
        duration: Math.floor(Math.random() * 20000 + 10000),
      })
    ).start();
    Animated.loop(
      Animated.timing(this.state.ant3, {
        toValue: Dimensions.get('window').width,
        easing: Easing.ease,
        duration: Math.floor(Math.random() * 20000 + 10000),
      })
    ).start();
  }

  render() {
    return (
      <View style={styles.layout}>
        <ImageBackground
          source={require('../img/TrackTexture.png')}
          style={styles.track}
          resizeMode="repeat"
        >
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
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    height: '100%',
    width: '100%',
  },
  racetrack: {
    height: '100%',
    width: '100%',
  },
  antImage: {
    flex: 1,
  },
  track: {
    width: '100%',
    height: '100%',
  },
});

AntRace.propTypes = {};

export default AntRace;
