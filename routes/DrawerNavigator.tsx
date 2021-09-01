import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerContent} from './DrawerContent';

import {DashBoardStackScreens} from './DrawerStacks';

export type IDrawerParamList = {
  dashBoardStack: undefined;
};

const Drawer = createDrawerNavigator<IDrawerParamList>();

export const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name={'dashBoardStack'}
        component={DashBoardStackScreens}
      />
      {/* Add the screens that its not shown in the bottomtabs */}
    </Drawer.Navigator>
  );
};
