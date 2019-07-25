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
          <Text style={styles.text}>
            Lets race some ants {this.props.username}!
          </Text>
        </View>
        <View style={styles.row3}>
          <View style={styles.row3spacer} />
          <Text style={styles.testStatus}>
            {`Test Status: ${this.props.allStatus}`}
          </Text>
          <View style={styles.calcButtonContainer}>
            <Button
              title="Calculate Odds"
              onPress={this.props.onCalculate}
              disabled={this.props.allStatus === 'in progress'}
            />
          </View>
          <View style={styles.row3spacer} />
        </View>
        <View style={styles.row4} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  colLayout: {
    flex: 1,
    backgroundColor: '#9A4242',
  },
  row1: {
    flex: 3,
  },
  row2: {
    flex: 2,
  },
  row3: {
    flex: 2,
    flexDirection: 'row',
  },
  row4: {
    flex: 1,
    flexDirection: 'row',
  },
  antImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  text: {
    color: '#C1D895',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  testStatus: {
    flex: 5,
    alignSelf: 'center',
    color: '#C1D895',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  calcButtonContainer: {
    flex: 4,
    alignSelf: 'flex-end',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  row3spacer: {
    flex: 1,
  },
});

Header.propTypes = {
  onCalculate: PropTypes.func,
  allStatus: PropTypes.string,
  username: PropTypes.string,
};

export default Header;
