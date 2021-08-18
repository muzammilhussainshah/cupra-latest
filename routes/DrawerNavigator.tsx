import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import Routes from './Routes';
import {DrawerContent} from './DrawerContent';
import {
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';

export type IDrawerParamList = {
  HomeDrawer: [Routes.HomeDrawer];
};

const MyTransition = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, layouts}) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
      ],
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    },
  }),
};

const Drawer = createDrawerNavigator<IDrawerParamList>();

export const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <DrawerContent {...props} />}>
      <Drawer.Screen name={Routes.HomeDrawer} component={BottomTabNavigator} />
      {/* Add the screens that its not shown in the bottomtabs */}
    </Drawer.Navigator>
  );
};
