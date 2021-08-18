import React, { useEffect, useState } from 'react';

import { Text, ScrollView, Dimensions, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import { MainSheet } from '../../../components/MainSheet';

import ReservationModal from '../../../components/reservationModal'

import { Colors } from '../../../constants/Colors';

import { _getHexColor, } from "../../../store/action/action"

import { _makeItemReservation } from "../../../store/action/shopAction"

import { useDispatch, useSelector } from 'react-redux';

// import {
//   Backgroundimage,
//   ColorContianer,
//   DescriptionArea,
//   ItemName,
//   QuantityArea,
//   ReserveNowArea,
//   ShopDetailsContainer,
//   SizeArea,
//   TreatmentArea,
// } from './ShopDetailsStyled';

// TODO: Remove the views and handle the component from the styled
export const ShopSendReview = ({ route, navigation }: any) => {
  const [coverImage, setcoverImage] = useState()

  const [selectedClr, setCelectedClr] = useState('')

  const [confirmModal, setConfirmModal] = useState(false)

  const [quantity, setQuantity] = useState(0)

  const routes = route.params

  // const { en_name, icon, en_desc, size, price, height, width, likes, stock_count, _id } = routes;

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const dispatch = useDispatch()


  useEffect(() => {
   
  }, [])

  return (
    <>
      <Text>sssss</Text>

    </>
  )
}
