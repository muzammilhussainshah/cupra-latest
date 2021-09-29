import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';

import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { _getSubServices } from '../../store/action/serviceAction';

import { FlatList } from 'react-native';

import { Header } from '../../components/Header';

import { height } from '../../constants/Layout';

import { BottomTabParamList } from '../../routes/BottomTabNavigator';

import { ServicesStackParamList } from '../../routes/ServicesTab';

import {
  CardBannerSection,
  Container,
  ServicesGreeting,
  ServicesTile,
} from './ServicesStyled';

import { SubServices } from '../../data/StaticSubServices';
import { ScrollView } from 'react-native-gesture-handler';
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
  const [search, setsearch] = useState([]);

  const [flag, setflag] = useState(false);
  const [isHome, setisHome] = useState(true);

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const getsubServices = useSelector((state: any) => state.reducer.subservices)

  const routes = route.params

  const { serviceId } = routes;
  console.log(routes, 'routerouterouterouterouterouteroute')
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setisHome(false)
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setisHome(true)
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);






  useEffect(() => {
    dispatch(_getSubServices(currentUser, serviceId, navigation))
  }, [])


  useEffect(() => {
    setsubservices(getsubServices)
    setflag(!flag)
  }, [getsubServices])


  const searchUser: any = (e: any) => {
    let keywords = e.split(' ')
    setsearch(keywords)
    // console.log('working fine')
    if (keywords[0] === "") {
      setsubservices(getsubServices)
    }
    if (keywords[0] !== "") {
      let searchPattern = new RegExp(keywords.map((term: any) => `(?=.*${term})`).join(''), 'i');
      let filterChat = [];
      for (let index = 0; index < getsubServices.length; index++) {
        filterChat = getsubServices.filter((data: any) => { return data.en_name.match(searchPattern) });
      }
      setsubservices(filterChat)
    }
  }

  return (
    <ScrollView>

      <Container style={{ height: height }}>

        <Header isGoBack={true} navigateBack={() => navigation.goBack()}
          notiScreen={() => navigation.navigate('notification')}
          _func={(e: any) => searchUser(e)}
          searchBarInput={true}
        />
        {isHome &&
          <CardBannerSection bannerPath={routes.item.banner} banner_type={routes.item.banner_type} />
        }
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
                  navigation.push('booking', { serviceId, subserviceId: item._id, serviceName: item.en_name });
                }}
              />
            </>
          )}
        />
        }
      </Container>
    </ScrollView>
  );
};
