import React from 'react';

import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';

import { ProfileScreen } from '../drawerFeature/profile/ProfileScreen';
import { EditProfile } from '../drawerFeature/editProfile/EditProfile';
import { FavoritesScreen } from '../drawerFeature/favorites/FavoritesScreen';
import { ClaimsScreen } from '../drawerFeature/claims/ClaimsScreen';
import { ContactUs } from '../drawerFeature/contactUs/ContactUs';
import { WebViewScreen } from '../drawerFeature/webView/webView';
import { NotificationScreen } from '../features/notification/notificationScreen';
import { privacyScreen } from '../drawerFeature/PrivacyPolicy/privacyScreen';
import { RateCompanyScreen } from '../drawerFeature/rateCompany/RateCompanyScreen';
import { GetCompanyReview } from '../drawerFeature/rateCompany/getCompanyReviews/getCompanyReviewsScreen';

import Routes from './Routes';

type DashBoardStackParamList = {
  HomeDrawer: [Routes.HomeDrawer];
  profile: undefined;
  editProfile: undefined;
  favorites: undefined;
  claims: undefined;
  contactUs: undefined;
  webView: undefined;
  PrivacyPolicy: undefined;
  notification: undefined;
  rateCompany: undefined;
  getCompanyReviews: undefined;
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
    cardStyleInterpolator: ({ current, layouts }: any) => ({
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
      <DashBoardStack.Screen
        name={'contactUs'}
        component={ContactUs}
        options={MyTransition}
      />
      <DashBoardStack.Screen
        name={'webView'}
        component={WebViewScreen}
        options={MyTransition}
      />
      <DashBoardStack.Screen
        name={'PrivacyPolicy'}
        component={privacyScreen}
        options={MyTransition}
      />
      <DashBoardStack.Screen
        name={'notification'}
        component={NotificationScreen}
        options={MyTransition}
      />
      <DashBoardStack.Screen
        name={'rateCompany'}
        component={RateCompanyScreen}
        options={MyTransition}
      />
      <DashBoardStack.Screen
        name={'getCompanyReviews'}
        component={GetCompanyReview}
        options={MyTransition}
      />
    </DashBoardStack.Navigator>
  );
};
