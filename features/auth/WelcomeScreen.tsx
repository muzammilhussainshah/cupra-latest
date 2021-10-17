import React, { useEffect, useState, } from 'react';
import { AsyncStorage } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Button, ButtonsContainer, ButtonText } from '../../components/Button';
import { height } from '../../constants/Layout';
import { _signIn, _directLogin } from '../../store/action/authAction';
import { useDispatch } from 'react-redux';
import { SpashScreen } from '../../components/SplashScreen';
import {
  BackGroundContinerImage,
  WelcomeTitle,
  ButtonsRow,
  GradientBanckground,
  Row,
  Hairline,
  Label,
  SocialMedia,
} from './styled';
import { Text } from 'react-native-animatable';
// TODO:Refactor the GradientBanckground to make reusable component that take
// a different height and width
export const WelcomeScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    getDataAsync();
  }, []);

  const getDataAsync = async () => {
    const getEmail = await AsyncStorage.getItem('userEmail');
    const getSocialtype = await AsyncStorage.getItem('socialType');
    const getsocialId = await AsyncStorage.getItem('socialId');
    const password = await AsyncStorage.getItem('password');


    if (getEmail && getEmail !== 'null') {

      dispatch(_signIn({ emailOrPhone: getEmail, password: password }, navigation, setUser));

      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [{ name: 'drawerStack' }],
      //   }),
      // );
      // setUser(true);
    }
    else if (getSocialtype && getSocialtype == 'Facebook') {
      console.log('FacebookFacebookFacebook')
      dispatch(_directLogin({ Id: getsocialId, type: 'FACEBOOK' }, navigation, setUser));
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [{ name: 'drawerStack' }],
      //   }),
      // );
      // setUser(true);
    }
    else if (getSocialtype && getSocialtype == 'Google') {
      dispatch(_directLogin({ Id: getsocialId, type: 'GOOGLE' }, navigation, setUser));

      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [{ name: 'drawerStack' }],
      //   }),
      // );
      // setUser(true);
    }


    else {
      console.log('elseelseelse')
      
      setUser(false);
    }
  };

  return (
    user === false ? (
      <BackGroundContinerImage
        resizeMode={FastImage.resizeMode.cover}
        source={require('../../assets/backgroundImage.png')}>
        <GradientBanckground
          radius={(height * 3) / 4}
          center={[0, 0]}
          colors={['rgba(251,147,21,0.6)', 'rgba(0,0,0,0.8)']}>
          <WelcomeTitle>Welcome</WelcomeTitle>
          <ButtonsRow>
            <ButtonsContainer
              style={{
                borderWidth: 1,
                padding: 5,
                borderColor: '#ffffff',
                borderRadius: 25,
              }}
              containerWidth={140}>
              <Button
                backgroundColor={'transparent'}
                onPress={() => {
                  navigation.navigate('login');
                }}>
                <ButtonText>Log in</ButtonText>
              </Button>
            </ButtonsContainer>
            <ButtonsContainer
              style={{
                borderWidth: 1,
                padding: 5,
                borderColor: '#ffffff',
                borderRadius: 25,
              }}
              containerWidth={140}>
              <Button
                backgroundColor={'transparent'}
                onPress={() => {
                  navigation.navigate('signup');
                }}>
                <ButtonText>Sign Up</ButtonText>
              </Button>
            </ButtonsContainer>
          </ButtonsRow>
          {/* <Row>
            <Hairline />
            <Label>Or Signup Using</Label>
            <Hairline />
          </Row>
          <SocialMedia /> */}
        </GradientBanckground>
      </BackGroundContinerImage>
    ) :
      <SpashScreen /> 
  );
};
