import React, { useEffect, useState } from 'react';

import { Text, ScrollView, Dimensions, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';

import FastImage from 'react-native-fast-image';

import { MainSheet } from '../../../components/MainSheet';

import FullImage from '../../../components/fullImage';

import { Colors } from '../../../constants/Colors';

import { SliderBox } from "react-native-image-slider-box";

import { _getHexColor, } from "../../../store/action/action"

import { _getNewsItemDetails, _likeDisLike, _getNewsComment } from "../../../store/action/newsAction"

import { useDispatch, useSelector } from 'react-redux';

import { _getItemDetails, } from '../../../store/action/shopAction';
import {
  Backgroundimage,
  DescriptionArea,
  DateOf,
  ClientName,
  ItemName,
  ShopDetailsContainer,
  ReserveNowArea,
  SizeArea,
  ServiceApplied,
} from './HomeDetailStyled';

// TODO: Remove the views and handle the component from the styled
export const HomeDetail = ({ route, navigation }: any) => {
  const Wheight = Dimensions.get('window').height;

  const [coverImage, setcoverImage] = useState()

  const [imageSlider, setimageSlider] = useState(false)

  const [fullImageScreen, setFullImageScreen] = useState(false)

  const routes = route.params

  const isLoader = useSelector((state: any) => state.reducer.isLoader)

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const newsItemDetails = useSelector((state: any) => state.reducer.newsItemDetails)

  const item = routes;

  const { filterdBy } = item

  const { icon, brand, en_desc, en_client_name, likes_count, comments_count, services, subservices, en_header, year, date, model, likedByMe, _id } = newsItemDetails;

  const [totalLikes, settotalLikes] = useState(likes_count);

  const [sendLike, setsendLike] = useState(likedByMe);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_getNewsItemDetails(currentUser, item.newsId, navigation,))
  }, [])

  useEffect(() => {
    setcoverImage(icon)
    settotalLikes(likes_count)
  }, [newsItemDetails])

  const numberOfLikes = () => {
    dispatch(_likeDisLike(currentUser, item.newsId, navigation))
    if (!sendLike) {
      settotalLikes(totalLikes + 1)
    } else {
      if (totalLikes > 0) {
        settotalLikes(totalLikes - 1)
      }
    }
  }

  return (
    <>
      {fullImageScreen &&
        <View style={{ height: "100%", width: "100%" }}>
          <FullImage
            coverImage={coverImage} _func={() => setFullImageScreen(false)} />
        </View>
      }
      <View style={{ height: 55, width: 55, position: "absolute", right: 40, top: "35%", zIndex: 1, }}>
        <TouchableOpacity onPress={() => {
          setsendLike(!sendLike)
          numberOfLikes()
        }}
          activeOpacity={0.8}
          style={{
            justifyContent: "center",
            backgroundColor: "#fff",
            elevation: 2,
            borderRadius: 10,
            height: 55,
            width: 55,
            alignItems: "center"
          }}>
          <FastImage
            style={{ height: 25, width: 25, }}
            source={require('../../../assets/images/RealHeart.png')}
            resizeMode="contain"
          />
          <Text style={{}}>{totalLikes}</Text>
        </TouchableOpacity>
      </View>

      <ShopDetailsContainer>
        {imageSlider ?
          <SliderBox
            images={coverImage}
            sliderBoxHeight={Wheight - 390}
            resizeMode={'cover'}
            onCurrentImagePressed={(index: any) => {
              console.log(index, 'indexindexindex')
              setFullImageScreen(true)
            }}
          />
          :
          isLoader ?
            <ActivityIndicator
              style={{ marginTop: "20%" }}
              size="small" color={'black'}
            /> :
            <TouchableOpacity onPress={() => setFullImageScreen(true)}>
              <Backgroundimage source={{ uri: coverImage }} resizeMode={FastImage.resizeMode.cover} />
            </TouchableOpacity>
        }
        <TouchableOpacity style={{ position: 'absolute', top: 50, left: 10, backgroundColor: Colors.primary, height: 50, width: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => { navigation.goBack() }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> {'<'} </Text>
        </TouchableOpacity>
        <MainSheet scroll sheetHeight={0.4}>

          {isLoader ?
            <ActivityIndicator
              style={{ marginTop: "20%" }}
              size="small" color={'black'}
            /> :

            <ScrollView contentContainerStyle={{ paddingBottom: 170 }}>
              <View style={{ width: "60%" }}>
                <ItemName>{en_header}</ItemName>
              </View>
              <View style={{ flexDirection: "row", marginVertical: 5 }}>
              </View>
              <ClientName name={en_client_name} />
              <DateOf date={date} />
              <DescriptionArea
                description={en_desc}
              />
              <SizeArea
                Brand={brand && brand.en_name} Modal={model && model.en_name} Year={year}
              />
              <ServiceApplied serviceName={"Services Applied"} serviceTitle={services} />
              <ServiceApplied serviceName={"Sub Services Applied"} serviceTitle={subservices} />
            </ScrollView>
          }
        </MainSheet>
        <ReserveNowArea>
          <Text style={{ color: 'white', fontSize: 20, }}>{comments_count} Comments</Text>
          <TouchableOpacity
            onPress={() => { dispatch(_getNewsComment(currentUser, _id, navigation, filterdBy)) }}
            style={{ borderRadius: 10, backgroundColor: Colors.primary, width: 150, height: "70%", justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 14 }}>Add Comment</Text>
          </TouchableOpacity>
        </ReserveNowArea>
      </ShopDetailsContainer>

    </>
  )
}
