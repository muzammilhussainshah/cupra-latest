import React, { useEffect } from 'react';

import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FastImage from 'react-native-fast-image';

// @ts-ignore

import RadialGradient from 'react-native-radial-gradient';

import styled from 'styled-components/native';


import { Colors } from '../../constants/Colors';

import { height, width } from '../../constants/Layout';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { useDispatch, useSelector } from 'react-redux';

import { _googleAuth, _facebookAuth } from '../../store/action/authAction';

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
  padding-bottom: 20px;
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
  overflow: hidden;
`;
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
export const SocialMedia = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '193382017598-jplb65g6tc6ov2hkag80nnd59c87sa0h.apps.googleusercontent.com',
    });
  }, [])

  const isLoader = useSelector(({ reducer }) => reducer.isLoader);
  const isError = useSelector(({ reducer }) => reducer.isError);
  const navigation = useNavigation();
  return (
    <>
      < Row >

        {isLoader ?
          <ActivityIndicator
            style={{}}
            size="small" color={'#ffffff'}
          /> :
          <>
            <TouchableOpacity
              onPress={() => dispatch(_facebookAuth(navigation))}
              activeOpacity={0.8}>
              <Facebook
                resizeMode={FastImage.resizeMode.contain}
                source={require('../../assets/facebook.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
              onPress={() => dispatch(_googleAuth(navigation))}
              activeOpacity={0.8}>
              <Google
                resizeMode={FastImage.resizeMode.contain}
                source={require('../../assets/gmail.png')}
              />
            </TouchableOpacity>
          </>
        }
      </Row >
      {isError !== "" &&
        <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{isError}
        </Text>}
    </>
  )
};
