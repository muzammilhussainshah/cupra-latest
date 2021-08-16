import { useRoute, useNavigation } from '@react-navigation/native';

import OTPInputView from '@twotalltotems/react-native-otp-input';

import React from 'react';

import { Alert, ScrollView, ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import FastImage from 'react-native-fast-image';

import { useSelector } from 'react-redux';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import { Button, ButtonsContainer, ButtonText } from '../../../components/Button';

import { height } from '../../../constants/Layout';

import { GradientBanckground } from '../SignUpScreen/SignupStyled';

import {
  Container,
  VerificationHeaderTitle,
  PhoneNumber,
  OtpBackground,
} from './VerificationStyled';

import { _resendCode, _varifyCustomer, _verifyResetPassOtp, _completeSignUp } from '../../../store/action/authAction';

import { useDispatch } from 'react-redux';

export const VerificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  let otpCode: any;

  const isLoader = useSelector(({ reducer }) => reducer.isLoader);
  const isError = useSelector(({ reducer }) => reducer.isError);
  const getroutName = route?.params?.getroutName;
  const getPhonneNumber = route?.params?.phone_number;
  const getsocialId = route?.params?.getsocialId;
  const getsocialType = route?.params?.getsocialType;




  console.log(getsocialId, getsocialType, 'otp From Social')
  return (
    <Container>
      <VerificationHeaderTitle />
      <GradientBanckground
        radius={(height * 3) / 4}
        center={[0, 0]}
        colors={['rgba(251,147,21,0.7)', 'rgba(0,0,0,0.8)']}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 20,
            paddingHorizontal: 15,
            alignItems: 'center',
          }}>
          <PhoneNumber>{getPhonneNumber}</PhoneNumber>
          <OtpBackground
            resizeMode={FastImage.resizeMode.contain}
            source={require('../../../assets/otp.png')}
          />
          <OTPInputView
            style={{ width: '80%', height: 200 }}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={{
              width: 30,
              height: 45,
              borderWidth: 0,
              borderBottomWidth: 1,
            }}
            codeInputHighlightStyle={{
              borderColor: '#03DAC6',
            }}
            selectionColor={'white'}
            onCodeFilled={code => {
              otpCode = code
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 30,
            }}>
            <Text style={{ color: 'white', fontSize: 15, flex: 1 }}>
              Didn’t get the code?
            </Text>
            <TouchableOpacity
              onPress={() => {

                if (getroutName && getroutName == "_resetPasswordReq") {
                  dispatch(_resendCode(getPhonneNumber, getroutName))
                } else {

                  dispatch(_resendCode(getPhonneNumber, getroutName))
                }
              }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Resend</Text>
            </TouchableOpacity>
          </View>
          {isLoader ?
            <ActivityIndicator
              style={{ marginTop: "10%" }}
              size="small" color={'#ffffff'}
            /> :

            <ButtonsContainer>
              <Button onPress={() => {
                if (getroutName && getroutName == "_resetPasswordReq") {
                  dispatch(_verifyResetPassOtp(getPhonneNumber, otpCode, navigation,))
                }
                if (getroutName && getroutName == "SocialSigninVerification") {
                  dispatch(_varifyCustomer(getPhonneNumber, otpCode, getroutName, getsocialId, getsocialType))
                } else {
                  dispatch(_varifyCustomer(getPhonneNumber, otpCode,))
                }
              }}>
                <ButtonText color={'#000'}>Verify</ButtonText>
              </Button>
            </ButtonsContainer>
          }
          {isError !== "" &&
            <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{isError}
            </Text>}
        </ScrollView>
        <KeyboardSpacer topSpacing={-10} />
      </GradientBanckground>
    </Container >
  );
};
