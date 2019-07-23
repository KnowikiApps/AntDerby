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
    };
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
      .catch(err => console.log(JSON.stringify(err)));
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <FlatList
            data={this.state.ants}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <AntStats
                name={item.name}
                color={item.color}
                length={item.length}
                weight={item.weight}
                odds={23}
                status="in progress"
              />
            )}
          />
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
