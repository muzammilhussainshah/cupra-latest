import React from 'react';

import { PressableProps, TouchableOpacity } from 'react-native';

import { Text, View } from 'react-native-animatable';

import FastImage from 'react-native-fast-image';

import { Colors } from '../constants/Colors';

export type FullImage = PressableProps & {
  _func?: Function;
  coverImage?: any;
  selectedImageIndex?: number;
};

/**
 * Wraps `Pressable` with "touchable" styles
 *
 * @param props {@link PressableProps}
 */
export const FullImage: React.FunctionComponent<FullImage> = ({ _func, coverImage, selectedImageIndex }: any) => {
    let type = typeof (coverImage)
  return (

    <View
      style={{ height: "100%", width: "100%", backgroundColor: Colors.black, position: "absolute", zIndex: 2 }}>
      <View
        style={{ height: "15%", justifyContent: "flex-end", alignItems: "flex-end" }}>
        <TouchableOpacity
          onPress={() => _func()}
        >
          <FastImage style={{ width: 50, height: 50 }} source={require('../assets/images/close.png')}
            resizeMode={FastImage.resizeMode.contain} />
        </TouchableOpacity>
      </View>
      <View style={{ height: "85%", justifyContent: "center" }}>
        <FastImage style={{ width: "100%", height: "100%" }} source={

          { uri: type == "string" ? coverImage : coverImage[selectedImageIndex] }
        }
          resizeMode={FastImage.resizeMode.contain} />
      </View>
    </View >
  );
};

export default FullImage;
