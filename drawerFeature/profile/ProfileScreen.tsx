import React, { useEffect, useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import styled from 'styled-components/native';
import { ImageBackground } from "react-native"
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
        {/* <FastImage source={require('../../assets/profileBg.png')}
        resizeMode='cover'
        style={{ height: '100%', width: '100%' }}
      /> */}
      </View>
      {/*Absolute for background Images */}
      <View style={{ height: "100%", marginTop: 24, justifyContent: "flex-end", position: "absolute", width: "100%" }}>
        <View style={{ height: "70%", }}></View>
      </View>
      {/*Absolute for Work */}
      <View style={{ height: "100%", marginTop: 24, zIndex: 3, position: "absolute", width: "100%" }}>
        <View style={{ height: "10%", alignItems: "center", flexDirection: "row", backgroundColor: "pink" }}>
          <SteeringIcon
            resizeMode={FastImage.resizeMode.contain}
            source={require('../../assets/images/steering.png')}
          />
          <Text style={{ fontSize: 16, color: Colors.white, marginLeft: 10 }}>My Profile</Text>
        </View>
        <View style={{ height: "40%",justifyContent:'flex-end',alignItems:"center", backgroundColor: "yellow" }}>
          <FastImage source={require('../../assets/users/border.png')}
            resizeMode='contain'
            style={{ height: '50%', width: '50%' }}
          />


        </View>
        <View style={{ height: "50%", backgroundColor: "green" }}></View>
      </View>
    </View>
  )
};
