import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { VideoScreen } from '../features/video/VideoScreen';
import { VideoPlayScreen } from '../features/video/VideoPlayScreen';
export type VideosStackParamList = {
  video: undefined;
  videoPlay: undefined;
};
const VideosStack = createStackNavigator<VideosStackParamList>();

export const VideosTabs: React.FC = () => {
  return <VideosStack.Navigator
    initialRouteName="video"
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
    <VideosStack.Screen name="video" component={VideoScreen} />
    {/* <VideosStack.Screen name="videoPlay" component={VideoPlayScreen} /> */}

  </VideosStack.Navigator>
};
