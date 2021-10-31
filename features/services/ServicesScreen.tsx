import { DrawerActions, useNavigation } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';

import { FlatList, ActivityIndicator,Platform } from 'react-native';

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
  const [searchTxt, setsearchTxt] = useState('')

  const [isEmptyserch, setisEmptyserch] = useState(false)

  const [flag, setflag] = useState(false);

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const getServices = useSelector((state: any) => state.reducer.services)
  const isLoader = useSelector(({ reducer }: any) => reducer.isLoader);
  const [serviceLoader, setserviceLoader] = useState<any>(false)

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setserviceLoader(true)
    dispatch(_getServices(currentUser, navigation,setserviceLoader))
  }, [])

  useEffect(() => {
    setservices(getServices)
    console.log(getServices, 'getServicesgetServicesgetServices')
    setflag(!flag)
  }, [getServices])

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setisEmptyserch(false)
      // setservices(getServices)
      dispatch(_getServices(currentUser, navigation))

      // dispatch(_stories(currentUser, filterdBy, navigation,))
      // if(searchTxt){
      // }
      // console.log(searchTxt,"searchTxt")

    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setisEmptyserch(true)
      // if (searchTxt !== '') {
      //   console.log(searchTxt,"searchTxt")
      //   dispatch(_stories(currentUser, filterdBy, navigation,))
      // }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);






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
    <Container >     
    {/* <Container style={{paddingVertical:Platform.OS="ios"?-15:0}}>      */}
    
      
      <Header
        isEmptyserch={isEmptyserch}

        _func={(e: any) => {

          searchUser(e)
          setsearchTxt(e)
        }
        }
        onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
        notiScreen={() => navigation.navigate('notification')}
        searchBarInput={true}
      />
      {/* <CardBannerSection /> */}
      <ServicesGreeting
        name={currentUser.full_name}
        seriveTitle={'You want to book a service ?'}
      />
      {serviceLoader &&
        <ActivityIndicator
          style={{ marginTop: "15%" }}
          size="small" color={'black'}
        />}
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
