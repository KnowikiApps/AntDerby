import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

function AntStats(props) {
  return (
    <View style={styles.rowLayout}>
      <View style={styles.column1}>
        <Image
          source={require('../img/Ant.png')}
          style={styles.antImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.column2}>
        <Text>{props.name}</Text>
        <Text>{`color: ${props.color}`}</Text>
        <Text>{`length: ${props.length}`}</Text>
        <Text>{`weight: ${props.weight}`}</Text>
      </View>
      <View style={styles.column3} />
    </View>
  );
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
    flex: 2,
  },
  column3: {
    flex: 1,
  },
  antImage: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});

AntStats.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
};

export default AntStats;
