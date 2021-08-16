import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import {width, height} from '../../../constants/Layout';
import {Colors} from '../../../constants/Colors';
import React from 'react';
import {TouchableOpacity} from 'react-native';

export const Container = styled(FastImage)`
  flex: 1;
  background-color: #000;
  justify-content: flex-start;
`;
export const BackGroundContinerImage = styled(FastImage)`
  width: 300px;
  height: 150px;
  align-self: center;
`;
export const GradientBanckground = styled(RadialGradient)`
  width: ${width * 2}px;
  height: ${height - 250}px;
  border-top-left-radius: 400px;
  border-top-right-radius: 400px;
  padding: 0px 200px;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  top: 180px;
  bottom: 0;
`;
export const LoginTitle = styled.Text`
  font-size: 24px;
  line-height: 28px;
  color: ${Colors.white};
  font-weight: bold;
  align-self: center;
  margin-bottom: 40px;
  font-family: 'SourceSansPro-Regular';
`;
const FooterTitle = styled.Text`
  font-size: 20px;
  color: ${Colors.white};
  align-self: center;
  padding-top: 10px;
  font-family: 'SourceSansPro-Regular';
`;
type FooterTypeProp = {
  forgetPassword: string;
  signup: string;
  signupNavigate: () => void;
  forgetPasswordNavigate: () => void;
};
export const FooterButtons: React.FC<FooterTypeProp> = ({
  forgetPassword,
  signup,
  signupNavigate,
  forgetPasswordNavigate,
}) => (
  <>
    <TouchableOpacity onPress={forgetPasswordNavigate}>
      <FooterTitle>{forgetPassword}</FooterTitle>
    </TouchableOpacity>
    <TouchableOpacity onPress={signupNavigate}>
      <FooterTitle>{signup}</FooterTitle>
    </TouchableOpacity>
  </>
);
