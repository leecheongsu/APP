import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, HouseFire, HouseInfoDetail, StormFlood } from '@app/screens';
import { BackButton, DefaultAlert, LogoTitle, MenuButton, Typhograph } from '@app/components/index';
import theme from '@app/style/theme';
import UserButton from '@app/components/Header/UserButton';

function MainStack() {
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
        name="HOUSE_FIRE"
        component={HouseFire}
        options={{
          headerLeft: () => <BackButton isAlert />,
          headerLeftContainerStyle: { paddingHorizontal: 10 },
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              주택화재
            </Typhograph>
          ),
          headerShown: true,
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
        name="STORM_FLOOD"
        component={StormFlood}
        options={{
          headerLeft: () => <BackButton isAlert />,
          headerLeftContainerStyle: { paddingHorizontal: 10 },
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              풍수해
            </Typhograph>
          ),
          headerShown: true,
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
    </Stacks.Navigator>
  );
}

export default MainStack;
