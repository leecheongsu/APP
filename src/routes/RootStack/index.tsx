import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { AddressSearch, Home, HouseFire, HouseInfoDetail } from '@app/screens';
import { BackButton, CloseButton, LogoTitle, MenuButton, Typhograph } from '@app/components/index';
import theme from '@app/style/theme';
import Login from '@app/screens/Login';
import UserButton from '@app/components/Header/UserButton';
import MainStack from '@app/routes/MainStack';
import { useNavigation } from '@react-navigation/native';

function RootStack() {
  const Stacks = createStackNavigator();
  const navigation: any = useNavigation();
  return (
    <Stacks.Navigator
      initialRouteName="MAIN_STACK"
      mode="modal"
      screenOptions={{
        headerStyle: null,
        headerTitleAlign: 'center',
        gestureEnabled: false,
      }}>
      <Stacks.Screen
        name="MAIN_STACK"
        component={MainStack}
        options={{
          headerShown: false,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: theme.color.WHITE,
            borderBottomColor: theme.color.BORDER_GRAY,
            borderBottomWidth: 1,
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
          headerLeft: () => <BackButton />,
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
