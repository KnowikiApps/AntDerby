import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import AntStats from '../AntStats/AntStats.js';

class AntPage extends Component {
  constructor() {
    super();
    this.state = {
      ants: [],
      ready: false,
    };

    this.generateAntWinLikelihoodCalculator = this.generateAntWinLikelihoodCalculator.bind(this);  // eslint-disable-line prettier/prettier
    this.generateCalculators = this.generateCalculators.bind(this);
    this.handleAntStatusChange = this.handleAntStatusChange.bind(this);
    this.sortAnts = this.sortAnts.bind(this);
  }

  componentDidMount() {
    fetch('https://antserver-blocjgjbpw.now.sh/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'query{ants{name color length weight}}' }),
    })
      .then(res => res.json())
      .then(res => {
        this.setState(res.data);
      })
      .then(() => this.generateCalculators())
      .catch(err => console.log(JSON.stringify(err)));
  }

  generateCalculators() {
    const temp = [];
    this.state.ants.forEach(ant => {
      let updated = ant;
      updated.gen = this.generateAntWinLikelihoodCalculator();
      temp.push(updated);
    });
    this.setState({ ants: temp, ready: true });
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

  handleAntStatusChange(index, state) {
    let tempAnts = Object.assign([], this.state.ants); //make a copy of the ants array from state
    let temp = Object.assign({}, tempAnts[index]); //make a copy of the ant data object at the array index
    temp.odds = state.odds; //add values without mutating state
    temp.status = state.status;
    tempAnts[index] = temp; //assign new data to the original index
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
                  generator={item.gen}
                  onStatusChange={this.handleAntStatusChange}
                  index={index}
                />
              )}
            />
          ) : (
            <View />
          )}
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
});

export default AntPage;
