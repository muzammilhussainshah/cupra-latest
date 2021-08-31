import React from 'react';

import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';

import {ProfileScreen} from '../drawerFeature/profile/ProfileScreen';
import {EditProfile} from '../drawerFeature/editProfile/EditProfile';
import {FavoritesScreen} from '../drawerFeature/favorites/FavoritesScreen';
import {ClaimsScreen} from '../drawerFeature/claims/ClaimsScreen';

import Routes from './Routes';

type DashBoardStackParamList = {
  HomeDrawer: [Routes.HomeDrawer];
  profile: undefined;
  editProfile: undefined;
  favorites: undefined;
  claims: undefined;
};

const DashBoardStack = createStackNavigator<DashBoardStackParamList>();

export const DashBoardStackScreens = () => {
  const MyTransition: any = {
    headerShown: false,
    gestureDirection: 'vertical',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({current, layouts}: any) => ({
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

  return (
    <DashBoardStack.Navigator
      initialRouteName={Routes.HomeDrawer}
      screenOptions={{
        headerShown: false,
      }}>
      <DashBoardStack.Screen
        name={Routes.HomeDrawer}
        component={BottomTabNavigator}
        options={MyTransition}
      />

      <DashBoardStack.Screen
        name={'profile'}
        component={ProfileScreen}
        options={MyTransition}
      />

      <DashBoardStack.Screen
        name={'editProfile'}
        component={EditProfile}
        options={MyTransition}
      />

      <DashBoardStack.Screen
        name={'favorites'}
        component={FavoritesScreen}
        options={MyTransition}
      />

      <DashBoardStack.Screen
        name={'claims'}
        component={ClaimsScreen}
        options={MyTransition}
      />
    </DashBoardStack.Navigator>
  );
};
