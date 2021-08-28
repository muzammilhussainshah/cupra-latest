import React, { useEffect, useState } from 'react';
import { useNavigation, DrawerActions, CommonActions } from '@react-navigation/native';
import styled from 'styled-components/native';
import { _getFavCars, _addFavCars, _getModal, _getBrand } from '../../store/action/favoritesCars';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { ImageBackground, TouchableOpacity, ScrollView, FlatList, } from "react-native"
import { Text, View } from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { CityModel } from '../../components/cityModel'
import { Colors } from '../../constants/Colors';
import CancelReservation from '../../components/cancelReservation'
import { height } from '../../constants/Layout';
import { _cancelResetvation } from "../../store/action/shopAction"
import { _cancelSubsurvices } from "../../store/action/serviceAction"
import { useDispatch, useSelector } from 'react-redux';


const SteeringIcon = styled(FastImage)`
  height: 40px;
  width: 40px;
  margin: 5px;
`;
export const FavoritesScreen: React.FC = () => {
  const [addFavoritesCarsModal, setaddFavoritesCarsModal] = useState(false);
  const [CancelReservationEnabled, setCancelReservationEnabled] = useState(false);
  const [modalModal, setmodalModal] = useState(false);
  const [modalName, setmodalName] = useState('');
  const [brandModal, setbrandModal] = useState(false);
  const [brandName, setbrandName] = useState('');
  const [yearModal, setyearModal] = useState(false);
  const [yearName, setyearName] = useState('');
  const [reservationId, setreservationId] = useState('');
  const [getMyProfilefilterdData, setgetMyProfilefilterdData] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector(({ reducer }: any) => reducer.currentUser);
  const getFavCars = useSelector(({ reducer }: any) => reducer.getFavCars);
  const isLoader = useSelector((state: any) => state.reducer.isLoader);

  useEffect(() => {
    dispatch(_getFavCars(currentUser, navigation))
  }, [])
  useEffect(() => {
    console.log(getFavCars, 'getFavCars')
  }, [getFavCars])
  return (
    <>
      {addFavoritesCarsModal &&
        <View style={{ height: '100%', width: '100%', }}>
          {yearModal ?
            <CancelReservation

              _func={() => {
                setaddFavoritesCarsModal(false)
              }}
              year={'Enter Year'}
              _func2={(data: any) => {
                console.log(data, 'data')
                setyearName(data)
                setaddFavoritesCarsModal(false)
              }} />
            :
            <CityModel
              brandModal={brandModal}
              modalModel={modalModal}
              _func={(data: any) => {
                console.log(data, 'data')
                setaddFavoritesCarsModal(false)
                if (data.brands) {
                  setbrandName(data.brands)
                } else if (data.modalName) {
                  setmodalName(data.modalName)
                }
              }}
            />
          }
        </View>

      }

      <View style={{ flex: 1, marginTop: 20, backgroundColor: Colors.black }}>
        <View style={{ flex: 1.8, borderBottomWidth: 0.5, borderBottomColor: Colors.brownishGrey }}>
          <View style={{ flex: 7, flexDirection: "row" }}>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
              <SteeringIcon
                resizeMode={FastImage.resizeMode.contain}
                source={require('../../assets/images/steering.png')}
              />
            </View>
            <View style={{ flex: 8 }}>
              <FastImage style={{ width: '55%', marginTop: 10, height: "100%" }} source={require('../../assets/logo.png')} resizeMode={FastImage.resizeMode.contain} />
            </View>
          </View>
          <View style={{ flex: 3, paddingHorizontal: 80 }}>
            <Text style={{ fontSize: 20, color: Colors.white, }}>My Favorites Cars</Text>
          </View>
        </View>
        <View style={{ flex: 8.2, }}>
          <View style={{ flex: 3.7, justifyContent: "center", alignItems: "center" }}>
            <View style={{ height: "80%", width: "90%", justifyContent: 'center', alignItems: "center", borderRadius: 15, backgroundColor: Colors.white }}>
              <View style={{ height: "27%", width: "90%", backgroundColor: Colors.titleGray, marginVertical: 2, borderRadius: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10, color: Colors.brownishGrey }}>
                  {brandName == "" ? "Brand" : brandName}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setbrandModal(true)
                    setyearModal(false)
                    setmodalModal(false)
                    dispatch(_getBrand(currentUser, navigation))
                    setaddFavoritesCarsModal(true)
                  }}
                >
                  <AntDesign name="caretdown" size={10} color={Colors.primary} />
                </TouchableOpacity>
              </View>
              <View style={{ height: "27%", width: "90%", backgroundColor: Colors.titleGray, marginVertical: 2, borderRadius: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10, color: Colors.brownishGrey }}>
                  {modalName == "" ? "Modal" : modalName}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setmodalModal(true)
                    setbrandModal(false)
                    setyearModal(false)
                    dispatch(_getModal(currentUser, navigation))
                    setaddFavoritesCarsModal(true)
                  }}
                >
                  <AntDesign name="caretdown" size={10} color={Colors.primary} />
                </TouchableOpacity>
              </View>
              <View style={{ height: "27%", width: "90%", marginVertical: 2, borderRadius: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                <View style={{ height: "100%", width: "55%", backgroundColor: Colors.titleGray, marginVertical: 2, borderRadius: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10, color: Colors.brownishGrey }}>
                    {yearName == "" ? "Year" : yearName}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setyearModal(true)
                      setbrandModal(false)
                      setmodalModal(false)
                      setaddFavoritesCarsModal(true)
                    }}
                  >
                    <AntDesign name="caretdown" size={10} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity

                  onPress={() => {
                    dispatch(_addFavCars(currentUser, navigation, brandName, modalName, yearName))
                  }}
                  activeOpacity={0.7}
                  style={{ height: "100%", justifyContent: "center", alignItems: "center", width: "35%", borderRadius: 20, backgroundColor: Colors.primary }}>
                  <Text style={{ color: Colors.white }}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flex: 6.3, }}>
            <ScrollView contentContainerStyle={{ padding: 30 }}>
              {/* {isLoader ?
              <ActivityIndicator
                style={{ marginTop: "40%" }}
                size="small" color={Colors.white}
              /> : */}
              <FlatList
                data={[0, 1, 1, 1, 1, 1, 1]}
                renderItem={({ item }) => {
                  return (
                    <View style={{ height: 100, width: "100%", borderBottomWidth: 0.5, borderBottomColor: Colors.brownishGrey, padding: 10, flexDirection: "row" }}>
                      <View style={{ flex: 2.5, justifyContent: 'center', alignItems: "center" }}>
                        <FastImage
                          resizeMode={'contain'}
                          source={require('../../assets/users/border.png')}
                          style={{ height: "90%", width: "90%", }} />
                        <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", position: "absolute", zIndex: -1 }}>
                          <View style={{ height: "80%", width: "80%", justifyContent: "center", alignItems: "center", borderRadius: 70, backgroundColor: Colors.darkGray, }}>
                            <FastImage
                              resizeMode={'contain'}
                              source={require('../../assets/aa.png')}
                              style={{ height: "70%", width: "70%", }} />
                          </View>
                        </View>
                      </View>
                      <View style={{ flex: 5.5, justifyContent: 'space-evenly' }}>
                        <Text style={{ color: Colors.white, fontWeight: "bold" }}>
                          Brand
                        </Text>
                        <Text style={{ color: Colors.brownishGrey, }}>
                          Modal
                        </Text>
                        <Text style={{ color: Colors.brownishGrey, }}>
                          Year
                        </Text>
                      </View>
                      <View style={{ flex: 2, }}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                          <FastImage
                            resizeMode={'contain'}
                            source={require('../../assets/images/dlticon2.png')}
                            style={{ height: "65%", width: "65%", }} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                }}
              />
              {/* } */}
            </ScrollView>
          </View>
        </View>
      </View>
    </>

  )
};
