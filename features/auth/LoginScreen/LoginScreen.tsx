import { useNavigation } from '@react-navigation/native';

import { _signIn } from '../../../store/action/authAction';

import React from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { ScrollView, View, ActivityIndicator, Text } from 'react-native';

import FastImage from 'react-native-fast-image';

import { useDispatch, useSelector } from 'react-redux';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import { Button, ButtonsContainer, ButtonText } from '../../../components/Button';

import FormTextField from '../../../components/FormTextField';

import { isPhoneNumber } from '../../../constants/Valoidators';

import {
  BackGroundContinerImage,
  Container,
  FooterButtons,
  LoginTitle,
} from './LoginStyled';

interface LoginProp {
  phone_number: string;
  password: string;
  country_number: string;
}
const CountryNumber = ['00962', '00972', '0090'];
export const LoginScreen: React.FC = () => {
  const isLoader = useSelector(({ reducer }: any) => reducer.isLoader);
  const isError = useSelector(({ reducer }: any) => reducer.isError);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginMethods = useForm<LoginProp>({
    defaultValues: {
      phone_number: '',
      password: '',
      country_number: '00962',
    },
  });
  function onSubmit(model: LoginProp) {

    dispatch(_signIn({ emailOrPhone: model.country_number+model.phone_number, password: model.password }, navigation))

  }
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Container
        resizeMode={FastImage.resizeMode.cover}
        source={require('../../../assets/BG.png')}>
        <BackGroundContinerImage
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../../assets/logo.png')}
        />
        <ScrollView
          contentContainerStyle={{ paddingTop: 70, paddingHorizontal: 15 }}>
          <LoginTitle>Login</LoginTitle>
          <FormProvider {...loginMethods}>
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
                  isSelectInput={true}
                  name="country_number"
                  items={CountryNumber}
                  getDisable={'false'}
                  // label="Password"
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
            {isLoader ?
              <ActivityIndicator
                style={{ marginTop: "10%" }}
                size="small" color={'#ffffff'}
              /> :
              <ButtonsContainer>
                <Button onPress={loginMethods.handleSubmit(onSubmit)}>
                  <ButtonText color={'#000'}>Login</ButtonText>
                </Button>
              </ButtonsContainer>
            }
            {isError !== "" &&
              <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{isError}
              </Text>}
          </FormProvider>
          <FooterButtons
            signupNavigate={() => navigation.navigate('signup')}
            forgetPasswordNavigate={() => navigation.navigate('resetPassword')}
            forgetPassword={'Forget your password?'}
            signup={'Don’t have an account ? Sign up'}
          />
          <KeyboardSpacer />
        </ScrollView>
      </Container>
    </View>
  );
};
