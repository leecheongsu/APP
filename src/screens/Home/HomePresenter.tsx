import { FocusAwareStatusBar, SafeArea } from '@app/components';
import React from 'react';
import { Text, View } from 'react-native';

function HomePresenter() {
  return (
    <View>
      <SafeArea />
      <FocusAwareStatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Text>Home</Text>
    </View>
  );
}

export default HomePresenter;
