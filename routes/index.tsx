/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { useRoute, useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColorSchemeName, AsyncStorage } from 'react-native';
import { DrawerNavigator } from './DrawerNavigator';
import { _signIn, _googleAuth, _directLogin, _facebookAuth } from '../store/action/authAction';

import { RootNavigator } from './RootNavigator';

type Props = {
  colorScheme?: ColorSchemeName;
};

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export const Navigation: React.FC<Props> = ({ children }) => {
  const [islogged, setislogged] = useState(false);
  // const currentUser = useSelector(({ currentUser }) => auth.currentUser);

  const dispatch = useDispatch();
  // console.log(Navigation)

  useEffect(() => {
    async function fetchMyAPI() {
      const userEmail = await AsyncStorage.getItem('userEmail');
      const password = await AsyncStorage.getItem('password');
      const getSocialId = await AsyncStorage.getItem('socialId');
      const getSocialtype = await AsyncStorage.getItem('socialType');

      console.log(userEmail, password)
      if (getSocialId && getSocialtype == 'Facebook') {

        dispatch(_directLogin({ Id: getSocialId, type: 'FACEBOOK' }));
        // dispatch(_facebookAuth('testing', getSocialId, 'FACEBOOK'));
      } else if (getSocialId && getSocialtype == 'Google') {
        // dispatch(_directLogin(getSocialId, 'FACEBOOK'));
        dispatch(_directLogin({ Id: getSocialId, type: 'GOOGLE' }));
        // dispatch(_googleAuth('testing', getSocialId, 'GOOGLE'));
      }

      else if (userEmail && password) {
        dispatch(_signIn({ emailOrPhone: userEmail, password: password, directSignin: 'directsignin' }));
      }
    }

    fetchMyAPI();
  }, []);

  return (
    <NavigationContainer>
      {<RootNavigator />}
      {children}
    </NavigationContainer>
  );
};
