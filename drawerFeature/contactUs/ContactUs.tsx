import React, { useEffect, useState } from 'react';
import { useNavigation, DrawerActions, } from '@react-navigation/native';
import styled from 'styled-components/native';
import { _getcomponyInfo } from '../../store/action/contactUsAction';
import { TouchableOpacity, ScrollView, TextInput, ActivityIndicator, ImageBackground } from "react-native"
import { Text, View } from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../constants/Colors';
import { Header } from '../../components/Header';
import { _claim } from "../../store/action/claimsAction"
import { useDispatch, useSelector } from 'react-redux';
import { height, width } from '../../constants/Layout';
export const ContactUs: React.FC = () => {
  const [getcontactUsInfo, setgetcontactUsInfo] = useState('')
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector(({ reducer }: any) => reducer.currentUser);
  const contactUsInfo = useSelector(({ reducer }: any) => reducer.contactUsInfo);
  const isError = useSelector((state: any) => state.reducer.isError);
  const isLoader = useSelector((state: any) => state.reducer.isLoader);
  useEffect(() => {
    dispatch(_getcomponyInfo(currentUser, navigation))
  }, [])

  useEffect(() => {
    setgetcontactUsInfo(contactUsInfo)
    console.log(contactUsInfo, 'contactUsInfocontactUsInfo')
  }, [contactUsInfo])
  return (
    <View style={{ flex: 1, marginTop: 24 }}>
      <View style={{ flex: 1.5, backgroundColor: Colors.black, justifyContent: "center" }}>
        <Header RatingScreen={true} onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />
      </View>
      <View style={{ flex: 8.5, backgroundColor: Colors.titleGray, justifyContent: "center", alignItems: "center" }}>
        <View style={{ height: "75%", width: "75%" }}>
          <ImageBackground source={require('../../assets/ContactUs/card.png')} resizeMode="cover" style={{ height: "100%", width: "100%" }}>
            <View style={{ flex: 2 }}>
              <FastImage style={{ width: '100%', height: "100%" }} source={require('../../assets/images/RealCupraLogo.png')} resizeMode={FastImage.resizeMode.contain} />
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
              <Text style={{ fontSize: 16 }}>{getcontactUsInfo && getcontactUsInfo.en_name}</Text>
            </View>
            <View style={{ flex: 3.5, alignItems: "center", justifyContent: "space-around" }}>
              <Text>@infocupra.com</Text>
              <View>
                <Text style={{ color: Colors.darkGray }}>+ {getcontactUsInfo && getcontactUsInfo.mobile1}</Text>
                <Text style={{ color: Colors.darkGray }}>+ {getcontactUsInfo && getcontactUsInfo.mobile2}</Text>
                <Text style={{ color: Colors.darkGray }}>+ {getcontactUsInfo && getcontactUsInfo.tel}</Text>
              </View>
              <Text>{getcontactUsInfo && getcontactUsInfo.address}</Text>
            </View>
            <View style={{ flex: 1.3, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity activeOpacity={0.7}>
                <FastImage style={{ width: 40, height: "60%" }} source={require('../../assets/ContactUs/Facebook.png')} resizeMode={FastImage.resizeMode.contain} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <FastImage style={{ width: 40, height: "60%" }} source={require('../../assets/ContactUs/insta.png')} resizeMode={FastImage.resizeMode.contain} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <FastImage style={{ width: 40, height: "60%" }} source={require('../../assets/ContactUs/youtube.png')} resizeMode={FastImage.resizeMode.contain} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <FastImage style={{ width: 40, height: "60%" }} source={require('../../assets/ContactUs/print.png')} resizeMode={FastImage.resizeMode.contain} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <FastImage style={{ width: 40, height: "60%" }} source={require('../../assets/ContactUs/tiktok.png')} resizeMode={FastImage.resizeMode.contain} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ flex: 2.2, alignItems: "center" }}>
              <View style={{ height: "40%", width: 170, justifyContent: "center", alignItems: "center", borderRadius: 5, backgroundColor: Colors.primary }}>
                <Text style={{ color: Colors.white }}>DIRECTION</Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    </View>
  )
};
