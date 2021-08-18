import React, { useEffect, useState } from 'react';

import { Text, ScrollView, Dimensions, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import { MainSheet } from '../../../components/MainSheet';

import ReservationModal from '../../../components/reservationModal'

import { Colors } from '../../../constants/Colors';

import { _getHexColor, } from "../../../store/action/action"

import { _makeItemReservation } from "../../../store/action/shopAction"

import { useDispatch, useSelector } from 'react-redux';

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
  const [coverImage, setcoverImage] = useState()

  const [selectedClr, setCelectedClr] = useState('')

  const [confirmModal, setConfirmModal] = useState(false)

  const [quantity, setQuantity] = useState(0)

  const routes = route.params

  const { en_name, icon, en_desc, size, price, height, width, likes, stock_count, _id } = routes;

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

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
      }
    }
  }

  useEffect(() => {
    setCelectedClr(routes.colors[0])
    let firstClr = routes.colors[0]
    if (routes.images && !(Object.keys(routes.images).length === 0 && routes.images.constructor === Object)) {
      setcoverImage(routes.images[firstClr][0])
    }
    else {
      setcoverImage(icon)
    }
  }, [])

  return (
    <>
      {confirmModal &&
        < ReservationModal
          _func={() => setConfirmModal(false)}
          _func2={() => {
            dispatch(_makeItemReservation(_id, quantity, selectedClr, currentUser))
            setConfirmModal(false)
          }
          }
        />
      }
      <View style={{ height: "50%", width: "50%", position: "absolute", zIndex: 1, alignItems: "flex-end", justifyContent: "flex-end", top: -50, left: "40%" }}>
        <View style={{
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
            source={require('../../../assets/images/heart.png')}
            resizeMode="contain"
          />
          <Text style={{}}>{likes}</Text>
        </View>
      </View>

      <ShopDetailsContainer>
        <Backgroundimage source={{ uri: coverImage }} resizeMode={FastImage.resizeMode.cover} />
        <TouchableOpacity style={{ position: 'absolute', top: 50, left: 10, backgroundColor: Colors.primary, height: 50, width: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => { navigation.goBack() }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> {'<'} </Text>
        </TouchableOpacity>
        <MainSheet scroll sheetHeight={0.4}>
          <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
            <ItemName>{en_name}</ItemName>
            <DescriptionArea description={en_desc} navigation={navigation} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View>
                <SizeArea size={{ height, width, diameter: size }} />
              </View>
              <View>
                <TreatmentArea treatment={routes.en_treatment} />
              </View>
            </View>
            <View style={{ flexDirection: "row", }}>
              <View style={{}}>
                <Text style={{ marginTop: 10, marginBottom: 10 }}>
                  Colors
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  {routes.colors && routes.colors.map((v: string, i: number) => {
                    let colorHex = dispatch(_getHexColor(v))
                    return (
                      <View style={{ flexDirection: 'row', margin: 2, }}>
                        <ColorContianer color={colorHex} _func={() => {
                          setCelectedClr(v)
                          if (routes.images && !(Object.keys(routes.images).length === 0 && routes.images.constructor === Object)) {
                            setcoverImage(routes.images[v][0])
                          }
                        }} />
                      </View>
                    )
                  })
                  }
                </View>
              </View>
              <View style={{ paddingLeft: 130 }}>
                <QuantityArea quantity={quantity}
                  _func={() => { manageQuantity('-') }}
                  _func2={() => { manageQuantity('+') }}
                />
              </View>
            </View>
          </ScrollView>
        </MainSheet>
        <ReserveNowArea>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>JD {quantity<1?price:price*quantity}</Text>
          <TouchableOpacity
            onPress={() =>
              setConfirmModal(true)
              // dispatch(_makeItemReservation(_id, quantity, selectedClr))
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
