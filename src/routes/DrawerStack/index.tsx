import React from 'react';
import RootStack from '@app/routes/RootStack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Menu } from '@app/components';
import { screenWidth } from '@app/lib';

export default function DrawerStack() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerStyle={{ width: screenWidth() }}
      drawerContent={(props) => <Menu {...props} />}
      hideStatusBar={true}>
      <Drawer.Screen name="RootStack" component={RootStack} />
    </Drawer.Navigator>
  );
}
