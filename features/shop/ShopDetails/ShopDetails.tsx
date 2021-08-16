import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { MainSheet } from '../../../components/MainSheet';
import { Colors } from '../../../constants/Colors';
import {
  Backgroundimage,
  ColorContianer,
  DescriptionArea,
  ItemName,
  QuantityArea,
  ReserveNowArea,
  ShopDetailsContainer,
  SizeArea,
  TreatmentArea,
} from './ShopDetailsStyled';

// TODO: Remove the views and handle the component from the styled
export const ShopDetails = ({ route, navigation }: any) => {
  console.warn(route.params, 'route');
  const routes = route.params
  const {en_name,icon,en_desc,size,price,height,width,} = routes;


  return (
    <ShopDetailsContainer>
      <Backgroundimage source={{uri:icon}} resizeMode={FastImage.resizeMode.cover} />
      <TouchableOpacity style={{ position: 'absolute', top: 50, left: 10, backgroundColor: Colors.primary, height: 50, width: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => { navigation.goBack() }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> {'<'} </Text>
      </TouchableOpacity>
      <MainSheet scroll sheetHeight={0.4}>
        <ItemName>{en_name}</ItemName>
        <DescriptionArea description={en_desc} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <SizeArea size={{ height, width, diameter:size }} />
          </View>
          <View>
            <TreatmentArea treatment={routes.treatment} />
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View >
            <ColorContianer color={"black"} />
          </View>
          <View style={{ margin: 24, paddingLeft: 100 }}>
            <QuantityArea />
          </View>
        </View>
      </MainSheet>
      <ReserveNowArea>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>JD {price}</Text>
        <TouchableOpacity style={{ borderRadius: 10, backgroundColor: Colors.primary, width: 100, height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>ReserveNow</Text>
        </TouchableOpacity>
      </ReserveNowArea>
    </ShopDetailsContainer>
  )
}
