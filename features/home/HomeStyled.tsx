import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {Colors} from '../../constants/Colors';
import TouchableScale from 'react-native-touchable-scale';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native';
// TODO:Refactor the inline style
export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.secondary};
  justify-content: center;
`;

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
  width: 40px;
  height: 40px;
  background-color: ${Colors.white};
  border-radius: 20px;
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
// { navigation, id, promotion, onPress, promotion: {
//   image, name, discounted, logo
// } = {}}
// image ? { uri: image } :
export const CardView = () => {
  return (
    <TouchableScale
      style={{flex: 1}}
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      onPress={() => {}}>
      <CardPlaceholder>
        <CardContainer>
          <PromotionTileWrapper>
            <CardTileCoverContainer>
              <CardTileCover
                source={require('../../assets/images/car.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </CardTileCoverContainer>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <PromotionTileTitleContainer>
                <OfferContainer>
                  <View style={{flexDirection: 'row'}}>
                    <UserImage
                      resizeMode={FastImage.resizeMode.contain}
                      source={require('../../assets/users/avatars-material-man-1.png')}
                    />
                    <View style={{paddingLeft: 10}}>
                      <UserNameText>Mohammed Salem</UserNameText>
                      <LastTimeText>29 min ago</LastTimeText>
                    </View>
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <CommentIcon
                      resizeMode={FastImage.resizeMode.contain}
                      source={require('../../assets/images/comment.png')}
                    />
                    <NumberOfComentsText>2000</NumberOfComentsText>
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
                  Many Thanks Mr. Mohammed for your trust in Cupra, it was our
                  pleasure to serve you{' '}
                </CommentText>
              </PromotionTileTitleContainer>
            </View>
          </PromotionTileWrapper>
        </CardContainer>
      </CardPlaceholder>
    </TouchableScale>
  );
};
