import { useNavigation } from '@react-navigation/native';

import { _signIn } from '../../../store/action/authAction';
import { _getCountry, } from '../../../store/action/action';

import React, { useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { ScrollView, View, ActivityIndicator, Text ,Platform,TouchableOpacity} from 'react-native';

import FastImage from 'react-native-fast-image';

import styled from 'styled-components/native';

import { useDispatch, useSelector } from 'react-redux';

import { Colors } from '../../../constants/Colors';

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


import { 
  SocialMedia,
  Row,
  Hairline,
  Label,
} from '../styled';

const IconPlaceholder = styled(TouchableOpacity)`
background-color: transparent;
border-width: 1px;
border-radius: 20px;
`;
interface LoginProp {
  phone_number: string;
  password: string;
  country_number: string;
}
const CountryNumber = ['00962', '00972', '0090'];
export const LoginScreen: React.FC = () => {
  const [getcountry, setgetcountry] = useState([])
  const isLoader = useSelector(({ reducer }: any) => reducer.isLoader);
  const isError = useSelector(({ reducer }: any) => reducer.isError);
  const country = useSelector(({ reducer }: any) => reducer.country);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(_getCountry(navigation))
  }, [])
  let localCodeArr: any = []
  useEffect(() => {
    // setgetcountry(country)
    console.log(country, 'country')
    country && country.length > 0 && country.map((value:any ) => {
      localCodeArr.push( value.country_phone_code.toString())
    })
    setgetcountry(localCodeArr)
    // console.log(localCodeArr, '444444444')
  }, [country])
  const loginMethods = useForm<LoginProp>({
    defaultValues: {
      phone_number: '',
      password: '',
      country_number: '00962',
    },
  });
  function onSubmit(model: LoginProp) {

    dispatch(_signIn({ emailOrPhone: model.country_number + model.phone_number, password: model.password }, navigation))

  }
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
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
                  items={getcountry}
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
              <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{isError}{' ' }{isError=="Invalid Credentials"&& "please signup first"}
              </Text>}
          </FormProvider>
          <FooterButtons
            signupNavigate={() => navigation.navigate('signup')}
            forgetPasswordNavigate={() => navigation.navigate('resetPassword')}
            forgetPassword={'Forget your password?'}
            signup={'Don’t have an account ? Sign up'}
          />
          <Row>
            <Hairline />
            <Label>Or Login Using</Label>
            <Hairline />
          </Row>
          <SocialMedia routeName={'SignIn'}/>
          <KeyboardSpacer />
        </ScrollView>
      </Container>
    </View>
  );
};
