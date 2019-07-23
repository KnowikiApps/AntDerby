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

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          {this.state.ready ? (
            <FlatList
              data={this.state.ants}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <AntStats
                  name={item.name}
                  color={item.color}
                  length={item.length}
                  weight={item.weight}
                  generator={item.gen}
                  status="in progress"
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
