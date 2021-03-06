import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

function AntStats(props) {
  return (
    <View style={styles.colLayout}>
      <View style={styles.rowSpace} />
      <View style={styles.rowLayout}>
        <View style={styles.column1}>
          <Image
            source={require('../img/Ant.png')}
            style={[styles.antImage, { tintColor: props.color.toLowerCase() }]}
            resizeMode="contain"
            transform={[{ scaleX: 0.75 }, { scaleY: 0.75 }]}
          />
        </View>
        <View style={styles.column2}>
          <Text style={styles.name}>{props.name}</Text>
          <Text>{`color: ${props.color}`}</Text>
          <View style={styles.rowLayout}>
            <Text>{`length: ${props.length}`}</Text>
            <Text>{`    weight: ${props.weight}`}</Text>
          </View>
        </View>
        <View style={styles.column3}>
          <View>
            <Text style={styles.headingText}>Odds</Text>
            <Text style={styles.infoText}>
              {Number.parseFloat(props.odds).toPrecision(2)}
            </Text>
          </View>
          <View>
            <Text style={styles.headingText}>Status</Text>
            <Text style={styles.infoText}>{props.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.rowSpace} />
    </View>
  );
}

const styles = StyleSheet.create({
  rowLayout: {
    flex: 2,
    flexDirection: 'row',
  },
  colLayout: {
    flexDirection: 'column',
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
  name: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  rowSpace: {
    height: 10,
  },
});

AntStats.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  odds: PropTypes.number,
  status: PropTypes.string,
};

export default AntStats;
