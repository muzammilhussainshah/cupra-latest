import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { height, width } from '../../constants/Layout';
import { SliderBox } from "react-native-image-slider-box";

export const ShowImage = ({ route, navigation }: any) => {
  const { imageURL, arrOfSliderImagesPath,renderImgIndex } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 99999, paddingTop: 20, position: 'absolute', right: 10, top: 50 }}>
        <Text style={{ color: 'white', fontSize: 30 }}>X</Text>
      </TouchableOpacity>
      {arrOfSliderImagesPath ?
        <SliderBox
          resizeMode="contain"
          ImageComponentStyle={{ width: '100%', height: "100%", borderRadius: 10 }}
            firstItem={renderImgIndex}
            dotColor="rgba(0,0,0,0)"
          inactiveDotColor="rgba(0,0,0,0)"
          images={arrOfSliderImagesPath && arrOfSliderImagesPath}
          onCurrentImagePressed={(index: number) => {
          }
          }
          currentImageEmitter={(index: number) => {
          }
          }
        /> :
        <FastImage style={{ width: width * 0.9, height: height * 0.9 }} source={imageURL} resizeMode={FastImage.resizeMode.contain} />

      }
    </View>
  );
}
