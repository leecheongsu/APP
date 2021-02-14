import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BootpayWebView } from 'react-native-bootpay';
import { TouchableOpacity } from 'react-native-gesture-handler';
function PayPresenter({ bootpay, onPress, onCancel, onError, onReady, onConfirm, onDone, onClose }) {
  return (
    <View style={styles.container}>
      <BootpayWebView
        ref={bootpay}
        ios_application_id={'59a4d328396fa607b9e75de6'}
        android_application_id={'59a4d326396fa607cbe75de5'}
        onCancel={onCancel}
        onError={onError}
        onReady={onReady}
        onConfirm={onConfirm}
        onDone={onDone}
        onClose={onClose}
        allowFileAccess={true}
        scalesPageToFit={true}
        originWhitelist={['*']}
      />
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
