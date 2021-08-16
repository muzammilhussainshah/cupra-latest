/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { useRoute, useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ColorSchemeName, AsyncStorage } from 'react-native';
import { DrawerNavigator } from './DrawerNavigator';
import { _signIn, _googleAuth } from '../store/action/authAction';

import { RootNavigator } from './RootNavigator';

type Props = {
  colorScheme?: ColorSchemeName;
};

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export const Navigation: React.FC<Props> = ({ children }) => {

  const [islogged, setislogged] = useState(false);
  // const currentUser = useSelector(({ currentUser }) => auth.currentUser);
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const dispatch = useDispatch();
  // console.log(Navigation)

  useEffect(() => {
    async function fetchMyAPI() {

      const userEmail = await AsyncStorage.getItem('userEmail');
      const password = await AsyncStorage.getItem('password');
      const getSocialId = await AsyncStorage.getItem("socialId");
      const getSocialtype = await AsyncStorage.getItem("socialType");

      // console.log(userEmail, password)
      if (userEmail && password) {
        dispatch(_signIn({ emailOrPhone: userEmail, password: password }))
      } else if (getSocialId && getSocialtype) {


        dispatch(_googleAuth('testing', getSocialId, getSocialtype))
      }
    }

    fetchMyAPI()
  }, [])


  useEffect(() => {
    console.log(currentUser, 'currentUsercurrentUser')
    if (currentUser?.email) {
      setislogged(true);
    }
    else{
      setislogged(false);
    }
  }, [currentUser])


  return (
    <NavigationContainer>
      {islogged ?
        <DrawerNavigator /> :
        <RootNavigator />
      }
      {children}
    </NavigationContainer>
  )
}