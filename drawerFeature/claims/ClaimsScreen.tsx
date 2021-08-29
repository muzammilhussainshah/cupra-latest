import React, { useEffect, useState } from 'react';
import { useNavigation, } from '@react-navigation/native';
import styled from 'styled-components/native';
import { _getFavCars, _addFavCars, _dltFavCars, _getModal, _getBrand } from '../../store/action/favoritesCars';
import { TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from "react-native"
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
  const getFavCars = useSelector(({ reducer }: any) => reducer.getFavCars);
  const isLoader = useSelector((state: any) => state.reducer.isLoader);

  useEffect(() => {
    dispatch(_getFavCars(currentUser, navigation))
  }, [])
  useEffect(() => {
  }, [getFavCars])
  return (
    <ScrollView>
      <View style={{ height: height - 24, width: width, backgroundColor: "black", marginTop: 24 }}>
        <View style={{ flex: 1.5, flexDirection: "row", borderBottomWidth: 0.8, borderBottomColor: Colors.brownishGrey }}>
          <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
            <SteeringIcon
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/images/back.png')}
            />
          </View>
          <View style={{ flex: 8, justifyContent: "center" }}>
            <FastImage style={{ width: '85%', marginTop: 10, height: "60%" }} source={require('../../assets/logo.png')} resizeMode={FastImage.resizeMode.contain} />

          </View>
        </View>
        <View style={{ flex: 8.5, backgroundColor: Colors.secondary, justifyContent: "center", alignItems: "center" }}>
          <View style={{ height: "90%", width: "90%", backgroundColor: Colors.darkGray, justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
            <View style={{ position: "absolute", width: "100%", height: "20%", bottom: "80%", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
              <View style={{ height: 80, width: 80, borderRadius: 40, backgroundColor: Colors.primary }}></View>
            </View>
            <View style={{ height: "82%", width: "78%", backgroundColor: Colors.secondary, borderRadius: 20 }}>
              <View style={{ flex: 2, justifyContent: "flex-end", alignItems: 'center' }}>
                <Text style={{ color: Colors.white, fontSize: 20 }}>Name</Text>
              </View>
              <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.white, fontSize: 20, maxWidth: "80%" }}>How we can support you?</Text>
              </View>
              <View style={{ flex: 1.8, alignItems: 'center' }}>
                <Text style={{ color: Colors.titleGray, fontSize: 16, maxWidth: "70%", textAlign: "center" }}>Cupra Team is always Happy and willing to hear from you</Text>
              </View>
              <View style={{ flex: 3.5, justifyContent: "center", alignItems: "center" }}>
                <View style={{ height: "90%", width: "90%", backgroundColor: Colors.titleGray, borderRadius: 10 }}>
                  <TextInput
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: 10
                    }}

                    value={body}
                    placeholder="Enter your message to claim"
                    onChangeText={(text: string) => setBody(text)}
                    multiline={true}
                    underlineColorAndroid='transparent'
                  />
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
                    style={{ height: "60%", width: "60%", borderRadius: 20, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: Colors.white, fontSize: 18 }}>Send Claim</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>

  )
};
