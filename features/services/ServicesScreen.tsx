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
  const [search, setsearch] = useState([]);

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
    console.log(getServices, 'getServicesgetServicesgetServices')
    setflag(!flag)
  }, [getServices])

  const searchUser: any = (e: any) => {
    let keywords = e.split(' ')
    setsearch(keywords)
    // console.log('working fine')
    if (keywords[0] === "") {
      setservices(getServices)
    }
    if (keywords[0] !== "") {
      let searchPattern = new RegExp(keywords.map((term: any) => `(?=.*${term})`).join(''), 'i');
      let filterChat = [];
      for (let index = 0; index < getServices.length; index++) {
        filterChat = getServices.filter((data: any) => { return data.en_name.match(searchPattern) });
      }
      setservices(filterChat)
    }
  }

  return (
    <Container>
      <Header
        _func={(e: any) => searchUser(e)}
        onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
        searchBarInput={true}
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
