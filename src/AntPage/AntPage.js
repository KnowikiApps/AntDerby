import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
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
      ready: false,
      allStatus: 'not yet run',
      staticAnts: [],
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
    if (this.state.allStatus === 'calculated') {
      this.setCalculators();
    }
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
    let status = 'not yet run'; //status of all calculations
    let calculated = 0; //count of ants with status 'calculated'
    let ip = 0; //count of ants with status 'in progress'
    let tempAnts = this.ants.map(ant => {
      if (ant.status === 'calculated') {
        calculated++;
      } else if (ant.status === 'in progress') {
        ip++;
      }
      return {
        name: ant.name,
        color: ant.color,
        length: ant.length,
        weight: ant.weight,
        odds: ant.odds,
        status: ant.status,
      };
    });

    if (ip > 0) {
      status = 'in progress';
    } else if (calculated === this.ants.length) {
      status = 'calculated';
    }
    this.setState({
      ants: this.sortAnts(tempAnts),
      allStatus: status,
      ready: true,
      staticAnts: tempAnts,
    });
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
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            {this.state.ready && (
              <Header
                onCalculate={this.handleCalculateButton}
                allStatus={this.state.allStatus}
                username={this.props.username}
              />
            )}
          </View>
          {this.state.ready ? (
            <FlatList
              style={styles.antList}
              data={this.state.ants}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListHeaderComponent={() => <View style={styles.separator} />}
              ListFooterComponent={() => <View style={styles.separator} />}
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
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}
          <View style={styles.rowStyle}>
            {this.state.ready ? (
              <AntRace racers={this.state.staticAnts} />
            ) : (
              <View />
            )}
          </View>
          <View style={styles.buttonRow}>
            <Button title="Logout" onPress={this.props.onLoggedOut} />
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    height: '100%',
    width: '100%',
    backgroundColor: '#9A4242',
  },
  loadingText: {
    fontSize: 25,
    textAlign: 'center',
  },
  rowStyle: {
    height: '15%',
    width: '100%',
  },
  buttonRow: {
    height: '5%',
    width: '100%',
    backgroundColor: 'lightgrey',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  headerContainer: {
    height: '20%',
    width: '100%',
    backgroundColor: '#9A4242',
  },
  antList: {
    height: '80%',
    width: '100%',
  },
  separator: {
    height: 5,
    backgroundColor: 'grey',
  },
});

AntPage.propTypes = {
  onLoggedOut: PropTypes.func,
  username: PropTypes.string,
};

export default AntPage;
