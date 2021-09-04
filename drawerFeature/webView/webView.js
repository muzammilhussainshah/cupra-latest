import React, { useEffect, useState } from 'react';
import { useNavigation, DrawerActions, } from '@react-navigation/native';
import styled from 'styled-components/native';
import { _getProfile } from '../../store/action/authAction';
import { WebView } from 'react-native-webview';
import { Text } from 'react-native-animatable';
export const WebViewScreen: React.FC = ({ route }) => {
    // console.log(route.params, 'route')
    const { name, link } = route.params
    return <WebView source={{ uri: link }} />
};
