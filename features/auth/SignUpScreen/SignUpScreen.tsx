import { useNavigation } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { ScrollView, View, Platform, TouchableOpacity, ActivityIndicator, Text } from 'react-native';

import FastImage from 'react-native-fast-image';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import { _signUp } from '../../../store/action/authAction';

import { Button, ButtonsContainer, ButtonText } from '../../../components/Button';

import { _getCountry, } from '../../../store/action/action';

import FormTextField from '../../../components/FormTextField';

import { isEmail, isPhoneNumber } from '../../../constants/Valoidators';

import { useDispatch, useSelector } from 'react-redux';

import DeviceInfo, { getDeviceId } from 'react-native-device-info';

// import LocalizedStrings from 'react-native-localization';

import messaging from '@react-native-firebase/messaging';
import styled from 'styled-components/native';
import { Colors } from '../../../constants/Colors';

import {
  BackGroundContinerImage,
  CheckBox,
  Container,
  Row,
  SignupTitle,
  Title,
} from './SignupStyled';


import { 
  SocialMedia,
  // Row,
  Hairline,
  Label,
} from '../styled';
export interface SignUpProp {
  phone_number: string | number | any;
  password?: string;
  name?: string;
  email?: string;
  confirm_password?: string;
  country_number?: string;
  country_numberId?: string;
}
export interface DeviceTokenProp {
  device_token?: string;
  device_type?: string;
  device_language?: string;
}
const CountryNumber = ['00962', '00972', '0090'];
// const CountryNumber = ['00962', '00972'];
export const SignUpScreen: React.FC = () => {
  const [getcountry, setgetcountry] = useState([])

  const isLoader = useSelector(({ reducer }) => reducer.isLoader);
  const isError = useSelector(({ reducer }) => reducer.isError);
  const country = useSelector(({ reducer }: any) => reducer.country);
  const navigation = useNavigation();
  const signupMethods = useForm<SignUpProp>({
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      password: '',
      confirm_password: '',
      country_number: '00962',
      // country_numberId: '60930f6ecb8d330015688090',
    },
  });
  function onSubmit(model: SignUpProp) {
    console.warn('form submitted', model);
    // navigation.navigate('otp', {
    //   phone_number: model.country_number?.concat(model.phone_number),
    // });
    dispatch(_signUp(model, navigation,country))
    // console.log(model, 'aaa', model.country_number?.concat(model.phone_number));
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(_getCountry(navigation))
  }, [])
  let localCodeArr: any = []
  useEffect(() => {
    // setgetcountry(country)
    console.log(country, 'country')
    country && country.length > 0 && country.map((value: any) => {
      localCodeArr.push( value.country_phone_code.toString())
      // localCodeArr.push('00' + value.country_phone_code.toString())
    })
    setgetcountry(localCodeArr)
    // console.log(localCodeArr, '444444444')
  }, [country])



  const IconPlaceholder = styled(TouchableOpacity)`
  background-color: transparent;
  border-width: 1px;
  border-radius: 20px;
`;


  return (
    <Container
      resizeMode={FastImage.resizeMode.cover}
      source={require('../../../assets/BG.png')}>
      <View style={{ flexDirection: Platform.OS === "ios" ? "row" : "column", paddingHorizontal: Platform.OS ==="ios"? "5%" : "0%" }}>


        {Platform.OS === "ios" &&
          <IconPlaceholder style={{ marginTop: "10%", backgroundColor: Colors.primary, justifyContent: "center", height: 50, width: '13%', alignItems: "center", borderRadius: 10 }} onPress={() => navigation.goBack()} activeOpacity={0.6}>
            <Text style={{ color: Colors.white, fontSize: 20 }}>{"<"}</Text>
          </IconPlaceholder>
        }
        <BackGroundContinerImage
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../../assets/logo.png')}
        />

      </View>

      <ScrollView
        contentContainerStyle={{  paddingHorizontal: 15 }}>
        <SignupTitle>Signup</SignupTitle>
        <FormProvider {...signupMethods}>
          <FormTextField
            name="name"
            label="Full Name"
            style={{ marginBottom: 15 }}
            keyboardType="default"
            rules={{
              required: 'name is required.',
            }}
          />
          <FormTextField
            name="email"
            label="Email"
            style={{ marginBottom: 15 }}
            keyboardType="default"
            rules={{
              // required: 'email is required.',
              pattern: {
                value: isEmail,
                message: 'invalid email',
              },
            }}
          />
          <View>
            <FormTextField
              name="phone_number"
              label="Phone"
              style={{ marginBottom: 15, marginLeft: 90 }}
              keyboardType="number-pad"
              rules={{
                required: 'phone number is required.',
                pattern: {
                  value: isPhoneNumber,
                  message: 'invalid mobile number',
                },
              }}
            />
            <View style={{ position: 'absolute' }}>
              <FormTextField
                getDisable={'false'}
                isSelectInput={true}
                name="country_number"
                items={getcountry}
                rules={{
                  required: 'country number is required.',
                }}
              />
            </View>
          </View>
          <FormTextField
            style={{ marginBottom: 15 }}
            name="password"
            label="Password"
            secureTextEntry={true}
            rules={{
              required: 'Password is required.',
            }}
          />
          <FormTextField
            name="confirm_password"
            label="Confirm Password"
            style={{ marginBottom: 14 }}
            secureTextEntry={true}
            rules={{
              required: 'Confirm Password is required.',
            }}
          />
          <Row>
            <CheckBox />
            <Title>Yes ! Agree on all Terms & Conditions</Title>
          </Row>
          {isLoader ?
            <ActivityIndicator
              style={{ marginTop: "10%" }}
              size="small" color={'#ffffff'}
            /> :

            <ButtonsContainer>
              <Button onPress={signupMethods.handleSubmit(onSubmit)}>
                <ButtonText color={'#000'}>Signup</ButtonText>
              </Button>
            </ButtonsContainer>
          }
          {isError !== "" &&
            <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{isError}
            </Text>}
          <Row style={{marginLeft:"5%"}}>
            <Hairline />
            <Label>Or Signup Using</Label>
            <Hairline />
          </Row>
          <SocialMedia routeName={'SignUp'}/>
        </FormProvider>
        <KeyboardSpacer />
      </ScrollView>
    </Container>
  );
};
