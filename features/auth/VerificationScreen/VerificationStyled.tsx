import React from 'react';

import FastImage from 'react-native-fast-image';

import {SafeAreaView} from 'react-native-safe-area-context';

import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';

import {Platform,Text,TouchableOpacity,View} from 'react-native'

import {Colors} from '../../../constants/Colors';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.black};
  align-items: center;
`;

const VerificationTitle = styled.Text`
  font-size: 25px;
  color: ${Colors.white};
  font-family: 'SourceSansPro-Regular';
`;
const VerificationDescription = styled.Text`
  font-size: 20px;
  color: ${Colors.primary};
  font-family: 'SourceSansPro-Regular';
`;
const HeaderTitleContainer = styled.View`
  padding: 22px;
`;

const IconPlaceholder = styled(TouchableOpacity)`
background-color: transparent;
border-width: 1px;
border-radius: 20px;
`;
const navigation = useNavigation();
export const VerificationHeaderTitle = () => (
    <View style={{ flexDirection: Platform.OS === "ios" ? "row" : "column", paddingHorizontal: Platform.OS ==="ios"? "5%" : "0%" }}>
{Platform.OS === "ios" &&
  <IconPlaceholder style={{ marginTop: "10%", backgroundColor: Colors.primary, justifyContent: "center", height: 50, width: '13%', alignItems: "center", borderRadius: 10 }} onPress={() => navigation.goBack()} activeOpacity={0.6}>
    <Text style={{ color: Colors.white, fontSize: 20 }}>{"<"}</Text>
  </IconPlaceholder>
} 
  <HeaderTitleContainer>

    <VerificationTitle>Verification</VerificationTitle>
    <VerificationDescription>
      Please enter your verification code, we have sent to your registered
      phone.
    </VerificationDescription>
  </HeaderTitleContainer>
</View>
);
export const PhoneNumber = styled.Text`
  font-size: 20px;
  color: ${Colors.white};
  font-family: 'SourceSansPro-Regular';
  align-self: center;
`;
export const OtpBackground = styled(FastImage)`
  height: 190px;
  width: 210px;
  align-self: center;
`;
