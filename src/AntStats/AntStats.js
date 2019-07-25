import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

class AntStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'not yet run',
      odds: 0,
    };

    this.calculator;

    this.handleCalculator = this.handleCalculator.bind(this);
    this.runCalculation = this.runCalculation.bind(this);
    this.generateAntWinLikelihoodCalculator = this.generateAntWinLikelihoodCalculator.bind(this);  // eslint-disable-line prettier/prettier
  }

  componentDidMount() {
    this.calculator = this.generateAntWinLikelihoodCalculator();
    this.runCalculation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this.props.onStatusChange(this.props.index, this.state);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.calculator);
  }

  generateAntWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random();

    return callback => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }

  runCalculation() {
    console.log(`running calculation->${this.props.name}`);
    this.calculator(this.handleCalculator);
    this.setState({ odds: 0, status: 'in progress' });
  }

  handleCalculator(value) {
    console.log(`calculation complete->${this.props.name}`);
    this.setState({ odds: value, status: 'calculated' });
  }

  render() {
    return (
      <View style={styles.rowLayout}>
        <View style={styles.column1}>
          <Image
            source={require('../img/Ant.png')}
            style={[
              styles.antImage,
              { tintColor: this.props.color.toLowerCase() },
            ]}
            resizeMode="contain"
            transform={[{ scaleX: '0.75' }, { scaleY: '0.75' }]}
          />
        </View>
        <View style={styles.column2}>
          <Text>{this.props.name}</Text>
          <Text>{`color: ${this.props.color}`}</Text>
          <View style={styles.rowLayout}>
            <Text>{`length: ${this.props.length}`}</Text>
            <Text>{`    weight: ${this.props.weight}`}</Text>
          </View>
        </View>
        <View style={styles.column3}>
          <View>
            <Text style={styles.headingText}>Odds</Text>
            <Text style={styles.infoText}>{this.props.odds}</Text>
          </View>
          <View>
            <Text style={styles.headingText}>Status</Text>
            <Text style={styles.infoText}>{this.props.status}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  column1: {
    flex: 1,
  },
  column2: {
    flex: 4,
  },
  column3: {
    flex: 1,
  },
  antImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  headingText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 10,
  },
});

AntStats.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  onStatusChange: PropTypes.func,
  index: PropTypes.number,
  odds: PropTypes.number,
  status: PropTypes.string,
};

export default AntStats;
