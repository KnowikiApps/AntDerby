import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Button,
} from 'react-native';

import PropTypes from 'prop-types';

import AntStats from '../AntStats/AntStats.js';
import Header from '../Header/Header.js';
import AntRace from '../AntRace/AntRace.js';

class AntPage extends Component {
  constructor() {
    super();
    this.state = {
      ants: [],
      ready: true,
    };

    this.ants = [];

    this.setCalculators = this.setCalculators.bind(this);
    this.generateAntWinLikelihoodCalculator = this.generateAntWinLikelihoodCalculator.bind(this);  // eslint-disable-line prettier/prettier
    this.runCalculations = this.runCalculations.bind(this);
    this.handleCalculateButton = this.handleCalculateButton.bind(this);
    this.handleAntStatusChange = this.handleAntStatusChange.bind(this);
    this.sortAnts = this.sortAnts.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    fetch('https://antserver-blocjgjbpw.now.sh/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'query{ants{name color length weight}}' }),
    })
      .then(res => res.json())
      .then(res => {
        this.ants = res.data.ants;
      })
      .then(() => {
        this.setCalculators();
        this.updateState();
      })
      .catch(err => console.log(JSON.stringify(err)));
  }

  handleCalculateButton() {
    this.runCalculations();
  }

  setCalculators() {
    for (let i = 0; i < this.ants.length; i++) {
      this.ants[i].calculator = this.generateAntWinLikelihoodCalculator();
      this.ants[i].odds = 0;
      this.ants[i].status = 'not yet run';
    }
    this.updateState();
  }

  runCalculations() {
    for (let i = 0; i < this.ants.length; i++) {
      this.ants[i].status = 'in progress';
      this.ants[i].calculator(value => {
        this.ants[i].odds = value;
        this.ants[i].status = 'calculated';
        this.handleAntStatusChange(i);
      });
    }
    this.updateState();
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

  handleAntStatusChange(index) {
    this.updateState();
  }

  updateState() {
    let tempAnts = this.ants.map(ant => {
      return {
        name: ant.name,
        color: ant.color,
        length: ant.length,
        weight: ant.weight,
        odds: ant.odds,
        status: ant.status,
      };
    });
    this.setState({ ants: this.sortAnts(tempAnts) });
  }

  sortAnts(arr) {
    return arr.sort((a, b) => {
      return a.odds - b.odds;
    });
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Header onCalculate={this.handleCalculateButton} />
          {this.state.ready ? (
            <FlatList
              data={this.state.ants}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <AntStats
                  name={item.name}
                  color={item.color}
                  length={item.length}
                  weight={item.weight}
                  odds={item.odds}
                  status={item.status}
                />
              )}
            />
          ) : (
            <View style={styles.loading}>
              <Text>Loading...</Text>
            </View>
          )}
          <View style={styles.rowStyle}>
            <Button title="Logout" onPress={this.props.onLoggedOut} />
          </View>
          <View style={styles.rowStyle}>
            <AntRace />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  highlight: {
    fontWeight: '700',
  },
  loading: {
     height: '100%',
     width: '100%',
     backgroundColor: 'powderblue',
  }
});

AntPage.propTypes = {
  onLoggedOut: PropTypes.func,
};

export default AntPage;
