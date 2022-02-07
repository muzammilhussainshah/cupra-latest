import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, Dimensions, Image, Animated, Easing } from 'react-native';
import { AsyncStorage } from 'react-native';
import { _signIn, _directLogin, _directLoginForGuest } from '../store/action/authAction';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
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
  
  const [user, setUser] = useState<any>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   getDataAsync();
  // }, []);

  const getDataAsync = async () => {
    const getEmail = await AsyncStorage.getItem('userEmail');
    const getSocialtype = await AsyncStorage.getItem('socialType');
    const getsocialId = await AsyncStorage.getItem('socialId');
    const password = await AsyncStorage.getItem('password');
// console.log(getSocialtype,'socialType')

    if (getEmail && getEmail !== 'null') {

      dispatch(_signIn({ emailOrPhone: getEmail, password: password }, navigation, setUser));

      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [{ name: 'drawerStack' }],
      //   }),
      // );
      // setUser(true);
    }
    else if (getSocialtype && getSocialtype == 'Facebook') {
      dispatch(_directLogin({ Id: getsocialId, type: 'FACEBOOK' }, navigation, setUser));
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [{ name: 'drawerStack' }],
      //   }),
      // );
      // setUser(true);
    }
    else if (getSocialtype && getSocialtype == 'Google') {
      dispatch(_directLogin({ Id: getsocialId, type: 'GOOGLE' }, navigation, setUser));

      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [{ name: 'drawerStack' }],
      //   }),
      // );
      // setUser(true);
    }
    // else if (getSocialtype && getSocialtype == 'Guest') {
    //   dispatch(_directLoginForGuest(  navigation,  ));

    //   // navigation.dispatch(
    //   //   CommonActions.reset({
    //   //     index: 1,
    //   //     routes: [{ name: 'drawerStack' }],
    //   //   }),
    //   // );
    //   // setUser(true);
    // }


    else {
      setUser(false);
    }
  };

  return (
    <BackgroundContiner style={{backgroundColor:'black'}}>
      <Logo
        source={require('../assets/images/spgif.gif')}
        // source={require('../assets/images/splash.png')}
        resizeMode={FastImage.resizeMode.stretch}
      />
      {/* <TouchableOpacity
      onPress={()=>getDataAsync()}
      activeOpacity={0.7}
      style={{position: 'absolute' , width: 100, height: 100, alignSelf: 'center', top: '82%'}}>
      <Animated.Image
        style={{ transform: [{ rotate: spin }],  }}
        source={require('../assets/images/st.png')}
        />
        </TouchableOpacity> */}
    </BackgroundContiner>
  );
};
