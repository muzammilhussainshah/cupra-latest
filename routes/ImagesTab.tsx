import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { ImagesScreen } from '../features/images/ImagesScreen';
import { ShowImage } from '../features/images/ShowImage';
export type ImagesStackParamList = {
  images: undefined;
  showImage: undefined;
};
const ImagesStack = createStackNavigator<ImagesStackParamList>();

export const ImagesTab: React.FC = () => {
  return <ImagesStack.Navigator
    initialRouteName="images"
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
    <ImagesStack.Screen name="images" component={ImagesScreen} />
    <ImagesStack.Screen name="showImage" component={ShowImage} />
  </ImagesStack.Navigator>
};
