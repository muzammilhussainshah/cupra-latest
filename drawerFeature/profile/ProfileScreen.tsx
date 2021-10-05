import React, { useEffect, useState } from 'react';
import { useNavigation, DrawerActions, CommonActions, useIsFocused } from '@react-navigation/native';
import styled from 'styled-components/native';
import { _getProfile } from '../../store/action/authAction';
import moment from 'moment';
import { ActivityIndicator, TouchableOpacity, ScrollView, FlatList, } from "react-native"
import { Text, View } from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../constants/Colors';
import CancelReservation from '../../components/cancelReservation'
import * as Animatable from 'react-native-animatable';

import { height } from '../../constants/Layout';
import { _cancelResetvation } from "../../store/action/shopAction"
import { _cancelSubsurvices } from "../../store/action/serviceAction"
import { useDispatch, useSelector } from 'react-redux';


const SteeringIcon = styled(FastImage)`
  height: 30px;
  width: 30px;
  margin: 5px;
`;
// TODO:Refactor the GradientBanckground to make reusable component that take
// a different height and width
export const ProfileScreen: React.FC = () => {
  const [selectedTab, setselectedTab] = useState(false);
  const [CancelReservationEnabled, setCancelReservationEnabled] = useState(false);
  const [reservationId, setreservationId] = useState('');
  const [servicesId, setservicesId] = useState('');
  const [getMyProfilefilterdData, setgetMyProfilefilterdData] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused()
  const dispatch = useDispatch();
  const currentUser = useSelector(({ reducer }: any) => reducer.currentUser);
  const myProfile = useSelector(({ reducer }: any) => reducer.myProfile);
  const isLoader = useSelector((state: any) => state.reducer.isLoader);
  useEffect(() => {
    dispatch(_getProfile(currentUser, navigation))
  }, [])
  const { icon, numberOfLikes, numberOfReviews, full_name, _id, bookedServices, reservedParts } = myProfile
  useEffect(() => {
    if (myProfile && myProfile.bookedServices && myProfile.bookedServices.length > 0) {
      let bkService = myProfile.bookedServices
      const filterdData = bkService.filter((bkService: any) => bkService.subService_id);
      // const filterdData = filterdPendingData.filter((filterdPendingData: any) => filterdPendingData.status == "PENDING");
      // console.log(filterdPendingData, 'filterdPendingData')
      setgetMyProfilefilterdData(filterdData)
    }
  }, [myProfile])



  useEffect(() => {
    if (isFocused) {
      dispatch(_getProfile(currentUser, navigation))
    }
  }, [isFocused]);

  return (
    // <Animatable.Text 
    // >Up and down you go</Animatable.Text>

    < View style={{ flex: 1, paddingTop: 24 }}>

      <View style={{ height: '45%', borderTopRightRadius: 20, overflow: "hidden", borderTopLeftRadius: 20, backgroundColor: Colors.black, width: '100%' }}>
        <FastImage source={require('../../assets/profileBg.png')}
          resizeMode='cover'
          style={{ height: '100%', width: '100%' }}
        />
      </View>
      {/*Absolute for background Images */}
      <View style={{ height: "100%", marginTop: 24, justifyContent: "flex-end", position: "absolute", width: "100%" }}>
        <View style={{ height: "80%", }}>
          <FastImage source={require('../../assets/white.png')}
            resizeMode='cover'
            style={{ height: '100%', width: '100%' }}
          />
        </View>
      </View>
      {/*Absolute for Work */}
      < View style={{ height: "100%", marginTop: 24, zIndex: 3, position: "absolute", width: "100%" }}>
        {CancelReservationEnabled &&
          < CancelReservation
            selectedTab={selectedTab}
            _func2={(reason: any) => {
              if (!selectedTab) {
                dispatch(_cancelSubsurvices(currentUser, servicesId, navigation, getMyProfilefilterdData))
                setCancelReservationEnabled(false)

              } else {

                dispatch(_cancelResetvation(currentUser, reservationId, reason, navigation))
                setCancelReservationEnabled(false)
              }
            }}
            cancelReservation={true}
            _func={() => setCancelReservationEnabled(false)} Title={`Are you sure you want to cancel ${selectedTab ? "reservation" : "service"} !`} />
        }
        <View style={{ height: "10%", marginHorizontal: 10, alignItems: "center", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())
          }>
            <SteeringIcon
              resizeMode={FastImage.resizeMode.contain}
              source={require('../../assets/images/menu.png')}
            // source={require('../../assets/images/steering.png')}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, color: Colors.white, marginLeft: 10 }}>My Profile</Text>
        </View>
        <View style={{ height: "35%", flexDirection: "row", paddingHorizontal: 5, alignItems: 'flex-end', justifyContent: "flex-end" }}>
          <View style={{ height: '50%', width: '50%' }}>

            <FastImage source={require('../../assets/users/border.png')}
              resizeMode='contain'
              style={{ height: '100%', width: '100%' }}
            />
            {/* Absolute for image insert inside border */}
            <View style={{ height: "100%", width: "100%", overflow: "hidden", position: 'absolute', justifyContent: "center", alignItems: "center", zIndex: -2 }}>
              <View style={{ height: "86%", width: "53%", borderRadius: 100, backgroundColor: Colors.darkGray,overflow:"hidden", justifyContent: "center", alignItems: "center" }}>
                < FastImage
                  resizeMode={icon ? 'cover' : 'contain'}
                  style={{ height: icon ? '100%' : "70%", width: icon ? '100%' : "70%", borderRadius: 60 }}
                  source={icon ? { uri: icon } : require('../../assets/aa.png')}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("editProfile")}
            style={{ height: 35, width: 110, justifyContent: "center", alignItems: "center", backgroundColor: Colors.primary, borderRadius: 25 }}>
            <Text style={{ color: Colors.white }}>Edit Profile</Text>
          </TouchableOpacity>

        </View>
        <View style={{ height: "55%", backgroundColor: "rgba(0,0,0,0)" }}>
          <View style={{ justifyContent: "center",paddingBottom:15, alignItems: "center", }}>
            <Text style={{ fontSize: 16 }}>{full_name && full_name}</Text>
          </View>
          <ScrollView contentContainerStyle={{}}>

            <View style={{ flex: 2.5, justifyContent: "center", alignItems: "center", }}>
              <View style={{ height: "65%", width: "80%", flexDirection: "row", alignItems: "center", elevation: 5, backgroundColor: Colors.white, borderRadius: 10, padding: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.5} style={{ width: "49.7%", height: 70, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#cccaca" }}>LIKES</Text>
                  <Text style={{ fontSize: 18 }}>{numberOfLikes && numberOfLikes}</Text>
                </TouchableOpacity>
                <View style={{ width: "0.6%", height: "60%", backgroundColor: Colors.titleGray }}></View>
                <TouchableOpacity
                  activeOpacity={0.5} style={{ width: "49.7%", height: 70, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#cccaca" }}>REVIEWS</Text>
                  <Text style={{ fontSize: 18 }}>{numberOfReviews && numberOfReviews}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {isLoader &&
              <ActivityIndicator
                style={{ marginTop: "0%" }}
                size="small" color={Colors.black}
              />}
            <View style={{ flex: 6.5 }}>
              <View style={{ flex: 1.5, flexDirection: "row", borderBottomWidth: 0.5, borderColor: Colors.darkGray }}>
                <TouchableOpacity
                  onPress={() => setselectedTab(false)}
                  activeOpacity={0.7} style={{ flex: 1, alignItems: "center", justifyContent: 'space-between', }}>
                  <Text style={{ fontWeight: "bold", color: Colors.darkGray }}>Booked Services</Text>
                  {!selectedTab &&
                    <View style={{ height: 3, width: "20%", backgroundColor: Colors.primary }}></View>
                  }
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setselectedTab(true)}
                  activeOpacity={0.7} style={{ flex: 1, alignItems: "center", justifyContent: 'space-between' }}>
                  <Text style={{ fontWeight: "bold", color: Colors.darkGray }}>Reserved Parts</Text>
                  {selectedTab &&
                    <View style={{ height: 3, width: "20%", backgroundColor: Colors.primary }}></View>
                  }
                </TouchableOpacity>
              </View>
              <View style={{ flex: 8.5 }}>
                {!selectedTab ?
                  bookedServices &&
                  <FlatList
                    // contentContainerStyle={{ marginTop: 20 }}
                    style={{marginTop:20}}
                    keyExtractor={(item: any) => item._id}
                    data={getMyProfilefilterdData}
                    renderItem={({ item }: any) => {
                      // console.log(item, 'itemitemitemitem')
                      const { subService_id, date_time } = item
                      const { en_name, _id } = subService_id
                      return (
                        <View
                          style={{ height: 90, marginVertical: 5, justifyContent: "center", alignItems: "center", width: "100%", }}>
                          <View style={{ height: "100%", width: "80%", borderWidth: 0.5, borderColor: Colors.titleGray, backgroundColor: Colors.white, elevation: 2, borderRadius: 10, padding: 10 }}>
                            <View style={{ flexDirection: "row", height: "70%" }}>
                              <View style={{ flex: 2.4, overflow: "hidden", borderRadius: 10 }}>
                                <FastImage source={
                                  subService_id.icon ? { uri: subService_id.icon } :
                                    require('../../assets/images/mask.png')}
                                  style={{ height: '100%', width: '100%' }}
                                />
                              </View>
                              <View style={{ flex: 3.8, justifyContent: 'center', alignItems: "center" }}>
                                <Text  >{moment(date_time).format('L')}</Text>
                              </View>
                              <View style={{ flex: 3.8, alignItems: 'center', justifyContent: "center" }}>
                                {item.status !== "PENDING" ?
                                  <View
                                    style={{ height: 35, width: "90%", justifyContent: "center", alignItems: "center", }}>
                                    {item.status == "CANCELED" ?
                                      <Text style={{ color: '#f52d56' }}>CANCELLED</Text> :
                                      <Text style={{ color: '#f52d56' }}>{item.status}</Text>
                                    }
                                  </View> :
                                  <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => {
                                      setCancelReservationEnabled(true)
                                      setservicesId(item._id)
                                    }}
                                    style={{ height: 35, width: "90%", justifyContent: "center", alignItems: "center", backgroundColor: '#f52d56', borderRadius: 20 }}>
                                    <Text style={{ color: Colors.white }}>{"Cancel"}</Text>
                                  </TouchableOpacity>
                                }
                              </View>

                            </View>
                            <View style={{ height: "30%", justifyContent: "flex-end" }}>
                              <Text style={{ fontSize: 13 }}>{en_name}</Text>
                            </View>
                          </View>
                        </View>
                      )
                    }}
                  />
                  :
                  reservedParts &&
                  <FlatList
                    contentContainerStyle={{ marginTop: 5 }}
                    keyExtractor={(item: any) => item._id}
                    data={reservedParts}
                    renderItem={({ item }: any) => { 
                      console.log(item,'itemitemitemitemitemitemitem')
                      const { item_id, date_time, _id } = item
                      const { en_name } = item_id
                      return (
                        <View
                          style={{ height: 90, marginVertical: 5, justifyContent: "center", alignItems: "center", width: "100%", }}>
                          <View style={{ height: "100%", width: "80%", borderWidth: 0.5, borderColor: Colors.titleGray, backgroundColor: Colors.white, elevation: 2, borderRadius: 10, padding: 10, }}>
                            <View style={{ flexDirection: "row", height: "70%" }}>
                              <View style={{ flex: 2.4, overflow: "hidden", borderRadius: 10 }}>
                                <FastImage source={
                                  item_id.icon ? { uri: item_id.icon } :
                                    require('../../assets/images/mask.png')}
                                  style={{ height: '100%', width: '100%' }}
                                />
                              </View>
                              <View style={{ flex: 3.8, justifyContent: 'center', alignItems: "center" }}>
                                <Text  >{moment(date_time).format('L')}</Text>
                              </View>
                              <View style={{ flex: 3.8, alignItems: 'center', justifyContent: "center" }}>
                                {item.status !== "PENDING" ?
                                  <View
                                    style={{ height: 35, width: "90%", justifyContent: "center", alignItems: "center", }}>
                                    {item.status == "CANCELED" ?
                                      <Text style={{ color: '#f52d56' }}>CANCELLED</Text> :
                                      <Text style={{ color: '#f52d56' }}>{item.status}</Text>
                                    }
                                  </View> :
                                  <TouchableOpacity
                                    onPress={() => {
                                      setCancelReservationEnabled(true)
                                      setreservationId(_id)
                                    }
                                    }
                                    activeOpacity={0.6}
                                    style={{ height: 35, width: "90%", justifyContent: "center", alignItems: "center", backgroundColor: '#f52d56', borderRadius: 20 }}>
                                    <Text style={{ color: Colors.white }}>Cancel</Text>
                                  </TouchableOpacity>
                                }
                              </View>
                            </View>
                            <View style={{ height: "30%", justifyContent: 'flex-end' }}>
                              <Text>{en_name}</Text>
                            </View>
                          </View>
                        </View>
                      )
                    }}
                  />
                }
              </View>
            </View>
          </ScrollView>
        </View>
      </ View >
    </View >
  )
};
