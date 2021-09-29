/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, { useEffect } from 'react';

import { Platform, StatusBar, LogBox, NativeModules ,AsyncStorage } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider, } from 'react-redux';

import store from './store';

import { Navigation } from './routes';

import DeviceInfo, { getDeviceId } from 'react-native-device-info';

import messaging from '@react-native-firebase/messaging';

export interface DeviceTokenProp {
  device_token?: string;
  device_type?: string;
  device_language?: string;
}

export default function App() {

  let uniqueId: string;
  let deviceToken: string | number | any;
  useEffect(() => {
    // var language = getDeviceLocale()
    const language = NativeModules.I18nManager.localeIdentifier // "fr_FR"
    uniqueId = DeviceInfo.getUniqueId(); 
    messaging().getToken().then((token: string) => {
      _onChangeToken(token, language)
    });

    messaging().onTokenRefresh((token) => {
      _onChangeToken(token, language)
    });
    LogBox.ignoreAllLogs(); 
  }, [])

  const _onChangeToken = (token: string, language: string) => {
    var data = {
      'device_token': token,
      'device_type': Platform.OS,
      'device_language': language
    };

    _loadDeviceInfo(data);
  }
  const _loadDeviceInfo = async (deviceData: DeviceTokenProp) => {
    deviceToken = deviceData.device_token
  // return deviceToken

    try {
      console.log(deviceToken,"deviceTokendeviceTokendeviceToken")
      await AsyncStorage.setItem("deviceToken", deviceToken);
      await AsyncStorage.setItem("uniqueId", uniqueId);
    } catch (error) {
      console.log(error,"from async");
    }
  }

  // useEffect(() => {
  //   LogBox.ignoreAllLogs();
  // }, [])
  return (
    <Provider store={store}>
      {/* <RootContainer /> */}
      <SafeAreaProvider>
        <Navigation />
        <StatusBar

          // barStyle={'light-content'}
          translucent={Platform.OS === 'android'}
        />
      </SafeAreaProvider>
    </Provider>
  );
}
