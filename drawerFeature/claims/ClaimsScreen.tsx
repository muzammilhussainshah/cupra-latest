import React, { useEffect, useState } from 'react';
import { useNavigation, DrawerActions, } from '@react-navigation/native';
import styled from 'styled-components/native';
import { _getProfile } from '../../store/action/authAction';
import { TouchableOpacity, ScrollView, TextInput, ActivityIndicator, ImageBackground } from "react-native"
import { Text, View } from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../constants/Colors';
import { _claim } from "../../store/action/claimsAction"
import { useDispatch, useSelector } from 'react-redux';
import { height, width } from '../../constants/Layout';
const SteeringIcon = styled(FastImage)`
  height: 30px;
  width: 30px;
`;
export const ClaimsScreen: React.FC = () => {
  const [body, setBody] = useState('')
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector(({ reducer }: any) => reducer.currentUser);
  const myProfile = useSelector(({ reducer }: any) => reducer.myProfile);
  const isLoader = useSelector((state: any) => state.reducer.isLoader);
  console.log(currentUser, ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;')
  useEffect(() => {
    // _getProfile = (currentUser, navigation,) 
    // dispatch(_getFavCars(currentUser, navigation))
    dispatch(_getProfile(currentUser, navigation))
  }, [])
  useEffect(() => {
    console.log(myProfile, ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;')
  }, [myProfile])
  return (
    <ScrollView>
      <View style={{ height: height - 24, width: width, backgroundColor: "black", marginTop: 24 }}>
        <View style={{ flex: 1.5, flexDirection: "row", borderBottomWidth: 0.8, borderBottomColor: Colors.brownishGrey }}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
            <SteeringIcon
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/images/back.png')}
            />
          </TouchableOpacity>
          <View style={{ flex: 8, justifyContent: "center" }}>
            <FastImage style={{ width: '85%', marginTop: 10, height: "60%" }} source={require('../../assets/logo.png')} resizeMode={FastImage.resizeMode.contain} />
          </View>
        </View>
        <View style={{ flex: 8.5, backgroundColor: Colors.secondary, justifyContent: "center", alignItems: "center" }}>
          <View style={{ height: "95%", width: "85%", backgroundColor: Colors.darkGray, justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
            <View style={{ position: "absolute", width: "100%", height: "20%", bottom: "80%", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
              <View style={{ height: 80, width: 80, borderRadius: 40, justifyContent: "center", alignItems: "center",overflow:"hidden" }}>
                {myProfile && myProfile.icon ?
                  <FastImage style={{ width: '100%', height: "100%" }} source={{ uri: myProfile.icon }} resizeMode={FastImage.resizeMode.stretch} /> :
                  <FastImage source={require('../../assets/claims/defaultIcon.png')} resizeMode={"contain"} style={{ height: "90%", width: "90%" }} />
                }
              </View>
            </View>
            <View style={{ height: "82%", width: "78%", backgroundColor: Colors.secondary, borderRadius: 10, overflow: "hidden" }}>
              <ImageBackground source={require("../../assets/claims/claimBg.png")} resizeMode='stretch' style={{ height: "100%", width: "100%" }}>
                <View style={{ flex: 2, justifyContent: "flex-end", alignItems: 'center' }}>
                  <Text style={{ color: Colors.white, fontSize: 18 }}>{currentUser ? currentUser.full_name : "Name"}</Text>
                </View>
                <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: Colors.white, fontSize: 18, textAlign: "center", maxWidth: "80%" }}>How we can support you?</Text>
                </View>
                <View style={{ flex: 1.8, alignItems: 'center' }}>
                  <Text style={{ color: Colors.titleGray, fontSize: 16, maxWidth: "70%", textAlign: "center" }}>Cupra Team is always Happy and willing to hear from you</Text>
                </View>
                <View style={{ flex: 3.5, justifyContent: "center", alignItems: "center" }}>
                  <View style={{ height: "90%", width: "90%", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                    <ImageBackground source={require("../../assets/claims/inputbg.png")} resizeMode='stretch' style={{ height: "100%", width: "100%" }}>
                      <TextInput
                        style={{
                          width: "100%",
                          height: "100%",
                          padding: 10,
                          color: Colors.titleGray
                        }}
                        value={body}
                        placeholderTextColor={Colors.brownishGrey}
                        placeholder="Enter your message to claim"
                        onChangeText={(text: string) => setBody(text)}
                        multiline={true}
                        underlineColorAndroid='transparent'
                      />
                    </ImageBackground>
                  </View>
                </View>
                <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}>
                  {isLoader ?
                    <ActivityIndicator
                      style={{ marginTop: "0%" }}
                      size="small" color={Colors.white}
                    /> :
                    <TouchableOpacity
                      onPress={() => dispatch(_claim(currentUser, navigation, body, body))}
                      activeOpacity={0.7}
                      style={{ height: "60%", width: "60%", borderRadius: 20,    justifyContent: "center", alignItems: "center" }}>
                      <ImageBackground source={require("../../assets/claims/submitClaim.png")} resizeMode='contain' style={{ height: "95%", width: "100%" }}>
                      </ImageBackground>
                    </TouchableOpacity>
                  }
                </View>
              </ImageBackground>

            </View>
          </View>
        </View>
      </View>
    </ScrollView>

  )
};
