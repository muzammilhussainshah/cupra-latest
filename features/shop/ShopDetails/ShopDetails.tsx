import React, { useEffect, useState } from 'react';

import { Text, ScrollView, Dimensions, FlatList, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';

import FastImage from 'react-native-fast-image';

import ReviewComponent from "../../../components/ReviewComponent";

import { MainSheet } from '../../../components/MainSheet';

import FullImage from '../../../components/fullImage';

// import getReview from '../../../store/action/shopAction'

import styled from 'styled-components/native';

import ReservationModal from '../../../components/reservationModal'

import { Colors } from '../../../constants/Colors';

import { SliderBox } from "react-native-image-slider-box";

import { _getHexColor, } from "../../../store/action/action"

import { _makeItemReservation } from "../../../store/action/shopAction"

import { useDispatch, useSelector } from 'react-redux';

import { likeDislike, _getItemDetails, getReview } from '../../../store/action/shopAction';
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
const SteeringImage: any = styled(FastImage)`
  width: 15px;
  height: 15px;
  margin-right:10px
  `;
// background:"red";

// TODO: Remove the views and handle the component from the styled
export const ShopDetails = ({ route, navigation }: any) => {
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

  const shopItemDetails = useSelector((state: any) => state.reducer.shopItemDetails)

  const item = routes;

  const { en_name, icon, rating, en_desc, fromYear, toYear, size, price, en_treatment, colors, images, height, width, stock_count, _id, likedByMe, } = shopItemDetails;

  console.log(routes, 'isLoaderisLoaderisLoader')

  const [totalLikes, settotalLikes] = useState(item.likes);

  const [sendLike, setsendLike] = useState(likedByMe);

  const [reviewScreen, setreviewScreen] = useState(false)

  const dispatch = useDispatch()

  const manageQuantity = (integers: string) => {
    if (integers == "-") {
      if (quantity >= 1) {
        setQuantity(quantity - 1)
      }
    }
    if (integers == "+") {
      if (quantity >= 0 && quantity < stock_count) {
        setQuantity(quantity + 1)
      } else if (quantity == 0) {
        setConfirmModal(true)
        setTitle("Sorry, This item is not available now!")
      }
    }
  }

  useEffect(() => {

    dispatch(_getItemDetails(currentUser, item._id, navigation,))

    // setCelectedClr(routes.colors[0])
    // let firstClr = routes.colors[0]
    // setcoverImage(icon)
  }, [])

  useEffect(() => {
    if (shopItemDetails && shopItemDetails.colors) {
      setCelectedClr(shopItemDetails.colors[0])
      let firstClr = shopItemDetails.colors[0]
      setcoverImage(icon)
      // console.log(shopItemDetails,"shopItemDetailsshopItemDetailsshopItemDetails")
    }
  }, [shopItemDetails])



  const numberOfLikes = () => {
    dispatch(likeDislike(_id, currentUser, likedByMe, navigation))
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
      {reviewScreen && <ReviewComponent itemName={en_name} item={shopItemDetails} _id={_id} _func2={() => setreviewScreen(false)} navigation={navigation} />}

      {fullImageScreen &&
        <View style={{ height: "100%", width: "100%" }}>
          <FullImage selectedImageIndex={selectedImageIndex} coverImage={coverImage} _func={() => setFullImageScreen(false)} />
        </View>
      }
      {confirmModal &&
        < ReservationModal
          Title={title}
          _func={() => setConfirmModal(false)}
          _func2={() => {
            dispatch(_makeItemReservation(_id, quantity, selectedClr, currentUser, setConfirmModal, navigation))
            // setConfirmModal(false)
          }
          }
        />
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
                <ItemName>{en_name}</ItemName>
              </View>
              <View style={{ flexDirection: "row", marginVertical: 5 }}>
                <TouchableOpacity
                  onPress={() => dispatch(getReview(_id, currentUser, navigation))}
                  style={{}}>
                  <FlatList
                    contentContainerStyle={{ alignItems: "center", }}
                    horizontal={true}
                    data={[1, 2, 3, 4, 5]}
                    renderItem={({ item }) => (
                      <SteeringImage
                        tintColor={item > rating && "#ffffff"}
                        resizeMode={FastImage.resizeMode.contain}
                        source={require('../../../assets/images/RealStar.png')}
                      />
                    )}
                  />
                </TouchableOpacity>
                <TouchableOpacity><Text
                  style={{ fontFamily: "SourceSansPro-Regular", fontSize: 15 }}
                >({Math.floor(rating * 10) / 10})</Text></TouchableOpacity>
              </View>
              <DescriptionArea description={en_desc} navigation={navigation}
                _func2={() => setreviewScreen(true)}
                _func={() => setreviewScreen(true)} />
              <View style={{ flexDirection: "row", }}>
                <View style={{ width: "50%", }}>
                  <Text style={{ marginTop: 10, fontSize: 16, fontFamily: 'SourceSansPro-SemiBold', marginBottom: 5 }}>From Year</Text>
                  <Text style={{ fontFamily: 'SourceSansPro-Regular', marginBottom: 5 }}>{fromYear && fromYear}</Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={{ marginTop: 10, fontSize: 16, fontFamily: 'SourceSansPro-SemiBold', marginBottom: 5 }}>To Year</Text>
                  <Text style={{ fontFamily: 'SourceSansPro-Regular', marginBottom: 5 }}>{toYear && toYear}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ width: "50%" }}
                >
                  <SizeArea size={{ height, width, diameter: size }} />
                </View>
                <View style={{ width: "50%" }}>
                  <TreatmentArea treatment={en_treatment} />
                </View>
              </View>
              <View style={{ flexDirection: "row", }}>
                <View style={{ width: "50%", }}>
                  <Text style={{ marginTop: 10, fontSize: 16, fontFamily: 'SourceSansPro-SemiBold', marginBottom: 5 }}>Colors</Text>
                  <View style={{ flexDirection: 'row' }}>
                    {colors && colors.map((v: string, i: number) => {
                      let colorHex = dispatch(_getHexColor(v))
                      return (
                        <View style={{ flexDirection: 'row', margin: 2, }}>
                          <ColorContianer color={colorHex} _func={() => {
                            setCelectedClr(v)
                            if (images && !(Object.keys(images).length === 0 && images.constructor === Object)) {
                              setcoverImage(images[v])
                              setimageSlider(true)
                              console.log(images[v], 'routes.images[v][0]routes.images[v][0]routes.images[v][0]routes.images[v][0]')
                            }
                          }} />
                        </View>
                      )
                    })
                    }
                  </View>
                </View>
                <View style={{ width: "50%" }}>
                  <QuantityArea quantity={quantity}
                    _func={() => { manageQuantity('-') }}
                    _func2={() => { manageQuantity('+') }}
                  />
                </View>
              </View>
            </ScrollView>
          }
        </MainSheet>
        <ReserveNowArea>
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
        </ReserveNowArea>
      </ShopDetailsContainer>

      {/* </View>
      </ScrollView> */}

    </>
  )
}
