import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '@app/screens';

function RootStackPresenter() {
  const Stacks = createStackNavigator();
  return (
    <Stacks.Navigator
      initialRouteName="HOME"
      screenOptions={{
        headerStyle: null,
        headerTitleAlign: 'center',
        // headerTitleStyle: Object.assign(defaultHeaderStyle),
        gestureEnabled: false,
      }}>
      <Stacks.Screen
        name="HOME"
        component={Home}
        options={{
          title: '',
          headerShown: false,
          animationEnabled: true,
        }}
      />
    </Stacks.Navigator>
  );
}

export default RootStackPresenter;
