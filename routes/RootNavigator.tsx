import React from 'react';

import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';

import {WelcomeScreen} from '../features/auth/WelcomeScreen';

import {LoginScreen} from '../features/auth/LoginScreen/LoginScreen';

import {SignUpScreen} from '../features/auth/SignUpScreen/SignUpScreen';

import {ResetPasswordScreen} from '../features/auth/ResetPasswordScreen/ResetPasswordScreen';

import {VerificationScreen} from '../features/auth/VerificationScreen/VerificationScreen';

import {AddNewPassword} from '../features/auth/ResetPasswordScreen/AddNewPasswordScreen';

import {GetReview} from '../features/shop/GetReviews/GetReview';

import {HomeDetail} from '../features/home/HomeDetail/HomeDetail';
import {HomeComments} from '../features/home/HomeComments/HomeComments';

import {GetAndSubmitReview} from '../features/services/GetAndSubmitReviews/GetAndSubmitReviews';

import Routes from './Routes';

import {NavigatorScreenParams} from '@react-navigation/native';

import {BottomTabParamList} from './BottomTabNavigator';
import {DrawerNavigator} from './DrawerNavigator';

type AuthStackParamList = {
  drawerStack: undefined;
  welcome: undefined;
  login: undefined;
  GetReview: undefined;
  GetAndSubmitReview: undefined;
  signup: undefined;
  otp: {phone_number?: string; routName?: string};
  resetPassword: undefined;
  requestPassword: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();

type RootStackParamList = {
  [Routes.BottomTabNavigator]: NavigatorScreenParams<BottomTabParamList>;
};

export const RootNavigator = () => {
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
    // <RootStack.Navigator>
    //   <RootStack.Screen
    //     name={Routes.BottomTabNavigator}
    //     component={BottomTabNavigator}
    //     options={{headerShown: false}}
    //   />
    // </RootStack.Navigator>
    <AuthStack.Navigator
      mode="modal"
      initialRouteName={'welcome'}
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        // animationTypeForReplace: 'pop',
        // ...TransitionPresets.ModalPresentationIOS,
        gestureDirection: 'horizontal',
        gestureEnabled: true,
      }}>
      <AuthStack.Screen
        name="drawerStack"
        component={DrawerNavigator}
        options={MyTransition}
      />
      <AuthStack.Screen
        name="GetReview"
        component={GetReview}
        options={MyTransition}
      />
      <AuthStack.Screen
        name="HomeDetail"
        component={HomeDetail}
        options={MyTransition}
      />
      <AuthStack.Screen
        name="HomeComments"
        component={HomeComments}
        options={MyTransition}
      />
      <AuthStack.Screen
        name="GetAndSubmitReview"
        component={GetAndSubmitReview}
        options={MyTransition}
      />

      <AuthStack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={MyTransition}
      />
      <AuthStack.Screen
        name="login"
        component={LoginScreen}
        options={MyTransition}
      />
      <AuthStack.Screen
        name="signup"
        component={SignUpScreen}
        options={MyTransition}
      />
      <AuthStack.Screen
        name="otp"
        component={VerificationScreen}
        options={MyTransition}
      />
      <AuthStack.Screen
        name="resetPassword"
        component={ResetPasswordScreen}
        options={MyTransition}
      />
      <AuthStack.Screen
        name="requestPassword"
        component={AddNewPassword}
        options={MyTransition}
      />
    </AuthStack.Navigator>
  );
};
