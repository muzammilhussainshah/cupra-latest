import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Shop } from '../features/shop/Shop';
import { ShopDetails } from '../features/shop/ShopDetails/ShopDetails';

export type ShopStackParamList = {
  shop: undefined;
  shopDetail: undefined;
};

const ShopStack = createStackNavigator<ShopStackParamList>();
export const ShopTab = () => {
  return (
    <ShopStack.Navigator
      initialRouteName="shop"
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
      <ShopStack.Screen name="shop" component={Shop} />
      <ShopStack.Screen name="shopDetail" component={ShopDetails} />
    </ShopStack.Navigator>
  );
};
