import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {ServicesScreen} from '../features/services/ServicesScreen';
import {
  SubServiceScreen,
  SubServiceScreenProps,
} from '../features/services/SubServiceScreen';
import {BookingScreen} from '../features/services/Booking/BookingScreen';

export type ServicesStackParamList = {
  serviceScreen: undefined;
  subservice: SubServiceScreenProps;
  booking: undefined;
};
const ServicesStack = createStackNavigator<ServicesStackParamList>();
export const ServicesTab = () => {
  return (
    <ServicesStack.Navigator
      initialRouteName="serviceScreen"
      mode="modal"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        animationTypeForReplace: 'pop',
        ...TransitionPresets.SlideFromRightIOS,
        gestureDirection: 'horizontal',
        gestureEnabled: true,
      }}>
      <ServicesStack.Screen name="serviceScreen" component={ServicesScreen} />
      <ServicesStack.Screen name="subservice" component={SubServiceScreen} />
      <ServicesStack.Screen name="booking" component={BookingScreen} />
    </ServicesStack.Navigator>
  );
};
