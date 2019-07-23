import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

function AntStats(props) {
  return (
    <View style={styles.rowLayout}>
      <View style={styles.column1} />
      <View style={styles.column2}>
        <Text>{props.name}</Text>
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
    height: 50,
    flex: 1,
  },
  column2: {
    height: 50,
    flex: 2,
  },
  column3: {
    height: 50,
    flex: 1,
  },
});

AntStats.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
};

export default AntStats;
