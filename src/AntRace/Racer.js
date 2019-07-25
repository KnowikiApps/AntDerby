import React, { Component } from 'react';
import { StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

class Racer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: new Animated.Value(-50),
    };

    this.buildAnimation = this.buildAnimation.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props !== prevProps) {
      this.setState({ odds: this.props.odds });
      this.buildAnimation();
    }
  }

  buildAnimation() {
    Animated.loop(
      Animated.timing(this.state.position, {
        toValue: Dimensions.get('window').width,
        easing: Easing.ease,
        duration: Math.floor(this.props.odds * 20000 + 10000),
      })
    ).start();
  }

  render() {
    return (
      <Animated.View style={styles.racetrack}>
        <Animated.Image
          source={require('../img/Ant.png')}
          style={[styles.antImage, { left: this.state.position }]}
          resizeMode="contain"
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    height: '100%',
    width: '100%',
  },
  antImage: {
    flex: 2,
  },
  racetrack: {
    flex: 1,
  },
});

Racer.propTypes = {
  odds: PropTypes.number,
};

export default Racer;
