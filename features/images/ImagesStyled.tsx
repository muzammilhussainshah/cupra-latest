import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SliderBox } from "react-native-image-slider-box";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';
import styled from 'styled-components/native';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import { _imageNewsLike } from '../../store/action/imageAction'

export const ImagesContainer = styled(SafeAreaView)`
  flex: 1;
  background-color:${Colors.secondary};
`;
const ImagePlaceholder = styled.View`
  height: 220px;
  margin-right: 20px;
  margin-left: 20px;
  /* justify-content: center; */

`;
const ImageTileCover = styled(FastImage)`
  width: 160px;
  height: 150px;
  border-radius: 10px;
`;
const ImageName = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
  font-family: 'SourceSansPro-Regular';
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
const ImageNumber = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
  font-family: 'SourceSansPro-Regular';
  padding-left: 5px;
`;
const RowView = styled.View`
    flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SteeringImage = styled(FastImage)`
  width: 20px;
  height: 20px;
`;
const NumberOfRates = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
  font-family: 'SourceSansPro-Regular';
  padding-right: 10px;
`;
const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top:10px

`;

export type IImageTypeProp = {
  imageUri?: any;
  allData?: any;
  getNewsImages?: any;
  indexOfNewsMainImages?: number;
  onPress?: () => void;
};
export const ImageTile: React.FC<IImageTypeProp> = ({
  imageUri,
  getNewsImages,
  allData,
  indexOfNewsMainImages,
  onPress,
}) => {
  const [arrOfSliderImagesPath, setarrOfSliderImagesPath] = useState([])
  const [arrOfSliderImagesData, setArrOfSliderImagesData] = useState([])
  const [imgSliderEnabled, setimgSliderEnabled] = useState(false)
  // const getNewsImages = useSelector((state: any) => state.reducer.getNewsImages)
  const [renderImgIndex, setrenderImgIndex] = useState(0)

  const navigation = useNavigation()
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  let dispatch = useDispatch()

  let sliderImagesPathClone: any = []
  let sliderImagesData: any = []
  useEffect(() => {
    if (allData && allData.media && allData.media.length > 1) {
      allData.media.map((item: any,) => {
        sliderImagesPathClone.push(item.url)
        sliderImagesData.push(item)
      })
      setimgSliderEnabled(true)
    }

    setarrOfSliderImagesPath(sliderImagesPathClone)
    setArrOfSliderImagesData(sliderImagesData)
    console.log(allData, '[;-=9]')
  }, [])
  // const numberOfLikes = () => {
  // dispatch(_imageNewsLike(currentUser, arrOfSliderImagesData && arrOfSliderImagesData[renderImgIndex] && arrOfSliderImagesData[renderImgIndex]._id, navigation,))
  //   // if (!likebyme) {
  //   //   setimageLikes(imageLikes + 1)
  //   // } else {
  //   //   if (imageLikes > 0) {
  //   //     setimageLikes(imageLikes - 1)
  //   //   }
  //   // }
  // }
  return (
    <TouchableScale
      style={{ flex: 1 }}
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      onPress={() => navigation.navigate('showImage', { imageURL: { uri: imageUri }, renderImgIndex, arrOfSliderImagesPath })}
    // onPress={onPress}
    >
      <ImagePlaceholder>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {imgSliderEnabled ?
            <View
              style={{
                width: 160,
                height: 150,
                borderRadius: 10,
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <SliderBox
                resizeMode="contain"
                ImageComponentStyle={{ width: '100%', height: "100%", borderRadius: 10 }}
                dotColor="rgba(0,0,0,0)"
                inactiveDotColor="rgba(0,0,0,0)"
                images={arrOfSliderImagesPath && arrOfSliderImagesPath}
                onCurrentImagePressed={(index: number) => {
                  navigation.navigate('showImage', { imageURL: { uri: arrOfSliderImagesPath[index] }, renderImgIndex, arrOfSliderImagesPath })

                }
                }
                currentImageEmitter={(index: number) => {
                  setrenderImgIndex(index)
                }
                }
              />
            </View>
            :
            <ImageTileCover source={{ uri: imageUri }} />
          }
          <BottomContainer>
            {arrOfSliderImagesData[renderImgIndex] &&
              <RowView>
                <Text style={{ color: 'white', fontSize: 15, marginRight: "20%" }}>{moment(arrOfSliderImagesData[renderImgIndex].createdAt).fromNow()}</Text>
              </RowView>
            }
            <TouchableOpacity
              onPress={() => {
                if (arrOfSliderImagesData && arrOfSliderImagesData[renderImgIndex] && arrOfSliderImagesData[renderImgIndex]) {
                  dispatch(_imageNewsLike(currentUser, arrOfSliderImagesData[renderImgIndex]._id, navigation, getNewsImages, arrOfSliderImagesData[renderImgIndex].likedByMe, indexOfNewsMainImages, renderImgIndex))
                }
              }}
            >
              <RowView>
                <SteeringImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={require('../../assets/images/RealHeart.png')}
                />
                {arrOfSliderImagesData[renderImgIndex] &&
                  <NumberOfRates style={{ marginLeft: "5%" }}>{arrOfSliderImagesData && arrOfSliderImagesData[renderImgIndex] && arrOfSliderImagesData[renderImgIndex].likesCount}</NumberOfRates>
                }

              </RowView>
            </TouchableOpacity>
          </BottomContainer>
        </View>
      </ImagePlaceholder>
    </TouchableScale >
  )
};
export const ImageTitleWrapper = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
`;
export const ImageTitle = styled.Text`
  color: ${Colors.white};
  font-size: 20px;
  font-family: 'SourceSansPro-Regular';
`;
