import React, { useState, useEffect } from 'react';

import { Text, TouchableOpacity, View } from "react-native";

import GetReviewComponent from '../../components/GetReviewComponent';

import FastImage from 'react-native-fast-image';

import { SafeAreaView, } from 'react-native-safe-area-context';

import TouchableScale from 'react-native-touchable-scale';

import styled from 'styled-components/native';

import { Colors } from '../../constants/Colors';

import { height, width } from '../../constants/Layout';

import { useDispatch, useSelector } from 'react-redux';

import { likeDislike, getReview } from '../../store/action/shopAction';

import { useNavigation, CommonActions } from '@react-navigation/native';

export const ShopContainer = styled(SafeAreaView)`
  flex: 1;
  background-color:${Colors.white}
`;
export const HeaderTitle = styled.Text`
  color: ${Colors.black};
  font-size: 20px;
  font-family: 'SourceSansPro-Bold';
  margin: 10px;
`;
const SubCategoryPlaceholder = styled.View`
  /* height: 220px; */
  margin:15px;
  justify-content: center;
  background-color: ${Colors.black};
  padding: 15px;
  border-radius: 20px;
`;
const SubCategoryTileCover = styled(FastImage)`
  width: 200px;
  height: 200px;
  border-radius: 20px;
`;
const SubCategoryName = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
  font-family: 'SourceSansPro-Regular';
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
const SubCategoryNumber = styled.Text`
  color: ${Colors.white};
  font-size: 14px;
  font-family: 'SourceSansPro-Regular';
  padding-left: 5px;
`;
const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const SteeringImage = styled(FastImage)`
  width: 20px;
  height: 20px;
`;
const NumberOfRates = styled.Text`
  color: ${Colors.lightGold};
  font-size: 18px;
  font-family: 'SourceSansPro-Regular';
  padding-right: 10px;
`;
const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.View`
  position: absolute;
  background-color: ${Colors.primary};
  border-width: 1px;
  border-color: ${Colors.titleGray};
  border-radius: 20px;
  padding: 4px 10px;
  top:35px;
  right: 20px;
`;
export type ISubCategoryTypeProp = {
  serviceImage?: any;
  serviceName: string | undefined | any;
  numberOfService?: number;
  numberOfRates?: number;
  navigation?: any;
  noOfLikes?: any;
  item_id?: string;
  rating?: number;
  currentUser?: any;
  likedByMe?: string;
  _func?: Function;
  shopSubCatogery?: any;
  shopSubCatogeryIndex?: any;
  shopSubCatogeryItemIndex?: any;

  onPress?: () => void;
  price?: number;
};
export const SubCategoryTile: React.FC<ISubCategoryTypeProp> = ({
  serviceImage,
  serviceName,
  numberOfService,
  numberOfRates,
  item_id,
  noOfLikes,
  rating,
  _func,
  shopSubCatogery,
  shopSubCatogeryIndex,
  shopSubCatogeryItemIndex,
  onPress,
  currentUser,
  likedByMe,
  navigation,
  price,
}: any) => {
  const [totalLikes, settotalLikes] = useState(noOfLikes);
  const [sendLike, setsendLike] = useState(likedByMe);
  const [flag, setflag] = useState(false);
  const [Dbounce, setDbounce] = useState(true);
  const dispatch = useDispatch();

  const numberOfLikes = () => {
    if (Dbounce) {
      dispatch(likeDislike(item_id, currentUser, shopSubCatogery[shopSubCatogeryIndex].items[shopSubCatogeryItemIndex].likedByMe, navigation, shopSubCatogery, shopSubCatogeryIndex, shopSubCatogeryItemIndex,setDbounce))
    }
    // if (!sendLike) {
    //   settotalLikes(totalLikes + 1)
    // } else {
    //   if (totalLikes > 0) {
    //     settotalLikes(totalLikes - 1)
    //   }
    // }
  }
  // console.log(noOfLikes,'noOfLikes')

  // useEffect(() => {
  //   setflag(!flag)
  // }, [noOfLikes])


  return (
    <TouchableScale
      style={{}}
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      onPress={onPress}>
      <SubCategoryPlaceholder>
        <View style={{ height: "90%", bottom: "15%", width: "100%", marginLeft: 15, padding: 5, alignItems: "flex-end", position: "absolute", zIndex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              // setsendLike(!sendLike)
              numberOfLikes()

            }}
            activeOpacity={0.9}
            style={{
              justifyContent: "center",
              backgroundColor: "rgba( 85 , 83 , 85 , 0.9 )",
              borderRadius: 10,
              height: 50,
              width: 50,
              alignItems: "center"
            }}>
            <FastImage
              style={{ height: 25, width: 25, }}
              source={(shopSubCatogery.length > 0 && shopSubCatogery[shopSubCatogeryIndex] && shopSubCatogery[shopSubCatogeryIndex].items && shopSubCatogery[shopSubCatogeryIndex].items[shopSubCatogeryItemIndex] && shopSubCatogery[shopSubCatogeryIndex].items[shopSubCatogeryItemIndex].likedByMe) ? require('../../assets/images/RealHeart.png') : require('../../assets/Heart-2.png')}
              resizeMode="contain"
            />
            <Text style={{ color: "#ffffff", elevation: 2 }}>{shopSubCatogery.length > 0 && shopSubCatogery[shopSubCatogeryIndex] && shopSubCatogery[shopSubCatogeryIndex].items && shopSubCatogery[shopSubCatogeryIndex].items[shopSubCatogeryItemIndex] && shopSubCatogery[shopSubCatogeryIndex].items[shopSubCatogeryItemIndex].likes}</Text>
          </TouchableOpacity>
        </View>
        <SubCategoryTileCover source={serviceImage} />
        {/* <Label>
      ADD Heart Icon
      </Label> */}
        <RowView>
          <SubCategoryName numberOfLines={1}>{serviceName?.substring(0, 18)}{serviceName.length > 19 && ".."}</SubCategoryName>
          <SubCategoryNumber>JD {price}</SubCategoryNumber>
        </RowView>
        <BottomContainer>
          <RowView>
            <SteeringImage
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/images/steering.png')}
            />
            <SubCategoryNumber>Remaining {numberOfService}+</SubCategoryNumber>
          </RowView>
          <TouchableOpacity
            onPress={() => dispatch(getReview(item_id, currentUser, navigation, serviceName))}
            style={{ flexDirection: "row" }}>
            <NumberOfRates>{Math.floor(rating * 10) / 10}</NumberOfRates>
            {/* <NumberOfRates>{rating}1</NumberOfRates> */}
            <SteeringImage
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/images/RealStar.png')}
            />
          </TouchableOpacity>
        </BottomContainer>
      </SubCategoryPlaceholder>
    </TouchableScale >
  )
};
