import { Typhograph } from '@app/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
function PayPresenter() {
  return (
    <View style={styles.container}>
      <Typhograph type="NOTO">결제</Typhograph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default PayPresenter;
