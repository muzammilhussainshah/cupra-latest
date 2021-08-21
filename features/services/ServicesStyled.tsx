import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import TouchableScale from 'react-native-touchable-scale';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { _getSubServiceRating } from '../../store/action/serviceAction'
import { Colors } from '../../constants/Colors';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.secondary};
  `;
// justify-content: center;
const CardTileCoverContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 14px;
`;
const CardTileCover = styled(FastImage)`
  width: 360px;
  height: 160px;
  border-radius: 14px;
`;
const CardPlaceholder = styled.View`
  height: 200px;
  margin-right: 20px;
  margin-left: 20px;
`;

export const CardBannerSection = ({ bannerPath }: any) => (
  <TouchableScale
    style={{}}
    activeScale={0.9}
    tension={50}
    friction={7}
    useNativeDriver
    onPress={() => { }}>
    <CardPlaceholder>
      <CardTileCoverContainer>
        {
          bannerPath ?
            <CardTileCover
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: bannerPath }}
            /> :
            <CardTileCover
              resizeMode={FastImage.resizeMode.cover}
              source={
                require('../../assets/images/car.png')
              }
            />

        }
      </CardTileCoverContainer>
    </CardPlaceholder>
  </TouchableScale>
);

const UserName = styled.Text`
  color: ${Colors.titleGray};
  font-size: 14px;
  font-family: 'SourceSansPro-Regular';
`;
const ServiceTitle = styled.Text`
  font-size: 18px;
  font-family: 'SourceSansPro-Bold';
  color: ${Colors.white};
`;
const GreetingContainer = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;
export type IGreetingTypeProp = {
  name: string;
  seriveTitle: string;
};
export const ServicesGreeting: React.FC<IGreetingTypeProp> = ({
  name,
  seriveTitle,
}) => {
  const isLoader = useSelector(({ reducer }: any) => reducer.isLoader);
  return (

    <GreetingContainer>
      <ServiceTitle>Hello {name} !</ServiceTitle>
      <ServiceTitle>{seriveTitle}</ServiceTitle>
      {isLoader &&
        <ActivityIndicator
          style={{ marginTop: "15%" }}
          size="small" color={'#ffffff'}
        />}
    </GreetingContainer>
  )
}


const SevicesPlaceholder = styled.View`
  height: 220px;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  justify-content: center;
`;
const ServiceTileCover = styled(FastImage)`
  width: 160px;
  height: 150px;
  border-radius: 10px;
`;
const ServiceName = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
  font-family: 'SourceSansPro-Regular';
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
const ServiceNumber = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
  font-family: 'SourceSansPro-Regular';
  padding-left: 5px;
`;
const RowView = styled.View`
  flex-direction: row;
  align-items: center;
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
const BookingLabel = styled.View`
  position: absolute;
  background-color: ${Colors.primary};
  border-width: 1px;
  border-color: ${Colors.titleGray};
  border-radius: 20px;
  padding: 4px 10px;
  right: 0;
  bottom: 60px;
`;
const BookingTitle = styled.Text`
  color: ${Colors.white};
  font-size: 16px;
  font-family: 'SourceSansPro-Regular';
`;
export type IServiceTypeProp = {
  serviceImage?: any;
  serviceName: string | undefined;
  numberOfService?: number;
  navigation?: any;
  numberOfRates?: number;
  getserviceId?: string;
  itemId?: string;

  onPress?: () => void;
  isBooking?: boolean;
};
export const ServicesTile: React.FC<IServiceTypeProp> = ({
  serviceImage,
  serviceName,
  getserviceId,
  numberOfService,
  numberOfRates,
  itemId,
  navigation,
  onPress,
  isBooking,
}) => {
  let dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  console.log(getserviceId, 'vvv')
  return (
    <TouchableScale
      style={{ flex: 1, maxWidth: "50%" }}
      activeScale={0.9}
      tension={50}
      friction={7}
      useNativeDriver
      onPress={onPress}>
      <SevicesPlaceholder>
        <ServiceTileCover source={serviceImage} />
        {isBooking && (
          <BookingLabel>
            <BookingTitle>Book Now</BookingTitle>
          </BookingLabel>
        )}
        <ServiceName numberOfLines={1}>{serviceName}</ServiceName>
        <BottomContainer>
          <RowView>
            <SteeringImage
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/images/steering.png')}
            />
            <ServiceNumber>{numberOfService}+</ServiceNumber>
          </RowView>
          {isBooking ?
            <TouchableOpacity

              onPress={() =>
                dispatch(_getSubServiceRating(currentUser, itemId, serviceName, navigation, getserviceId))
                // navigation.navigate('GetAndSubmitReview', navigation,)

              }
            >

              <RowView>
                <NumberOfRates>{Math.floor(numberOfRates * 10) / 10}</NumberOfRates>
                <SteeringImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={require('../../assets/images/RealStar.png')}
                />
              </RowView>
            </TouchableOpacity>
            :
            <RowView>
              <NumberOfRates>{Math.floor(numberOfRates * 10) / 10}</NumberOfRates>
              <SteeringImage
                resizeMode={FastImage.resizeMode.contain}
                source={require('../../assets/images/RealStar.png')}
              />
            </RowView>
          }
        </BottomContainer>
      </SevicesPlaceholder>
    </TouchableScale >
  )
};
