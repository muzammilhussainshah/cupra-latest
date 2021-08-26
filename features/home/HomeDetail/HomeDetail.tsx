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
import { SIGNUPUSER, CURRENTUSER, ISLOADER, ISERROR, GETNEWS, NEWSITEMDETAILS, GETADDS, GETSTORIES, NEWSCOMMENT } from "../../../store/constant/constant";

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

  const [imageSlider, setimageSlider] = useState([])

  const [flag, setflag] = useState(false)

  const [videosSlider, setvideosSlider] = useState([])

  const [fullImageScreen, setFullImageScreen] = useState(false)

  const routes = route.params

  const isLoader = useSelector((state: any) => state.reducer.isLoader)

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const getNews = useSelector((state: any) => state.reducer.getNews)

  const [selectedImageIndex, setSelectedImageIndex] = useState()

  const newsItemDetails = useSelector((state: any) => state.reducer.newsItemDetails)

  const item = routes;

  const { filterdBy } = item

  const { icon, brand, en_desc, en_client_name, likes_count, comments_count, services, subservices, en_header, year, date, model, likedByMe, _id, media } = newsItemDetails;

  const [totalLikes, settotalLikes] = useState(item.noOfLikes);

  const [sendLike, setsendLike] = useState(item.likedByMe);

  const dispatch = useDispatch()

  useEffect(() => {
    console.log(item, "itemitemitem")
    dispatch(_getNewsItemDetails(currentUser, item.newsId, navigation,))
  }, [])

  useEffect(() => {
    setcoverImage(icon)
    settotalLikes(likes_count)
    console.log(newsItemDetails, ']]]]]]]]]]]]]]]]]]]]')
    if (newsItemDetails.media && newsItemDetails.media.length > 0) {
      console.log(newsItemDetails.media, "newsItemDetails.media")
      let images = newsItemDetails.media.map((obj: any) => obj.type === "IMAGE" && obj.url);
      let videos = newsItemDetails.media.map((obj: any) => obj.type === "VIDEO" && obj.url);
      const filterVideos = videos.filter((uri: any) => uri !== false);
      const filterImages = images.filter((uri: any) => uri !== false);
      console.log(filterImages, '.filterImagesfilterfilter', filterVideos)
      setimageSlider(filterImages);
      setvideosSlider(filterVideos);
    }
  }, [newsItemDetails])


  const numberOfLikes = () => {
    dispatch(_likeDisLike(currentUser, item.newsId, navigation, filterdBy, getNews, item.likedByMe, item.index))
    if (!sendLike) {
      settotalLikes(totalLikes + 1)
    } else {
      if (totalLikes > 0) {
        settotalLikes(totalLikes - 1)
      }
    }
    setflag(true)
  }

  return (
    <>
      {fullImageScreen &&
        <View style={{ height: "100%", width: "100%" }}>
          <FullImage sliderBoxEnabled={true} selectedImageIndex={selectedImageIndex} coverImage={imageSlider.length > 0 ? imageSlider : coverImage} _func={() => setFullImageScreen(false)} />
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
      {videosSlider.length > 0 &&
        <View style={{ height: 55, width: 55, position: "absolute", right: 100, top: "35%", zIndex: 1, }}>
          <TouchableOpacity onPress={() => {
            navigation.navigate("VideosUri", { videosSlider })
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
              source={require('../../../assets/images/video.png')}
              resizeMode="contain"
            />
            <Text style={{}}>{videosSlider.length}</Text>
          </TouchableOpacity>
        </View>
      }

      <ShopDetailsContainer>
        {imageSlider.length > 0 ?
          <SliderBox
            images={imageSlider}
            sliderBoxHeight={Wheight - 390}
            resizeMode={'cover'}
            onCurrentImagePressed={(index: any) => {
              console.log(index, 'indexindexindex')
              setSelectedImageIndex(index)
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
        <TouchableOpacity style={{ position: 'absolute', top: 50, left: 10, backgroundColor: Colors.primary, height: 50, width: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
          // navigation.goBack()
          if (flag) { navigation.push("drawerStack") }
          else { navigation.goBack() }
          dispatch({ type: NEWSITEMDETAILS, payload: {} })
        }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> {'<'} </Text>
        </TouchableOpacity>
        <MainSheet scroll sheetHeight={0.4}>

          {isLoader ?
            <ActivityIndicator
              style={{ marginTop: "20%" }}
              size="small" color={'black'}
            /> :

            <ScrollView contentContainerStyle={{ paddingBottom: 170 }}>
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ width: "60%", }}>
                  <ItemName>{en_header}</ItemName>
                </View>
                {/* {videosSlider.length > 0 && <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("VideosUri", { videosSlider })
                  }
                  activeOpacity={0.9} style={{ width: "30%", backgroundColor: "white", elevation: 3, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontWeight: "bold" }}>Watch vedios</Text>
                </TouchableOpacity>
                } */}
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
          <TouchableOpacity
            onPress={() => { dispatch(_getNewsComment(currentUser, _id, navigation, filterdBy)) }}
          >
            <Text style={{ color: 'white', fontSize: 20, }}>{comments_count} Comments</Text>
          </TouchableOpacity>
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
