import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import TouchableScale from 'react-native-touchable-scale';
import { _likeDisLike } from "../../store/action/newsAction";
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { View, TouchableOpacity, Text } from 'react-native';
// TODO:Refactor the inline style
export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.secondary};
  `;
// justify-content: center;

const CardContainer = styled.View`
  height: 215px;
  align-items: center;
  flex-direction: row;
  background-color: ${Colors.primary};
  elevation: 4;
  border-radius: 14px;
`;
const CardPlaceholder = styled.View`
  height: 240px;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const CardTileCoverContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const CardTileCover = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 14px;
`;
const PromotionTileTitleContainer = styled.View`
  border-radius: 14px;
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: -20px;
  background-color: ${Colors.darkGray};
  padding: 15px;
  padding-top: 10px;
  flex: 1;
`;
const PromotionTileWrapper = styled.View`
  width: 100%;
`;
// const PromotionTileTitle = styled.Text`
//   font-size: 14px;
//   line-height: 28px;
//   color: ${Colors.secondary};
//   marginbottom: 1px;
// `;
export const OfferContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const NumberOfComentsText = styled.Text`
  font-size: 10px;
  color: ${Colors.white};
`;
const UserImage = styled(FastImage)`
`;
// width: 40px;
// height: 40px;
// background-color: ${Colors.white};
// border-radius: 20px;
const UserNameText = styled.Text`
  font-size: 18px;
  color: ${Colors.white};
  font-family: 'SourceSansPro-Bold';
`;
const LastTimeText = styled.Text`
  color: ${Colors.titleGray};
  font-size: 10px;
`;
const CommentIcon = styled(FastImage)`
  width: 20px;
  height: 20px;
`;
const CommentText = styled.Text`
  color: ${Colors.titleGray};
  font-size: 14px;
  font-family: 'SourceSansPro-Regular';
`;
// { navigation, id, promotion, onPress, promotion: {
//   image, name, discounted, logo
// } = {}}
// image ? { uri: image } :

export const CardView = ({ _id, name, postTime, commentCount, disc, icon, navigation, likedByMe, likes_count,onPress }: any) => {
  const [totalLikes, settotalLikes] = useState(likes_count);
  const [sendLike, setsendLike] = useState(likedByMe);
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const dispatch = useDispatch();
  console.log(sendLike, likedByMe, ';566666666')
  const numberOfLikes = () => {
    dispatch(_likeDisLike(currentUser, _id, navigation))
    if (!sendLike) {
      settotalLikes(totalLikes + 1)
    } else {
      if (totalLikes > 0) {
        settotalLikes(totalLikes - 1)
      }
    }
  }
  // _likeDisLike
  // useEffect(() => {
  //   dispatch(_likeDisLike(currentUser, _id, navigation))
  // }, [])
  return (
    <TouchableScale
      style={{ flex: 1 }}
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      onPress={() => onPress()}>
      <CardPlaceholder>
        <CardContainer>
          <PromotionTileWrapper>
            <CardTileCoverContainer>
              <CardTileCover
                source={require('../../assets/images/car.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </CardTileCoverContainer>
            <View style={{ height: "100%", width: "100%", padding: 5, alignItems: "flex-end", position: "absolute", zIndex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  setsendLike(!sendLike)
                  numberOfLikes()

                  // dispatch(_likeDisLike(currentUser, _id, navigation))
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
                  source={require('../../assets/images/RealHeart.png')}
                  resizeMode="contain"
                />
                <Text style={{ color: "#ffffff", elevation: 2 }}>{totalLikes}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "red",
                marginHorizontal: 10,
              }}>
              <PromotionTileTitleContainer>
                <OfferContainer>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{
                      width: 40,
                      height: 40,
                      backgroundColor: Colors.black,
                      borderRadius: 20, overflow: "hidden", justifyContent: "center", alignItems: 'center'
                    }}>

                      <UserImage
                        // resizeMode={FastImage.resizeMode.contain}
                        style={{ height: "100%", width: "100%" }}
                        source={
                          icon ?
                            { uri: icon }
                            :
                            require('../../assets/users/avatars-material-man-1.png')
                        }
                      />
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                      <UserNameText>{name}</UserNameText>
                      <LastTimeText>{moment(postTime).fromNow()}</LastTimeText>
                    </View>
                  </View>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <CommentIcon
                      resizeMode={FastImage.resizeMode.contain}
                      source={require('../../assets/images/comment.png')}
                    />
                    <NumberOfComentsText>{commentCount}</NumberOfComentsText>
                  </View>
                </OfferContainer>
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: 'gray',
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                />
                <CommentText numberOfLines={2}>
                  {disc}{' '}
                </CommentText>
              </PromotionTileTitleContainer>
            </View>
          </PromotionTileWrapper>
        </CardContainer>
      </CardPlaceholder>
    </TouchableScale >
  );
};
