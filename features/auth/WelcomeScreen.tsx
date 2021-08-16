import { useNavigation } from '@react-navigation/native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { Button, ButtonsContainer, ButtonText } from '../../components/Button';
import { height } from '../../constants/Layout';
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
// TODO:Refactor the GradientBanckground to make reusable component that take
// a different height and width
export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
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
              borderRadius: 25
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
              borderRadius: 25
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
        <Row>
          <Hairline />
          <Label>Or via social</Label>
          <Hairline />
        </Row>
        <SocialMedia />
      </GradientBanckground>
    </BackGroundContinerImage>
  );
};
