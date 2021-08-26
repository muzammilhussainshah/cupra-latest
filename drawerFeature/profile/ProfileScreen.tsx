import React, { useEffect, useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import styled from 'styled-components/native';
import { ImageBackground, TouchableOpacity } from "react-native"
// import {
//   BackGroundContinerImage,
//   WelcomeTitle,
//   ButtonsRow,
//   GradientBanckground,
//   Row,
//   Hairline,
//   Label,
//   SocialMedia,
// } from './styled';
import { Text, View } from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../constants/Colors';
import { Header } from '../../components/Header';
import { height } from '../../constants/Layout';
const SteeringIcon = styled(FastImage)`
  height: 30px;
  width: 30px;
  margin: 5px;
`;
// TODO:Refactor the GradientBanckground to make reusable component that take
// a different height and width
export const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, paddingTop: 24 }}>
      <View style={{ height: '50%', borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: Colors.black, width: '100%' }}>
        <FastImage source={require('../../assets/profileBg.png')}
          resizeMode='cover'
          style={{ height: '100%', width: '100%' }}
        />
      </View>
      {/*Absolute for background Images */}
      <View style={{ height: "100%", marginTop: 24, justifyContent: "flex-end", position: "absolute", width: "100%" }}>
        <View style={{ height: "70%", }}>
          <FastImage source={require('../../assets/white.png')}
            resizeMode='cover'
            style={{ height: '100%', width: '100%' }}
          />
        </View>
      </View>
      {/*Absolute for Work */}
      <View style={{ height: "100%", marginTop: 24, zIndex: 3, position: "absolute", width: "100%" }}>
        <View style={{ height: "10%", alignItems: "center", flexDirection: "row" }}>
          <SteeringIcon
            resizeMode={FastImage.resizeMode.contain}
            source={require('../../assets/images/steering.png')}
          />
          <Text style={{ fontSize: 16, color: Colors.white, marginLeft: 10 }}>My Profile</Text>
        </View>
        <View style={{ height: "40%", flexDirection: "row", paddingHorizontal: 5, alignItems: 'flex-end', justifyContent: "flex-end" }}>

          <FastImage source={require('../../assets/users/border.png')}
            resizeMode='contain'
            style={{ height: '45%', width: '45%' }}
          />
          {/* Absolute for image insert inside border */}
          <TouchableOpacity style={{ height: 35, width: 110, justifyContent: "center", alignItems: "center", backgroundColor: Colors.primary, borderRadius: 25 }}>
            <Text style={{ color: Colors.white }}>Edit Profile</Text>
          </TouchableOpacity>

        </View>
        <View style={{ height: "50%" }}>
          <View style={{ flex: 1.3, justifyContent: "center", alignItems: "center", }}>
            <Text style={{ fontSize: 16 }}>Muhammad Ayyad</Text>
          </View>
          <View style={{ flex: 3, justifyContent: "center", alignItems: "center", }}>
            <View style={{ height: "80%", width: "80%",flexDirection:"row", elevation: 5, backgroundColor: Colors.white, borderRadius: 10, padding: 10 }}>
              <View style={{ width: "49.5%",height:"100%" }}></View>
              <View style={{ width: "1%", height: "80%",backgroundColor:"black" }}></View>
              <View style={{ width: "49.5%",height:"100%" }}></View>
            </View>
          </View>
          <View style={{ flex: 5.7, backgroundColor: "pink" }}></View>
        </View>
      </View>
    </View>
  )
};
