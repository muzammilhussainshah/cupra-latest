import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { height, width } from '../../constants/Layout';

export const ShowImage = ({ route, navigation }: any) => {
  const { imageURL } = route.params;
  console.log(imageURL, "imageURL")
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 99999, paddingTop: 20, position: 'absolute', right: 10, top: 50 }}>
        <Text style={{ color: 'white', fontSize: 30 }}>X</Text>
      </TouchableOpacity>
      <FastImage style={{ width: width * 0.9, height: height * 0.9 }} source={imageURL} resizeMode={FastImage.resizeMode.contain} />
    </View>

  );
}
