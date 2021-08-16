import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import Routes from './Routes';
import {DrawerContent} from './DrawerContent';

export type IDrawerParamList = {
  HomeDrawer: [Routes.HomeDrawer];
};
const Drawer = createDrawerNavigator<IDrawerParamList>();

export const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator drawerContent={(props:any) => <DrawerContent {...props} />}>
      <Drawer.Screen name={Routes.HomeDrawer} component={BottomTabNavigator} />
      {/* Add the screens that its not shown in the bottomtabs */}
    </Drawer.Navigator>
  );
};
