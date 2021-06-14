import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Calamity, CustomerCenter, Home, HouseFire, StormFlood, StormFlood2, Sales } from '@app/screens';
import { BackButton, LogoTitle, MenuButton, Typhograph } from '@app/components/index';
import theme from '@app/style/theme';
import UserButton from '@app/components/Header/UserButton';
import { useGlobalState } from '@app/context';

function MainStack() {
  const Stacks = createStackNavigator();
  const globalState = useGlobalState();
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
            borderBottomColor: theme.color.BLUE,
            borderBottomWidth: 1,
            shadowRadius: 0,
            shadowColor: 'transparent',
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
              {globalState?.homeFireTitle}
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
              {globalState?.stormFloodTitle}
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
        name="STORM_FLOOD2"
        component={StormFlood2}
        options={{
          headerLeft: () => <BackButton />,
          headerLeftContainerStyle: { paddingHorizontal: 10 },
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              다중이용시설 화재배상책임
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
        name="CALAMITY"
        component={Calamity}
        options={{
          headerLeft: () => <BackButton />,
          headerLeftContainerStyle: { paddingHorizontal: 10 },
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              재난 배상책임
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
        name="SALES"
        component={Sales}
        options={{
          headerLeft: () => <BackButton />,
          headerLeftContainerStyle: { paddingHorizontal: 10 },
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
            {globalState?.salesTitle}
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
        name="CUSTOMER_CENTER"
        component={CustomerCenter}
        options={{
          headerLeft: () => <BackButton />,
          headerLeftContainerStyle: { paddingHorizontal: 10 },
          headerTitle: () => (
            <Typhograph type="NOTO" weight="BOLD" size={16} color="BLACK2">
              고객센터
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
