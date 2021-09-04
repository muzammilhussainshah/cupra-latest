import { useNavigation } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { ScrollView, View, Platform, AsyncStorage, ActivityIndicator, Text } from 'react-native';

import FastImage from 'react-native-fast-image';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import { _signUp } from '../../../store/action/authAction';

import { Button, ButtonsContainer, ButtonText } from '../../../components/Button';

import FormTextField from '../../../components/FormTextField';

import { isEmail, isPhoneNumber } from '../../../constants/Valoidators';

import { useDispatch, useSelector } from 'react-redux';

import DeviceInfo, { getDeviceId } from 'react-native-device-info';

// import LocalizedStrings from 'react-native-localization';

import messaging from '@react-native-firebase/messaging';


import {
  BackGroundContinerImage,
  CheckBox,
  Container,
  Row,
  SignupTitle,
  Title,
} from './SignupStyled';

export interface SignUpProp {
  phone_number: string | number | any;
  password?: string;
  name?: string;
  email?: string;
  confirm_password?: string;
  country_number?: string;
}
export interface DeviceTokenProp {
  device_token?: string;
  device_type?: string;
  device_language?: string;
}
const CountryNumber = ['00962', '00972', '0090'];
// const CountryNumber = ['00962', '00972'];
export const SignUpScreen: React.FC = () => {
  const isLoader = useSelector(({ reducer }) => reducer.isLoader);
  const isError = useSelector(({ reducer }) => reducer.isError);
  const navigation = useNavigation();
  const signupMethods = useForm<SignUpProp>({
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      password: '',
      confirm_password: '',
      country_number: '00962',
    },
  });
  function onSubmit(model: SignUpProp) {
    console.warn('form submitted', model);
    // navigation.navigate('otp', {
    //   phone_number: model.country_number?.concat(model.phone_number),
    // });
    dispatch(_signUp(model, navigation))
    // console.log(model, 'aaa', model.country_number?.concat(model.phone_number));
  }
  const dispatch = useDispatch();

  return (
    <Container
      resizeMode={FastImage.resizeMode.cover}
      source={require('../../../assets/BG.png')}>
      <BackGroundContinerImage
        resizeMode={FastImage.resizeMode.contain}
        source={require('../../../assets/logo.png')}
      />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 15 }}>
        <SignupTitle>Sign up</SignupTitle>
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
              required: 'email is required.',
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
                items={CountryNumber}
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
            <Title>Yes ! Agree all Teams & Condition</Title>
          </Row>
          {isLoader ?
            <ActivityIndicator
              style={{ marginTop: "10%" }}
              size="small" color={'#ffffff'}
            /> :

            <ButtonsContainer>
              <Button onPress={signupMethods.handleSubmit(onSubmit)}>
                <ButtonText color={'#000'}>Sign up</ButtonText>
              </Button>
            </ButtonsContainer>
          }
          {isError !== "" &&
            <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{isError}
            </Text>}
        </FormProvider>
        <KeyboardSpacer />
      </ScrollView>
    </Container>
  );
};
