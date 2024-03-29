import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';

import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { _getSubServices } from '../../store/action/serviceAction';

import { FlatList } from 'react-native';

import { Header } from '../../components/Header';

import { BottomTabParamList } from '../../routes/BottomTabNavigator';

import { ServicesStackParamList } from '../../routes/ServicesTab';

import {
  CardBannerSection,
  Container,
  ServicesGreeting,
  ServicesTile,
} from './ServicesStyled';

import { SubServices } from '../../data/StaticSubServices';
export interface SubServiceScreenProps { }

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<ServicesStackParamList, 'subservice'>,
  BottomTabNavigationProp<BottomTabParamList, 'ServicesTab'>
>;

type RouteProps = RouteProp<ServicesStackParamList, 'serviceScreen'>;

type Props = {
  route: RouteProps;
  navigation: NavigationProps;
};

export const SubServiceScreen: React.FC<Props> = ({ route, navigation }: any) => {
  const [subservices, setsubservices] = useState([]);

  const [flag, setflag] = useState(false);

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const getsubServices = useSelector((state: any) => state.reducer.subservices)

  const routes = route.params

  const { serviceId } = routes;
  console.log(routes, 'routerouterouterouterouterouteroute')
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_getSubServices(currentUser, serviceId, navigation))
  }, [])


  useEffect(() => {
    setsubservices(getsubServices)
    setflag(!flag)
  }, [getsubServices])
  return (
    <Container>
      <Header isGoBack={true} navigateBack={() => navigation.goBack()} />
      <CardBannerSection bannerPath={routes.item.banner} banner_type={routes.item.banner_type} />
      <ServicesGreeting
        name={currentUser.full_name}
        seriveTitle={'You want to book this service ?'}
      />

      {subservices.length > 0 && <FlatList
        contentContainerStyle={{ paddingBottom: 90 }}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.id}
        data={subservices}
        renderItem={({ item }: any) => (
          <>
            {/* {console.log(item, '++++++++++++++')} */}

            <ServicesTile
              navigation={navigation}
              isBooking={true}
              numberOfRates={item.rating}
              numberOfService={item.total_bookings}
              serviceName={item.en_name}
              itemId={item._id}
              getserviceId={serviceId}
              serviceImage={{ uri: item.icon }}
              onPress={() => {
                navigation.push('booking', { serviceId, subserviceId: item._id });
              }}
            />
          </>
        )}
      />
      }
    </Container>
  );
};
