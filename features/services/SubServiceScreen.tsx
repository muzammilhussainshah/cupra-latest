import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {FlatList} from 'react-native';
import {Header} from '../../components/Header';
import {BottomTabParamList} from '../../routes/BottomTabNavigator';
import {ServicesStackParamList} from '../../routes/ServicesTab';
import {
  CardBannerSection,
  Container,
  ServicesGreeting,
  ServicesTile,
} from './ServicesStyled';
import {SubServices} from '../../data/StaticSubServices';
export interface SubServiceScreenProps {}

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<ServicesStackParamList, 'subservice'>,
  BottomTabNavigationProp<BottomTabParamList, 'ServicesTab'>
>;

type RouteProps = RouteProp<ServicesStackParamList, 'serviceScreen'>;

type Props = {
  route: RouteProps;
  navigation: NavigationProps;
};

export const SubServiceScreen: React.FC<Props> = props => {
  return (
    <Container>
      <Header isGoBack={true} navigateBack={() => props.navigation.goBack()} />
      <CardBannerSection />
      <ServicesGreeting
        name={'mohammad'}
        seriveTitle={'You want to book this service ?'}
      />
      <FlatList
        contentContainerStyle={{paddingBottom: 90}}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={SubServices?.map(user => user)}
        renderItem={({item}) => (
          <ServicesTile
            isBooking={true}
            numberOfRates={item.sub_service_rate}
            numberOfService={item.sub_service_number}
            serviceName={item.sub_service_name}
            serviceImage={item.uri}
            onPress={() => {
              props.navigation.push('booking');
            }}
          />
        )}
      />
    </Container>
  );
};
