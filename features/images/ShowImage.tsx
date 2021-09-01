import React from 'react';
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import FastImage from 'react-native-fast-image';
import { height, width } from '../../constants/Layout';
import { SliderBox } from "react-native-image-slider-box";
import ImageViewer from 'react-native-image-zoom-viewer';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export const ShowImage = ({ route, navigation }: any) => {
  const { imageURL, arrOfSliderImagesPath, renderImgIndex, imgScreen ,likes} = route.params;

  // let arrOfSliderImagesPathClone = arrOfSliderImagesPath && arrOfSliderImagesPath.map((str: any,) => ({ url: str, }));





  const images = [{
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    // props: {
    //     // headers: ...
    // }
  }, {
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

  }]

  return (
    <>
      {imgScreen &&  
        <View style={{ height: 55, width: 55, position: "absolute", right: 40, top: "70%", zIndex: 1, }}>
          <TouchableOpacity onPress={() => {
        }}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              justifyContent: "center",
               elevation: 2,
              borderRadius: 10,
               alignItems: "center"
            }}>
            <FastImage
              style={{ height: 25, width: 25, }}
              source={require('../../assets/images/RealHeart.png')}
              resizeMode="contain"
            />
            <Text style={{ color: Colors.white, marginLeft: 15 }}>{likes&&likes}</Text>
          </TouchableOpacity>
        </View>




      }
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 2, paddingTop: 20, position: 'absolute', right: 10, top: 50 }}>
          <Text style={{ color: 'white', fontSize: 30 }}>X</Text>
        </TouchableOpacity>
        {arrOfSliderImagesPath ?
          // <SliderBox
          //   resizeMode="contain"
          //   ImageComponentStyle={{ width: '100%', height: "100%", borderRadius: 10 }}
          //     firstItem={renderImgIndex}
          //     dotColor="rgba(0,0,0,0)"
          //   inactiveDotColor="rgba(0,0,0,0)"
          //   images={arrOfSliderImagesPath && arrOfSliderImagesPath}
          //   onCurrentImagePressed={(index: number) => {
          //   }
          //   }
          //   currentImageEmitter={(index: number) => {
          //   }
          //   }
          // />
          <View style={{ width: "100%", height: 500, }}>
            <ImageViewer index={renderImgIndex} imageUrls={arrOfSliderImagesPath} />
          </View>
          :
          <FastImage style={{ width: width * 0.9, height: height * 0.9 }} source={imageURL} resizeMode={FastImage.resizeMode.contain} />

        }
      </View>
    </>
  );
}
