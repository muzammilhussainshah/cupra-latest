import React from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import TouchableScale from 'react-native-touchable-scale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import {Colors} from '../../constants/Colors';

export const VideoContainer = styled(SafeAreaView)`
  background-color: ${Colors.secondary};
  flex: 1;
`;
const VideoPlaceholder = styled.View`
  height: 220px;
  margin-left: 20px;
`;
const VideoTileCover = styled(FastImage)`
  width: 160px;
  height: 150px;
  border-radius: 10px;
`;
const VideoName = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
  font-family: 'SourceSansPro-Regular';
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
const VideoNumber = styled.Text`
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
  margin-top: 10px;
`;
const VideoLabel = styled.View`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 150px;
  border-radius: 10px;
`;
const BookingTitle = styled.View`
  color: ${Colors.white};
  font-size: 16px;
  font-family: 'SourceSansPro-Regular';
`;
export type IVideoTypeProp = {
  VideoImage?: any;
  numberOfRates?: number;
  onPress?: () => void;
};
export const VideoTile: React.FC<IVideoTypeProp> = ({VideoImage, onPress}) => (
  <TouchableScale
    style={{flex: 1}}
    activeScale={0.9}
    tension={50}
    friction={7}
    useNativeDriver
    onPress={onPress}>
    <VideoPlaceholder>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <VideoTileCover source={VideoImage} />
        <VideoLabel>
          <BookingTitle>
            <Ionicons name="play-circle-outline" size={50} color="white" />
          </BookingTitle>
        </VideoLabel>
      </View>
      <BottomContainer>
        <RowView>
          <Text style={{color: 'white', fontSize: 15}}>29 min</Text>
        </RowView>
        <RowView>
          <SteeringImage
            resizeMode={FastImage.resizeMode.contain}
            source={require('../../assets/images/comment.png')}
          />
          <NumberOfRates>20</NumberOfRates>
          <SteeringImage
            resizeMode={FastImage.resizeMode.contain}
            source={require('../../assets/images/RealHeart.png')}
          />
          <NumberOfRates>20</NumberOfRates>
        </RowView>
      </BottomContainer>
    </VideoPlaceholder>
  </TouchableScale>
);
export const VideoTitleWrapper = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
`;
export const VideoTitle = styled.Text`
  color: ${Colors.white};
  font-size: 20px;
  font-family: 'SourceSansPro-Regular';
`;
