import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import {ProfileScreen} from '../drawerFeature/profile/ProfileScreen';
import {EditProfile} from '../drawerFeature/editProfile/EditProfile';
import {FavoritesScreen} from '../drawerFeature/favorites/FavoritesScreen';
import {ClaimsScreen} from '../drawerFeature/claims/ClaimsScreen';
import Routes from './Routes';
import {DrawerContent} from './DrawerContent';
import {
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';

export type IDrawerParamList = {
  HomeDrawer: [Routes.HomeDrawer];
  profile: undefined;
  editProfile: undefined;
  favorites: undefined;
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
      <Drawer.Screen name={"profile"} component={ProfileScreen} />
      <Drawer.Screen name={"editProfile"} component={EditProfile} />
      <Drawer.Screen name={"favorites"} component={FavoritesScreen} />
      <Drawer.Screen name={"claims"} component={ClaimsScreen} />
      {/* Add the screens that its not shown in the bottomtabs */}
    </Drawer.Navigator>
  );
};
