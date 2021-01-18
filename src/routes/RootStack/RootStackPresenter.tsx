import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '@app/screens';
import theme from '@app/style/theme';

function RootStackPresenter() {
  const Stacks = createStackNavigator();
  return (
    <Stacks.Navigator
      initialRouteName="HOME"
      screenOptions={{
        headerStyle: null,
        headerTitleAlign: 'center',
        gestureEnabled: false,
      }}>
      <Stacks.Screen
        name="HOME"
        component={Home}
        options={{
          title: '',
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.BLUE,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 0,
          },
        }}
      />
    </Stacks.Navigator>
  );
}

export default RootStackPresenter;
