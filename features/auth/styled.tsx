import React, { useEffect } from 'react';

import { TouchableOpacity, Text, ActivityIndicator, Alert, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FastImage from 'react-native-fast-image';

// @ts-ignore

import RadialGradient from 'react-native-radial-gradient';

import styled from 'styled-components/native';

import { Colors } from '../../constants/Colors';

import { height, width } from '../../constants/Layout';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { useDispatch, useSelector } from 'react-redux';

import { _googleAuthSignIn, _facebookAuthSignIn, _facebookAuthSignUp, _googleAuthSignup,_appleAuthSignIn,_appleAuthSignup } from '../../store/action/authAction';
import { SignInWithAppleButton } from 'react-native-apple-authentication'
export const BackGroundContinerImage = styled(FastImage)`
  flex: 1;
  width: null;
  height: null;
  justify-content: flex-end;
  align-items: center;
`;
export const GradientBanckground = styled(RadialGradient)`
  width: ${width * 1.6}px;
  height: ${height - 250}px;
  border-top-left-radius: 300px;
  border-top-right-radius: 300px;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  padding-bottom: 40px;
`;
export const WelcomeTitle = styled.Text`
  font-size: 24px;
  line-height: 28px;
  color: ${Colors.white};
  /* font-weight: bold; */
  align-self: center;
  font-family: 'SourceSansPro-Regular';
`;
export const ButtonsRow = styled.View`
  align-items: center;
  flex-direction: row;
  overflow: hidden;
  justify-content: center;
  margin: 50px;
`;
export const Row = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-top:20px;
  padding-left: 25px;
  padding-right: 25px;
  overflow: hidden;
  `;
// padding-bottom: 20px;
export const Hairline = styled.View`
  background-color: ${Colors.white};
  height: 1px;
  width: 100px;
`;
export const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  padding-left: 20px;
  padding-right: 20px;
  align-self: center;
  margin-bottom: 5px;
  color: ${Colors.white};
  font-family: 'SourceSansPro-Regular';
`;
const Google = styled(FastImage)`
  width: 36px;
  height: 36px;
  margin-left: 5px;
  margin-right: 5px;
`;
const Facebook = styled(FastImage)`
  width: 36px;
  height: 36px;
  margin-left: 5px;
  margin-right: 5px;
`;
const Apple = styled(FastImage)`
  width: 36px;
  height: 36px;
  margin-left: 5px;
  margin-right: 5px;
`;
export const SocialMedia = ({ routeName }: any) => {
  console.log(routeName, 'RouteName')
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '901870504657-s6vn80fp3jje5jal1cdthv49rp7kq46u.apps.googleusercontent.com',
    });
  }, []);

  const isLoader = useSelector(({ reducer }:any) => reducer.isLoader);
  const isError = useSelector(({ reducer }:any) => reducer.isError);
  const navigation = useNavigation();

  const appleSignIn = (result: any) => {
    if (routeName == "SignIn") {
      dispatch(_appleAuthSignIn(navigation,result.user,'APPLE'))
    } else {
      dispatch(_appleAuthSignup(navigation,result.user,'APPLE'))
    }
  }
  return (
    <>
      <Row>
        {/* {isLoader ? (
          <ActivityIndicator style={{}} size="small" color={'#ffffff'} />
        ) : ( */}
        <>
          <TouchableOpacity
            // style={{marginTop:20}}
            onPress={() => {
              if (routeName == "SignIn") {
                dispatch(_facebookAuthSignIn(navigation))
              } else {
                dispatch(_facebookAuthSignUp(navigation))
              }
            }}
            activeOpacity={0.8}>
            <Facebook
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/facebook.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
            // style={{marginTop:20}}
            onPress={() => {
              if (routeName == "SignIn") {
                dispatch(_googleAuthSignIn(navigation))
              } else {
                dispatch(_googleAuthSignup(navigation))
              }
            }}
            activeOpacity={0.8}>
            <Google
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/gmail.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Apple
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/apple.png')}
              style={{ position: "absolute", zIndex: 0, width: 38, height: 38 }}
            />
            {SignInWithAppleButton({
              buttonStyle: { height: 40, width: 40, },
              callBack: appleSignIn,
              buttonText: " ",
            })}
          </TouchableOpacity>
        </>
        {/* )} */}
      </Row>
      {/* {isError !== '' && (
        <Text style={{color: 'red', fontSize: 12, alignSelf: 'center'}}>
          {isError}
        </Text>
      )} */}
    </>
  );
};
