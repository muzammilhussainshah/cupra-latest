import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import TouchableScale from 'react-native-touchable-scale';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { SliderBox } from "react-native-image-slider-box";
import { _imageNewsLike } from '../../store/action/imageAction'
import { Colors } from '../../constants/Colors';

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
    align-items: center;
    `;
// justify-content: space-between;
const SteeringImage = styled(FastImage)`
  width: 20px;
  height: 20px;
`;
const NumberOfRates = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
  font-family: 'SourceSansPro-Regular';
  `;
// padding-right: 10px;
const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top:10px

`;

export type IImageTypeProp = {
  imageUri?: any;
  newsImagesIndex?: any;
  onPress?: () => void;
  getnavigation?: () => void;
};
export const ImageTile: React.FC<IImageTypeProp> = ({
  imageUri,
  newsImagesIndex,
  onPress,
  getnavigation,
}) => {

  let dispatch = useDispatch()

  const [sliderArrSt, setsliderArrSt] = useState([])

  const [imageData, setimageData] = useState([])

  const [imageLikes, setimageLikes] = useState("")

  const [imageTime, setimageTime] = useState('')

  const [imagemediaId, setimagemediaId] = useState('')

  const [imageIndex, setimageIndex] = useState(0)

  const [flag, setflag] = useState(false)

  const [likebyme, setlikebyme] = useState()

  const navigation = useNavigation()

  let imgSliderArr = []

  let imgData = []

  const getNewsImages = useSelector((state: any) => state.reducer.getNewsImages)

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  useEffect(() => {
    if (imageUri) {
      imageUri.map((mediaObj, index) => {
        imgSliderArr.push(mediaObj.url)
        imgData.push(mediaObj)
      })
    }
    // console.log(getNewsImages, '111111111111111111111111')
    console.log(imageUri, '[][][][][][]imageUri')
    setimageData(imgData)
    setimageLikes(imageUri[0].likesCount)
    setimageTime(imageUri[0].createdAt)
    setimagemediaId(imageUri[0]._id)
    setlikebyme(imageUri[0].likedByMe)
    setsliderArrSt(imgSliderArr)
    setflag(!flag)
  }, [])
  useEffect(() => {

  }, [getNewsImages])
  const numberOfLikes = () => {
    dispatch(_imageNewsLike(currentUser, imagemediaId, navigation, getNewsImages, likebyme, newsImagesIndex, imageIndex))
    if (!likebyme) {
      setimageLikes(imageLikes + 1)
    } else {
      if (imageLikes > 0) {
        setimageLikes(imageLikes - 1)
      }
    }
  }
  // console.log(imageData, 'imageDataimageDataimageData')
  return (
    <TouchableScale
      style={{ flex: 1 }}
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
    >
      <ImagePlaceholder>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* <ImageTileCover source={{ uri: imageUri[0].url }} /> */}
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
              images={sliderArrSt && sliderArrSt}
              onCurrentImagePressed={index => {
                navigation.navigate('showImage', { imageURL: { uri: sliderArrSt[index] } })
              }
              }
              currentImageEmitter={index => {
                // console.log(index, 'indexindexindexindexindexindexindexindexindexindexindexindexindexindexindexindexindexindex')
                setimageIndex(index)
                setimageLikes(imageData && imageData[index] && imageData[index].likesCount && imageData[index].likesCount)
                setimageTime(imageData && imageData[index] && imageData[index].createdAt && imageData[index].createdAt)
                setimagemediaId(imageData && imageData[index] && imageData[index]._id && imageData[index]._id)
                setlikebyme(imageData && imageData[index] && imageData[index].likedByMe && imageData[index].likedByMe)
                setflag(!flag)
              }
              }
            />
          </View>

          <BottomContainer>
            <RowView>
              <Text style={{ color: 'white', fontSize: 15, marginRight: "20%" }}>{moment(imageTime && imageTime).fromNow()}</Text>
            </RowView>
            <TouchableOpacity
              onPress={() => {
                setlikebyme(!likebyme)
                numberOfLikes()
              }}
            >
              <RowView>
                <SteeringImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={require('../../assets/images/heart.png')}
                />
                <NumberOfRates style={{ marginLeft: 5 }} >{imageLikes && imageLikes}</NumberOfRates>
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
