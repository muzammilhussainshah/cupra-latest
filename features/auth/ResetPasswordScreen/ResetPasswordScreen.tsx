import { useRoute, useNavigation } from '@react-navigation/native';

import { _getCountry, } from '../../../store/action/action';
import React, { useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { ScrollView, ActivityIndicator, View, Text, Platform, TouchableOpacity } from 'react-native';

import { Colors } from '../../../constants/Colors';

import styled from 'styled-components/native';

import FastImage from 'react-native-fast-image';

import { useDispatch, useSelector } from 'react-redux';

import { _resetPasswordReq, _resendCode, _varifyCustomer, _completeSignUp } from '../../../store/action/authAction';

import { Button, ButtonsContainer, ButtonText } from '../../../components/Button';

import FormTextField from '../../../components/FormTextField';

import { isPhoneNumber } from '../../../constants/Valoidators';

import {
  BackGroundContinerImage,
  Container,
  FooterButtons,
  LoginTitle,
} from './styled';

interface IPhoneNumberProp {
  phone_number: string;
  country_number: string;
}

const IconPlaceholder = styled(TouchableOpacity)`
background-color: transparent;
border-width: 1px;
border-radius: 20px;
`;

const CountryNumber = ['00962', '00972', '0090'];
export const ResetPasswordScreen: React.FC = () => {
  const [getcountryR, setgetcountryr] = useState([])
  const route = useRoute();
  const isLoader = useSelector(({ reducer }) => reducer.isLoader);
  const isError = useSelector(({ reducer }) => reducer.isError);
  const country = useSelector(({ reducer }: any) => reducer.country);
  const getTitle = route?.params?.title;
  const getCompleteSignUp = route?.params?.completeSignUp;
  const getfullName = route?.params?.full_name;
  const getEmail = route?.params?.email;
  const getcountry = route?.params?.country;
  const getsocialId = route?.params?.social_id;
  const getsocialType = route?.params?.social_type;

  useEffect(() => {
    dispatch(_getCountry(navigation))
  }, [])
  let localCodeArr: any = []
  useEffect(() => {
    console.log(country, 'country')
    country && country.length > 0 && country.map((value: any) => {
      localCodeArr.push( value.country_phone_code.toString())
    })
    setgetcountryr(localCodeArr)
  }, [country])


  const dispatch = useDispatch();
  const navigation = useNavigation();
  const phoneNumberModel = useForm<IPhoneNumberProp>({
    defaultValues: {
      phone_number: '',
      country_number: '00962',
    },
  });
  function onSubmit(model: IPhoneNumberProp) {
    console.warn('form submitted', model);
    let phoneNmbr: string;

    let phone_numberWithout0 = model.phone_number;
    if (model.phone_number[0] === '0') phone_numberWithout0 = phone_numberWithout0.substring(1);


    phoneNmbr = model.country_number + phone_numberWithout0
    if (getCompleteSignUp) {
      // dispatch(_resendCode(phoneNmbr))
      // navigation.navigate('otp', {
      //   getroutName: "SocialSignUpVerify",
      //   phone_number: phoneNmbr,
      //   getfullName: getfullName,
      //   getEmail: getEmail,
      //   getcountry: getcountry,
      //   getsocialId: getsocialId,
      //   getsocialType: getsocialType, 
      // })
      console.log(getCompleteSignUp, 'asvd')
      dispatch(_completeSignUp(phoneNmbr, navigation, getfullName, getEmail,  getsocialId, getsocialType,model.country_number,country));
      // dispatch(_completeSignUp(phoneNmbr, navigation, getfullName, getEmail, getcountry, getsocialId, getsocialType,));

    } else {
      dispatch(_resetPasswordReq(model, navigation))

    }

    // dispatch(_varifyCustomer(phoneNmbr,navigation))

    // :

    // navigation.navigate('otp');

  }
  return (
    <Container
      resizeMode={FastImage.resizeMode.cover}
      source={require('../../../assets/BG.png')}>
      <View style={{ flexDirection: Platform.OS === "ios" ? "row" : "column", paddingHorizontal: Platform.OS === "ios" ? "5%" : "0%" }}>

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
        contentContainerStyle={{ paddingTop: 100, paddingHorizontal: 15 }}>
        <LoginTitle>{getTitle ? getTitle : "Reset Password"}</LoginTitle>
        <FormProvider {...phoneNumberModel}>
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
                getDisable={'false'}
                name="country_number"
                items={getcountryR}
                rules={{
                  required: 'country number is required.',
                }}
              />
            </View>
          </View>
          {isLoader ?
            <ActivityIndicator
              style={{ marginTop: "10%" }}
              size="small" color={'#ffffff'}
            /> :

            <ButtonsContainer>
              <Button onPress={
                phoneNumberModel.handleSubmit(onSubmit)}
              >
                <ButtonText color={'#000'}>{getCompleteSignUp ? getCompleteSignUp : "Send Request"}</ButtonText>
              </Button>
            </ButtonsContainer>
          }
          {isError !== "" &&
            <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{isError}
            </Text>}
        </FormProvider>
        <FooterButtons
          signupNavigate={() => navigation.navigate('signup')}
          forgetPasswordNavigate={() => { }}
          forgetPassword={'Forget your password?'}
          signup={'Don’t have an account ? Sign up'}
        />
      </ScrollView>
    </Container>
  );
};
