import React, { useEffect, useState } from 'react';
import { useNavigation, DrawerActions, } from '@react-navigation/native';
import styled from 'styled-components/native';
import { _getProfile } from '../../store/action/authAction';
import { TouchableOpacity, ScrollView, TextInput, ActivityIndicator,   } from "react-native"
import { Text, View } from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../constants/Colors';
import { _claim } from "../../store/action/claimsAction"
import { useDispatch, useSelector } from 'react-redux';
import { height, width } from '../../constants/Layout'; 
export const ClaimsScreen: React.FC = () => {
  const [body, setBody] = useState('')
  const [title, settitle] = useState('')
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector(({ reducer }: any) => reducer.currentUser);
  const myProfile = useSelector(({ reducer }: any) => reducer.myProfile);
  const isError = useSelector((state: any) => state.reducer.isError);
  const isLoader = useSelector((state: any) => state.reducer.isLoader);
  useEffect(() => {
    dispatch(_getProfile(currentUser, navigation))
  }, [])
  useEffect(() => {
  }, [myProfile])
  return (
    <ScrollView>
      <View style={{ height: height - 24, width: width, backgroundColor: "black", marginTop: 24 }}>
        <View style={{ flex: 1.5, flexDirection: "row", borderBottomWidth: 0.8, borderBottomColor: Colors.brownishGrey }}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
            <View style={{ height: "45%", width: "50%", borderRadius: 10, justifyContent: "center", alignItems: "center", backgroundColor: Colors.primary }}>
              < Text style={{ color: Colors.white }}>{"<"}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 8, justifyContent: "center" }}>
            <FastImage style={{ width: '85%', marginTop: 10, height: "60%" }} source={require('../../assets/logo.png')} resizeMode={FastImage.resizeMode.contain} />
          </View>
        </View>
        <View style={{ flex: 8.5, backgroundColor: Colors.white, justifyContent: "center", alignItems: "center" }}>
          <View style={{ height: "95%", width: "85%", backgroundColor: Colors.white, justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
            <View style={{ position: "absolute", width: "100%", height: "20%", bottom: "80%", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
              <View style={{ height: 80, width: 80, borderRadius: 40, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                {myProfile && myProfile.icon ?
                  <FastImage style={{ width: '100%', height: "100%" }} source={{ uri: myProfile.icon }} resizeMode={FastImage.resizeMode.stretch} /> :
                  <FastImage source={require('../../assets/claims/defaultIcon.png')} resizeMode={"contain"} style={{ height: "90%", width: "90%" }} />
                }
              </View>
            </View>
            <View style={{ height: "85%", width: "95%", backgroundColor: Colors.titleGray, borderRadius: 10, overflow: "hidden" }}>
              <View style={{ flex: 1.8, justifyContent: "flex-end", alignItems: 'center' }}>
                <Text style={{ color: Colors.black, fontSize: 18 }}>{currentUser ? currentUser.full_name : "Name"}</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.black, fontSize: 18, textAlign: "center", maxWidth: "80%" }}>How we can support you?</Text>
              </View>
              <View style={{ flex: 1.6, alignItems: 'center' }}>
                <Text style={{ color: Colors.black, fontSize: 16, maxWidth: "60%", textAlign: "center" }}>Cupra Team is always Happy and willing to hear from you</Text>
              </View>
              <View style={{ flex: 4.1, justifyContent: "center", alignItems: "center" }}>
                <View style={{ height: "100%", width: "90%", borderRadius: 10 }}>
                  <View style={{ backgroundColor: Colors.white, flex: 2, borderRadius: 10, marginBottom: 10 }}>
                    <TextInput
                      style={{
                        width: "100%",
                        height: "100%",
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        color: Colors.darkGray
                      }}
                      value={title}
                      placeholderTextColor={Colors.brownishGrey}
                      placeholder="Your Subject"
                      onChangeText={(text: string) => settitle(text)}
                      multiline={true}
                      underlineColorAndroid='transparent'
                    />
                  </View>
                  <View style={{ backgroundColor: Colors.white, flex: 8, borderRadius: 10, }}>
                    <TextInput
                      style={{
                        width: "100%",
                        height: "100%",
                        textAlignVertical: 'top',
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        color: Colors.darkGray
                      }}
                      value={body}
                      placeholderTextColor={Colors.brownishGrey}
                      placeholder="Type Your Claim Here"
                      onChangeText={(text: string) => setBody(text)}
                      multiline={true}
                      underlineColorAndroid='transparent'
                    />
                  </View>
                </View>
              </View>
              <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}>
                {isLoader ?
                  <ActivityIndicator
                    style={{ marginTop: "0%" }}
                    size="small" color={Colors.white}
                  /> :
                  <TouchableOpacity
                    onPress={() => dispatch(_claim(currentUser, navigation, title, body, settitle, setBody))}
                    activeOpacity={0.7}
                    style={{ height: "60%", width: "60%", borderRadius: 5, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: Colors.white }}>Send Claims</Text>
                  </TouchableOpacity>
                }
                {isError !== "" &&
                  <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{isError}
                  </Text>}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>

  )
};
