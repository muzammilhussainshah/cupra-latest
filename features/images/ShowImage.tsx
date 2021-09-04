import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import FastImage from 'react-native-fast-image';
import { height, width } from '../../constants/Layout';
import { _imageNewsLike } from '../../store/action/imageAction'
import { SliderBox } from "react-native-image-slider-box";
import ImageViewer from 'react-native-image-zoom-viewer';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export const ShowImage = ({ route, navigation }: any) => {
  const { imageURL, arrOfSliderImagesPath, renderImgIndex, imgScreen, likes, allData, getNewsImages, indexOfNewsMainImages } = route.params;
  const [renderImgIndexFullImg, setrenderImgIndexFullImg] = useState(renderImgIndex && renderImgIndex)
  const [imgLikes, setimageLikes] = useState(0);
  const [likeByMe, setlikeByMe] = useState(false)
  // let arrOfSliderImagesPathClone = arrOfSliderImagesPath && arrOfSliderImagesPath.map((str: any,) => ({ url: str, }));

  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const getNewsImagesStore = useSelector((state: any) => state.reducer.getNewsImages)
  let dispatch = useDispatch()
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
  useEffect(() => {
    setimageLikes(allData && allData[renderImgIndexFullImg] && allData[renderImgIndexFullImg].likesCount)
    setlikeByMe(allData && allData[renderImgIndexFullImg] && allData[renderImgIndexFullImg].likedByMe)
  }, [])
  const numberOfLikes = () => {
    dispatch(_imageNewsLike(currentUser, allData[renderImgIndexFullImg]._id, navigation, getNewsImages, likeByMe, indexOfNewsMainImages, renderImgIndexFullImg))
    // if (!likeByMe) {
    //   setimageLikes(imgLikes + 1)
    // } else {
    //   if (imgLikes > 0) {
    //     setimageLikes(imgLikes - 1)
    //   }
    // }
  }
console.log(indexOfNewsMainImages,renderImgIndex,"renderImgIndexrenderImgIndexrenderImgIndexrenderImgIndex",renderImgIndexFullImg)
  return (
    <>
      {imgScreen &&
        <View style={{ height: 55, width: 55, position: "absolute", right: 40, top: "70%", zIndex: 1, }}>
          <TouchableOpacity onPress={() => {
            setlikeByMe(!likeByMe)
            numberOfLikes()
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
            <Text style={{ color: Colors.white, marginLeft: 15 }}>{getNewsImagesStore[indexOfNewsMainImages].media[renderImgIndexFullImg].likesCount}</Text>
          </TouchableOpacity>
        </View>




      }
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <TouchableOpacity onPress={() => {
          if (imgScreen) {
            // navigation.push('ImagesTab')
            navigation.goBack()
          } else {
            navigation.goBack()
          }
        }} style={{ zIndex: 2, paddingTop: 20, position: 'absolute', right: 10, top: 50 }}>
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
            <ImageViewer
              saveToLocalByLongPress={false}
              onChange={(index: any) => {
                setimageLikes(allData && allData[index] && allData[index].likesCount)
                setlikeByMe(allData && allData[index] && allData[index].likedByMe)
                setrenderImgIndexFullImg(index)
              }}

              index={renderImgIndex} imageUrls={arrOfSliderImagesPath} />
          </View>
          :
          <FastImage style={{ width: width * 0.9, height: height * 0.9 }} source={imageURL} resizeMode={FastImage.resizeMode.contain} />

        }
      </View>
    </>
  );
}
