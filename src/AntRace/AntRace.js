import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';

import Racer from './Racer.js';

class AntRace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.layout}>
        <ImageBackground
          source={require('../img/TrackTexture.png')}
          style={styles.track}
          resizeMode="repeat"
        >
          {this.props.racers.map((item, index) => {
            return (
              <View style={styles.racetrack} key={index}>
                <Racer odds={item.odds} />
                <ImageBackground
                  source={require('../img/LineTexture.png')}
                  style={styles.line}
                  resizeMode="repeat"
                />
              </View>
            );
          })}
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
    flex: 1,
  },
  antImage: {
    flex: 1,
  },
  track: {
    flex: 1,
    backgroundColor: '#A13939',
  },
  line: {
    height: 12,
    width: '100%',
  },
});

AntRace.propTypes = {
  racers: PropTypes.array,
};

export default AntRace;
