import React from 'react';
import FastImage from 'react-native-fast-image';
// @ts-ignore
import RadialGradient from 'react-native-radial-gradient';
import styled from 'styled-components/native';

import {Colors} from '../../../constants/Colors';
import {height, width} from '../../../constants/Layout';

export const Container = styled(FastImage)`
  flex: 1;
  background-color: #000;
  justify-content: flex-start;
  /* align-items: center; */
`;
export const BackGroundContinerImage = styled(FastImage)`
  width: 300px;
  height: 150px;
  align-self: center;
`;
export const GradientBanckground = styled(RadialGradient)`
  width: ${width * 2}px;
  height: ${height - 200}px;
  border-top-left-radius: 400px;
  border-top-right-radius: 400px;
  padding: 0px 200px;
  justify-content: flex-end;
  overflow: hidden;
  position: absolute;
  top: 180px;
  bottom: 0;
`;
export const SignupTitle = styled.Text`
  font-size: 24px;
  line-height: 28px;
  color: ${Colors.white};
  align-self: center;
  margin-bottom: 40px;
  font-family: 'SourceSansPro-Regular';
`;
export const Title = styled.Text`
  font-size: 15px;
  line-height: 14.3px;
  color: ${Colors.white};
  margin-left: 8px;
  font-family: 'SourceSansPro-Regular';
`;
const BorderContainer = styled.View`
  border: 1px solid #fff;
  width: 25px;
  justify-content: center;
  align-items: center;
`;
const Checked = styled(FastImage)`
  width: 20px;
  height: 20px;
`;
export const CheckBox = () => (
  <BorderContainer>
    <Checked
      tintColor={'#fff'}
      resizeMode={FastImage.resizeMode.contain}
      source={require('../../../assets/check.png')}
    />
  </BorderContainer>
);
export const Row = styled.View`
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
`;
