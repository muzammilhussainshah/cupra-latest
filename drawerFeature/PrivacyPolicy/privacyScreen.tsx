import React, { useEffect, useState } from 'react';

import { useNavigation, DrawerActions, } from '@react-navigation/native';

import { _getPrivacyPolicy } from '../../store/action/companyAction';

import { useWindowDimensions } from "react-native"

import RenderHTML from "react-native-render-html";

import { Text, View } from 'react-native-animatable';

import { Colors } from '../../constants/Colors';

import { Header } from '../../components/Header';

import { useDispatch, useSelector } from 'react-redux';

export const privacyScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  
  const dispatch = useDispatch();

  const [getcompanyPolicy, setgetcompanyPolicy] = useState('')

  const navigation = useNavigation();

  const currentUser = useSelector(({ reducer }: any) => reducer.currentUser);

  const companyPolicy = useSelector(({ reducer }: any) => reducer.companyPolicy);

  useEffect(() => {
    dispatch(_getPrivacyPolicy(currentUser, navigation))
  }, [])

  useEffect(() => {
    setgetcompanyPolicy(companyPolicy)
    console.log(companyPolicy, 'companyPolicycompanyPolicy')
  }, [companyPolicy])

  const html = `
   ${getcompanyPolicy && getcompanyPolicy.terms && getcompanyPolicy.terms}
   ${getcompanyPolicy && getcompanyPolicy.privacy && getcompanyPolicy.privacy}
  `;


  return (
    <View style={{ flex: 1, marginTop: 24 }}>
      <View style={{ flex: 1.5, backgroundColor: Colors.black, justifyContent: "center" }}>
        <Header RatingScreen={true} onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />
      </View>
      <View style={{ flex: 8.5, backgroundColor: Colors.titleGray, }}>
        <Text style={{ fontSize: 20, color: Colors.darkGray, margin: 20 }}>Privacy Policy</Text>
        <View style={{ marginHorizontal: 20 }}>
          {companyPolicy && companyPolicy.terms && companyPolicy.terms.length > 0 &&
            <RenderHTML contentWidth={width} source={{ html }} />
          }
        </View>
      </View>
    </View>
  )
};
