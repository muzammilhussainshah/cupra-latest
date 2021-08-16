import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import TouchableScale from 'react-native-touchable-scale';
import styled from 'styled-components/native';
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
  onPress?: () => void;
};
export const ImageTile: React.FC<IImageTypeProp> = ({
  imageUri,
  onPress,
}) => (
  <TouchableScale
    style={{ flex: 1 }}
    activeScale={0.9}
    tension={50}
    friction={7}
    useNativeDriver
    onPress={onPress}>
    <ImagePlaceholder>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ImageTileCover source={imageUri} />
        <BottomContainer>
          <RowView>
            <Text style={{ color: 'white', fontSize: 15, paddingRight: 20 }}>29 min</Text>
          </RowView>
          <RowView>
            <SteeringImage
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/images/comment.png')}
            />
            <NumberOfRates>20</NumberOfRates>
            <SteeringImage
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/images/heart.png')}
            />
            <NumberOfRates>20</NumberOfRates>
          </RowView>
        </BottomContainer>
      </View>
    </ImagePlaceholder>
  </TouchableScale>
);
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
