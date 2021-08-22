import React, { useEffect, useState } from 'react';

import { Text, ScrollView, Dimensions, FlatList, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';

import FastImage from 'react-native-fast-image';

import moment from 'moment';

import ReviewComponent from "../../../components/ReviewComponent";

import { MainSheet } from '../../../components/MainSheet';

import FullImage from '../../../components/fullImage';

// import getReview from '../../../store/action/shopAction'

import styled from 'styled-components/native';

import ReservationModal from '../../../components/reservationModal'

import { Colors } from '../../../constants/Colors';

import { SliderBox } from "react-native-image-slider-box";

import { _getHexColor, } from "../../../store/action/action"

import { _getNewsItemDetails, _likeDisLike } from "../../../store/action/newsAction"

import { useDispatch, useSelector } from 'react-redux';

import { _getItemDetails, getReview } from '../../../store/action/shopAction';
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
} from './HomeDetailStyled';
const SteeringImage: any = styled(FastImage)`
  width: 15px;
  height: 15px;
  margin-right:10px
  `;
// background:"red";

// TODO: Remove the views and handle the component from the styled
export const HomeDetail = ({ route, navigation }: any) => {
  const Wwidth = Dimensions.get('window').width;

  const Wheight = Dimensions.get('window').height;

  const [coverImage, setcoverImage] = useState()

  const [title, setTitle] = useState("")

  const [imageSlider, setimageSlider] = useState(false)

  const [selectedImageIndex, setSelectedImageIndex] = useState()

  const [fullImageScreen, setFullImageScreen] = useState(false)

  const [selectedClr, setCelectedClr] = useState('')

  const [confirmModal, setConfirmModal] = useState(false)

  const [quantity, setQuantity] = useState(0)

  const routes = route.params

  const isLoader = useSelector((state: any) => state.reducer.isLoader)

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const newsItemDetails = useSelector((state: any) => state.reducer.newsItemDetails)

  const item = routes;

  const { en_name, icon, rating, en_desc, en_client_name, likes_count, fromYear, en_header, year, date, toYear, size, price, en_treatment, colors, images, height, width, stock_count, _id, likedByMe, } = newsItemDetails;

  console.log(likes_count, 'isLoaderisLoaderisLoader')

  const [totalLikes, settotalLikes] = useState(likes_count);

  const [sendLike, setsendLike] = useState(likedByMe);

  const [reviewScreen, setreviewScreen] = useState(false)

  const dispatch = useDispatch()

  const manageQuantity = (integers: string) => {
    if (integers == "-") {
      if (quantity >= 1) {
        setQuantity(quantity - 1)
      }
    }
    // if (integers == "+") {
    //   if (quantity >= 0 && quantity < stock_count) {
    //     setQuantity(quantity + 1)
    //   } else if (quantity == 0) {
    //     setConfirmModal(true)
    //     setTitle("Sorry, This item is not available now!")
    //   }
    // }
  }

  useEffect(() => {

    dispatch(_getNewsItemDetails(currentUser, item.newsId, navigation,))

    // setCelectedClr(routes.colors[0])
    // let firstClr = routes.colors[0]
    // setcoverImage(icon)
  }, [])

  useEffect(() => {
    // if (newsItemDetails && newsItemDetails.colors) {
    //   setCelectedClr(newsItemDetails.colors[0])
    //   let firstClr = newsItemDetails.colors[0]
    // }
    setcoverImage(icon)
    settotalLikes(likes_count)
    // console.log(newsItemDetails, "newsItemDetailsnewsItemDetailsnewsItemDetailsnewsItemDetailsnewsItemDetailsnewsItemDetailsnewsItemDetailsnewsItemDetails")
  }, [newsItemDetails])


  console.log(sendLike, '')
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
      {/* {reviewScreen && <ReviewComponent itemName={en_name} item={shopItemDetails} _id={_id} _func2={() => setreviewScreen(false)} navigation={navigation} />} */}

      {fullImageScreen &&
        <View style={{ height: "100%", width: "100%" }}>
          <FullImage
            //  selectedImageIndex={selectedImageIndex} 
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

                <TouchableOpacity>
                  {/* <Text
                  style={{ fontFamily: "SourceSansPro-Regular", fontSize: 15 }}
                >({Math.floor(rating * 10) / 10})</Text> */}
                </TouchableOpacity>
              </View>
              <DescriptionArea
                description={en_desc}
                navigation={navigation}
                _func2={() => setreviewScreen(true)}
                _func={() => setreviewScreen(true)} />

              <Text style={{ marginLeft: "30%", marginTop: "20%", color: 'red' }}>Under Developement</Text>
            </ScrollView>
          }
        </MainSheet>
        {/* <ReserveNowArea>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>JD {quantity < 1 ? price : price * quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              if (quantity == 0) {
                setConfirmModal(true)
                setTitle("Please enter the quantity you want to reserve!")
              } else {
                setConfirmModal(true)
                setTitle("Are you sure you want to make this reservation?")
              }
            }
            }
            style={{ borderRadius: 10, backgroundColor: Colors.primary, width: 150, height: 55, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 15 }}>Reserve Now</Text>
          </TouchableOpacity>
        </ReserveNowArea> */}
      </ShopDetailsContainer>

      {/* </View>
      </ScrollView> */}

    </>
  )
}
