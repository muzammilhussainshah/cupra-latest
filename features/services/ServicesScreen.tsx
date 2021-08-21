import { DrawerActions, useNavigation } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';

import { FlatList, ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { _getServices } from '../../store/action/serviceAction';

import { Header } from '../../components/Header';

import { StaticServices } from '../../data/StaticServices';

import {
  CardBannerSection,
  Container,
  ServicesGreeting,
  ServicesTile,
} from './ServicesStyled';

export const ServicesScreen: React.FC = () => {
  const [services, setservices] = useState([]);

  const [flag, setflag] = useState(false);

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const getServices = useSelector((state: any) => state.reducer.services)

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(_getServices(currentUser, navigation))
  }, [])

  useEffect(() => {
    setservices(getServices)
    setflag(!flag)
  }, [getServices])

  return (
    <Container>
      <Header
        onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      {/* <CardBannerSection /> */}
      <ServicesGreeting
        name={currentUser.full_name}
        seriveTitle={'You want to book a service ?'}
      />
      
      {services.length > 0 && <FlatList
        contentContainerStyle={{ paddingBottom: 90 }}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item._id}
        data={services}
        renderItem={({ item }: any) => (
          <>
            {console.log(item,'----------------------------------')}
            < ServicesTile
              numberOfRates={item.rating}
              numberOfService={item.total_bookings}
              serviceName={item.en_name}
              serviceImage={{ uri: item.image }}
              onPress={() => navigation.navigate('subservice', { item, 'serviceId': item._id })}
            />
          </>
        )}
      />}
      
    </Container>
  );
};
