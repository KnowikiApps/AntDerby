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
        let temp = res.data.ants.concat(res.data.ants);
        let doug = temp.concat(temp).concat(temp);
        // console.log(JSON.stringify(doug));
        this.setState({ ants: doug.concat(doug) });
        // this.setState(temp);
        // console.log(JSON.stringify(this.state));
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
            renderItem={({ item }) => <Text>{item.name}</Text>}
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
