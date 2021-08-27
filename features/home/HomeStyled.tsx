import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import styled from 'styled-components/native';

import { Colors } from '../../constants/Colors';

import moment from 'moment';

import TouchableScale from 'react-native-touchable-scale';

import { _likeDisLike, _getNewsComment } from "../../store/action/newsAction";

import { useDispatch, useSelector } from 'react-redux';

import FastImage from 'react-native-fast-image';

import { View, TouchableOpacity, Text } from 'react-native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.secondary};
  `;

const CardContainer = styled.View`
  height: 215px;
  align-items: center;
  flex-direction: row;
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

export const CardView = ({ _id, name, postTime, commentCount, disc, icon, navigation, likedByMe, likes_count, onPress, filterdBy, index }: any) => {
  const [totalLikes, settotalLikes] = useState(likes_count);
  const [sendLike, setsendLike] = useState(likedByMe);
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const getNews = useSelector((state: any) => state.reducer.getNews)
  const dispatch = useDispatch();

  const removeTags = (str) => {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();

    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/ig, '');
  }
  const numberOfLikes = () => {
    dispatch(_likeDisLike(currentUser, _id, navigation, filterdBy, getNews, likedByMe, index))
    if (!sendLike) {
      settotalLikes(totalLikes + 1)
    } else {
      if (totalLikes > 0) {
        settotalLikes(totalLikes - 1)
      }
    }
  }
  return (
    <>
      <TouchableOpacity

        onPress={() => {
          dispatch(_getNewsComment(currentUser, _id, navigation, filterdBy))
        }}
        style={{ justifyContent: 'center', alignItems: 'center', position: "absolute", bottom: "26%", right: "12%", zIndex: 1 }}>
        <CommentIcon
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../assets/images/comment.png')}
        />
        <NumberOfComentsText>{commentCount}</NumberOfComentsText>
      </TouchableOpacity>

      <View
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }}
      >
        <CardPlaceholder>
          <CardContainer>
            <PromotionTileWrapper>
              <TouchableScale
                onPress={() => onPress()}
                style={{ justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}
                activeScale={0.9}
                tension={50}
                friction={7}
                useNativeDriver
              >
                <CardTileCover
                  source={{ uri: icon }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </TouchableScale>
              <View style={{ width: "100%", padding: 10, alignItems: "flex-end", position: "absolute", zIndex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    setsendLike(!sendLike)
                    numberOfLikes()
                  }}
                  activeOpacity={0.9}
                  style={{
                    flexDirection: "row",
                    borderRadius: 10,
                  }}>
                  <FastImage
                    style={{ height: 20, width: 20, }}
                    source={require('../../assets/images/RealHeart.png')}
                    resizeMode="contain"
                  />
                  <Text style={{ color: "#ffffff", marginHorizontal: 7, elevation: 2 }}>{totalLikes}</Text>
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
                        <UserNameText>
                          {name.substring(0, 25)} {disc.length > 25 && '...'}
                        </UserNameText>

                        <LastTimeText>{moment(postTime).fromNow()}</LastTimeText>
                      </View>
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
                  <CommentText style={{ maxWidth: "90%" }} numberOfLines={2}>
                    {removeTags(disc).substring(0, 75)} {disc.length > 75 && '...'}
                  </CommentText>
                </PromotionTileTitleContainer>
              </View>
            </PromotionTileWrapper>
          </CardContainer>
        </CardPlaceholder>
      </View >
    </>
  );
};
