import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, Dimensions, Image, Animated, Easing } from 'react-native';
import { Text, View } from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { Colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

const BackgroundContiner = styled.View`
  width: 100%;
  height: 100%;
`;

// const LogoContainer = styled.View`
//   justify-content: space-between;
//   align-items: center;
//   flex-direction: row;
// `;
const Logo = styled(FastImage)`
  width: ${width};
  height: ${height};
`;
// const HeaderIcons = styled(FastImage)`
//   height: 25px;
//   width: 25px;
//   margin: 5px;
// `;
const SteeringIcon = styled(FastImage)`
  height: 100px;
  width: 100px;
`;
// const IconPlaceholder = styled(TouchableOpacity)`
//   background-color: transparent;
//   border-width: 1px;
//   border-radius: 20px;
// `;
var spinValue = new Animated.Value(0);
Animated.timing(
  spinValue,
  {
    toValue: 20,
    duration: 35000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true  // To make use of native driver for performance
  }
).start()

// Next, interpolate beginning and end values (in this case 0 and 1)
const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '720deg']
})





export const SpashScreen: React.FC<any> = ({
}) => {
  return (
    <BackgroundContiner>
      <Logo
        source={require('../assets/images/splash.png')}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <Animated.Image
        style={{ transform: [{ rotate: spin }], position: 'absolute', width: 100, height: 100, alignSelf: 'center', top: '50%' }}
        source={require('../assets/images/st.png')}
      />
    </BackgroundContiner>
  );
};
