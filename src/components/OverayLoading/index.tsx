import React from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
});
export default function OverayLoading({ visible }) {
  return <Spinner visible={visible} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />;
}
