import React, { useEffect } from 'react';
import { SliderBox } from "react-native-image-slider-box";

import ImageViewer from 'react-native-image-zoom-viewer';

import { Alert, PressableProps, TouchableOpacity } from 'react-native';

import { Text, View } from 'react-native-animatable';

import FastImage from 'react-native-fast-image';

import { Colors } from '../constants/Colors';

import { _mediaView } from '../store/action/newsAction';

import { useDispatch, useSelector } from 'react-redux';

export type FullImage = PressableProps & {
  _func?: Function;
  coverImage?: any;
  selectedImageIndex?: number;
  sliderBoxEnabled?: boolean;
  media?: any;
};

/**
 * Wraps `Pressable` with "touchable" styles
 *
 * @param props {@link PressableProps}
 */
export const FullImage: React.FunctionComponent<FullImage> = ({ _func, coverImage, selectedImageIndex, sliderBoxEnabled,media }: any) => {
  let type = typeof (coverImage)
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    mediaView(selectedImageIndex)
  }, [])



  const mediaView = ((selectedImageIndex:any) => {
    dispatch(_mediaView(currentUser,media[selectedImageIndex]._id))
    // console.log(media[selectedImageIndex],'@mediamedia',selectedImageIndex)

  })


  console.log(coverImage, coverImage[selectedImageIndex], ' aaa[selectedImageIndex] coverImage[selectedImageIndex] coverImage[selectedImageIndex] coverImage[selectedImageIndex] coverImage[selectedImageIndex] coverImage[selectedImageIndex]')
  return (

    <View
      style={{ height: "100%", width: "100%", backgroundColor: Colors.black, position: "absolute", zIndex: 2 }}>
      <View
        style={{ height: "15%", justifyContent: "flex-end", alignItems: "flex-end" }}>
        <TouchableOpacity
          onPress={() => _func()}
        >
          <Text style={{ color: 'white', fontSize: 30, marginRight: 20 }}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: "85%", justifyContent: "center" }}>
        {sliderBoxEnabled ?
          <ImageViewer
            saveToLocalByLongPress={false}
            onChange={(index: any) => {
              mediaView(index)
            }}
            index={selectedImageIndex} imageUrls={coverImage} />
          :
          <ImageViewer
            saveToLocalByLongPress={false}

            // index={selectedImageIndex} 
            imageUrls={[{ url: coverImage }]} />
          // <FastImage style={{ width: "100%", height: "100%" }} source={{ uri: type == "string" ? coverImage : coverImage[selectedImageIndex] }}
          //   resizeMode={FastImage.resizeMode.contain} />
        }
      </View>
    </View >
  );
};

export default FullImage;
