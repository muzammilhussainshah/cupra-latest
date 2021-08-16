import React from 'react';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
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
export const VerificationHeaderTitle = () => (
  <HeaderTitleContainer>
    <VerificationTitle>Verification</VerificationTitle>
    <VerificationDescription>
      Please enter your verification code, we have sent to your registered
      phone.
    </VerificationDescription>
  </HeaderTitleContainer>
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
