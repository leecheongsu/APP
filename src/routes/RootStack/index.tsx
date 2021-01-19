import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '@app/screens';
import { BackButton, LogoTitle, MenuButton } from '@app/components/index';
import theme from '@app/style/theme';
import Login from '@app/screens/Login';
import { Text, View } from 'react-native';
import UserButton from '@app/components/Header/UserButton';

function RootStack() {
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
          headerLeft: (props) => <UserButton {...props} />,
          headerLeftContainerStyle: { paddingHorizontal: 10 },
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: (props) => <MenuButton {...props} />,
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
      <Stacks.Screen
        name="LOGIN"
        component={Login}
        options={{
          headerLeft: () => (
            <View>
              <Text>Left</Text>
            </View>
          ),

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

export default RootStack;
