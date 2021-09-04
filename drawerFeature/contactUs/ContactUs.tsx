import React, { useEffect, useState } from 'react';

import { useNavigation, DrawerActions, } from '@react-navigation/native';

import { _getcomponyInfo } from '../../store/action/companyAction';

import { Dimensions, ImageBackground, TouchableOpacity, Linking, Platform } from "react-native"

import { Text, View } from 'react-native-animatable';

import FastImage from 'react-native-fast-image';

import { Colors } from '../../constants/Colors';

import { Header } from '../../components/Header';

import { _claim } from "../../store/action/claimsAction"

import { useDispatch, useSelector } from 'react-redux';

import GoogleStaticMap from 'react-native-google-static-map';

import GoogleMapKey from '../../constants/GoogleApiKey';

export const ContactUs: React.FC = () => {

  const screenHeight = Dimensions.get('window').height;

  const screenwidth = Dimensions.get('window').width;

  const [getcontactUsInfo, setgetcontactUsInfo]: any = useState('')

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const currentUser = useSelector(({ reducer }: any) => reducer.currentUser);

  const contactUsInfo = useSelector(({ reducer }: any) => reducer.contactUsInfo);

  useEffect(() => {
    dispatch(_getcomponyInfo(currentUser, navigation))



  }, [])

  useEffect(() => {
    setgetcontactUsInfo(contactUsInfo)
    console.log(contactUsInfo, 'contactUsInfocontactUsInfo')
  }, [contactUsInfo])

  const openGoogleMapDirection = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${getcontactUsInfo.lat},${getcontactUsInfo.lng}`;
    const label = 'Custom Label';
    const url: any = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  }


  const dialCall = (tel: any) => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${tel}`;
    }
    else {
      phoneNumber = `telprompt:${tel}`;
    }

    Linking.openURL(phoneNumber);
  };


  return (
    <View style={{ flex: 1, marginTop: 24 }}>
      <View style={{ flex: 1.5, backgroundColor: Colors.black, justifyContent: "center" }}>
        <Header RatingScreen={true} onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />
      </View>
      <View style={{ flex: 8.5, overflow: "hidden", backgroundColor: Colors.titleGray, justifyContent: "center", alignItems: "center" }}>
        {getcontactUsInfo?.lat &&
          <GoogleStaticMap
            latitude={getcontactUsInfo.lat}
            longitude={getcontactUsInfo.lng}
            zoom={8}
            size={{ width: 450, height: 700 }}
            apiKey={GoogleMapKey}
          />
        }
        <View style={{ height: "75%", width: "90%", position: "absolute" }}>
          <ImageBackground source={require('../../assets/ContactUs/card.png')} resizeMode="stretch" style={{ height: "100%", width: "100%" }}>
            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
              <FastImage style={{ width: '100%', height: "100%" }} source={require('../../assets/images/RealCupraLogo.png')} resizeMode={FastImage.resizeMode.contain} />
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
              <Text style={{ fontSize: 16 }}>{getcontactUsInfo && getcontactUsInfo.en_name}</Text>
            </View>
            <View style={{ flex: 3.5, alignItems: "center", justifyContent: "space-around" }}>
              <Text>{getcontactUsInfo && getcontactUsInfo.email}</Text>
              <View>
                <TouchableOpacity onPress={() => { dialCall(getcontactUsInfo.tel) }}>
                  <Text style={{ color: Colors.darkGray }}>{getcontactUsInfo && "+ " + getcontactUsInfo.tel}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { dialCall(getcontactUsInfo.mobile1) }}>
                  <Text style={{ color: Colors.darkGray }}>{getcontactUsInfo && "+ " + getcontactUsInfo.mobile1}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { dialCall(getcontactUsInfo.mobile2) }}>
                  <Text style={{ color: Colors.darkGray }}>{getcontactUsInfo && "+ " + getcontactUsInfo.mobile2}</Text>
                </TouchableOpacity>
              </View>
              <Text>{getcontactUsInfo && getcontactUsInfo.address}</Text>
            </View>
            <View style={{ flex: 1.3, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={{ height: '45%',marginHorizontal:2, width: 30 }}

                onPress={() => {
                  navigation.navigate("webView", { link: getcontactUsInfo && getcontactUsInfo.facebook })
                }}
                activeOpacity={0.7}>
                <FastImage style={{ width: "100%", height: "100%" }} source={require('../../assets/ContactUs/Facebook.png')} resizeMode={FastImage.resizeMode.contain} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: '60%',marginHorizontal:2, width: 35 }}

                onPress={() => {
                  navigation.navigate("webView", { link: getcontactUsInfo && getcontactUsInfo.instagram })
                }}
                activeOpacity={0.7}>
                <FastImage style={{ width: "100%", height: "100%" }} source={require('../../assets/ContactUs/insta.png')} resizeMode={FastImage.resizeMode.contain} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: '70%',marginHorizontal:2, width: 37 }}

                onPress={() => {
                  navigation.navigate("webView", { link: getcontactUsInfo && getcontactUsInfo.youtube })
                }}
                activeOpacity={0.7}>
                <FastImage style={{ width: "100%", height: "100%" }} source={require('../../assets/ContactUs/youtube.png')} resizeMode={FastImage.resizeMode.contain} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: '55%',marginHorizontal:2, width: 35 }}

                onPress={() => {
                  navigation.navigate("webView", { link: getcontactUsInfo && getcontactUsInfo.pinterest })
                }}
                activeOpacity={0.7}>
                <FastImage style={{ width: "100%", height: "100%" }} source={require('../../assets/ContactUs/print.png')} resizeMode={FastImage.resizeMode.contain} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: '55%',marginHorizontal:2, width: 35 }}

                onPress={() => {
                  navigation.navigate("webView", { link: getcontactUsInfo && getcontactUsInfo.tiktok })
                }} activeOpacity={0.7}>
                <FastImage style={{ width: "100%", height: "100%" }} source={require('../../assets/ContactUs/tiktok.png')} resizeMode={FastImage.resizeMode.contain} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => { openGoogleMapDirection() }}
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
