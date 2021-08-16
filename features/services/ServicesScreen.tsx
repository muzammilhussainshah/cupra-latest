import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';

import { Header } from '../../components/Header';
import { StaticServices } from '../../data/StaticServices';
import {
  CardBannerSection,
  Container,
  ServicesGreeting,
  ServicesTile,
} from './ServicesStyled';

export const ServicesScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Header
        onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <CardBannerSection />
      <ServicesGreeting
        name={'mohammad'}
        seriveTitle={'You want to book a service ?'}
      />
      <FlatList
        contentContainerStyle={{ paddingBottom: 90 }}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={StaticServices?.map(user => user)}
        renderItem={({ item }) => (
          <ServicesTile
            numberOfRates={item.rate}
            numberOfService={item.number_of_servies}
            serviceName={item.service_name}
            serviceImage={item.uri}
            onPress={() => navigation.navigate('subservice', item)}
          />
        )}
      />
    </Container>
  );
};
