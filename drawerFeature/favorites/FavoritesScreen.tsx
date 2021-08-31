import React, { useEffect, useState } from 'react';
import { useNavigation, DrawerActions, } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import styled from 'styled-components/native';
import { _getFavCars, _addFavCars, _dltFavCars, _getModal, _getBrand } from '../../store/action/favoritesCars';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  TouchableOpacity, ScrollView, FlatList, ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Alert
} from "react-native"
import { Text, View } from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { Container, Item, KeyboardView, List, Title } from '../../components/SelectStyle';
import Modal from 'react-native-modal';
import { CityModel } from '../../components/cityModel'
import { Colors } from '../../constants/Colors';
import CancelReservation from '../../components/cancelReservation'
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
  const [modalModal, setmodalModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setmodalName] = useState('');
  const [modalId, setmodalId] = useState('');
  const [brandModal, setbrandModal] = useState(false);
  const [brandName, setbrandName] = useState('');
  const [brandId, setbrandId] = useState('');
  const [yearModal, setyearModal] = useState(false);
  const [yearName, setyearName] = useState('');
  const [favCarId, setFavCarId] = useState('');
  const [dltModalEnabled, setdltModalEnabled] = useState(false);
  const [cities, setCities] = useState([])
  const [models, setModels] = useState([])
  const [brands, setbrands] = useState([])
  const [year, setyear] = useState([])
  const yearClone: any = []

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector(({ reducer }: any) => reducer.currentUser);
  const getFavCars = useSelector(({ reducer }: any) => reducer.getFavCars);
  const isLoader = useSelector((state: any) => state.reducer.isLoader);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };



  // if (brandModal) {
  const getBrands = useSelector((state: any) => state.reducer.getBrands);
  useEffect(() => {
    setbrands(getBrands)
    console.log(getBrands, 'getBrands')
  }, [getBrands])

  // } else if (modalModal) {
  const getModels = useSelector((state: any) => state.reducer.getModels);
  if (yearModal) {
    for (let index = 1980; index <= 2050; index++) {
      yearClone.push(index)
    }
  }



  useEffect(() => {
    setModels(getModels)
    console.log(getModels, 'getModels')
  }, [getModels])
  useEffect(() => {

    dispatch(_getFavCars(currentUser, navigation))
  }, [])
  useEffect(() => {
  }, [getFavCars])
  return (
    <>
      {dltModalEnabled &&
        <View style={{ height: "100%", width: "100%" }}>
          < CancelReservation
            selectedTab={false}
            _func2={(reason: any) => {
              dispatch(_dltFavCars(currentUser, navigation, favCarId))
              setdltModalEnabled(false)
            }}
            cancelReservation={true}
            _func={() => setdltModalEnabled(false)}
            Title={`Are you sure you want to delete!`} />
        </View>
      }
      {modalVisible && brandModal && brands && brands.length > 1 &&
        <Modal
          isVisible={modalVisible}
          hideModalContentWhileAnimating
          useNativeDriver
          onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal}
          style={{ margin: 0 }}
          customBackdrop={Platform.select({
            ios: (
              <BlurView
                style={{ flex: 1 }}
                blurType={'dark'}
                blurAmount={100}
                blurRadius={100}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={toggleModal}>
                  <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
              </BlurView>
            ),
            android: null,
          })}>
          <KeyboardView>
            <Container>
              < List
                contentContainerStyle={{}}
                removeClippedSubviews
                maxToRenderPerBatch={10}
                data={brands}
                renderItem={({ item }: any) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          setaddFavoritesCarsModal(false)
                          setModalVisible(false)
                          setbrandName(item.en_name)
                          setbrandId(item._id)
                          setmodalName("Model")
                          dispatch(_getModal(currentUser, item._id, navigation))
                          setmodalId('')
                        }}
                        style={{ flexDirection: "row", paddingVertical: 10 }}>
                        <Text style={{ color: Colors.black, fontSize: 20, }}>{item.en_name}</Text>
                      </TouchableOpacity>
                    </>
                  )
                }
                }
                keyboardDismissMode={'on-drag'}
              />
            </Container>
          </KeyboardView>
        </Modal>
      }
      {modalVisible && modalModal && models && models.length > 1 &&
        <Modal
          isVisible={modalVisible}
          hideModalContentWhileAnimating
          useNativeDriver
          onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal}
          style={{ margin: 0 }}
          customBackdrop={Platform.select({
            ios: (
              <BlurView
                style={{ flex: 1 }}
                blurType={'dark'}
                blurAmount={100}
                blurRadius={100}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={toggleModal}>
                  <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
              </BlurView>
            ),
            android: null,
          })}>
          <KeyboardView>
            <Container>
              < List
                contentContainerStyle={{}}
                removeClippedSubviews
                maxToRenderPerBatch={10}
                data={models}
                renderItem={({ item }: any) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          setaddFavoritesCarsModal(false)
                          setModalVisible(false)
                          setmodalName(item.en_name)
                          setmodalId(item._id)
                        }}
                        style={{ flexDirection: "row", paddingVertical: 10 }}>
                        <Text style={{ color: Colors.black, fontSize: 20, }}>{item.en_name}</Text>
                      </TouchableOpacity>
                    </>
                  )
                }
                }
                keyboardDismissMode={'on-drag'}
              />
            </Container>
          </KeyboardView>
        </Modal>
      }
      {modalVisible && yearModal && yearClone && yearClone.length > 1 &&
        <Modal
          isVisible={modalVisible}
          hideModalContentWhileAnimating
          useNativeDriver
          onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal}
          style={{ margin: 0 }}
          customBackdrop={Platform.select({
            ios: (
              <BlurView
                style={{ flex: 1 }}
                blurType={'dark'}
                blurAmount={100}
                blurRadius={100}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={toggleModal}>
                  <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
              </BlurView>
            ),
            android: null,
          })}>
          <KeyboardView>
            <Container>
              < List
                contentContainerStyle={{}}
                removeClippedSubviews
                maxToRenderPerBatch={10}
                data={yearClone}
                renderItem={({ item }: any) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          setaddFavoritesCarsModal(false)
                          setModalVisible(false)
                          setyearName(item)
                        }}
                        style={{ flexDirection: "row", paddingVertical: 10 }}>
                        <Text style={{ color: Colors.black, fontSize: 20, }}>{item}</Text>
                      </TouchableOpacity>
                    </>
                  )
                }
                }
                keyboardDismissMode={'on-drag'}
              />
            </Container>
          </KeyboardView>
        </Modal>
      }
      <View style={{ flex: 1, marginTop: 20, backgroundColor: Colors.black }}>
        <View style={{ flex: 1.8, borderBottomWidth: 0.5, borderBottomColor: Colors.brownishGrey }}>
          <View style={{ flex: 7, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}
            >
              <SteeringIcon
                resizeMode={FastImage.resizeMode.contain}
                source={require('../../assets/images/steering.png')}
              />
            </TouchableOpacity>
            <View style={{ flex: 8 }}>
              <FastImage style={{ width: '55%', marginTop: 10, height: "100%" }} source={require('../../assets/logo.png')} resizeMode={FastImage.resizeMode.contain} />
            </View>
          </View>
          <View style={{ flex: 3, paddingHorizontal: 80 }}>
            <Text style={{ fontSize: 20, color: Colors.white, }}>My Favorite Cars</Text>
          </View>
        </View>
        <View style={{ flex: 8.2, backgroundColor: Colors.white }}>
          <View style={{ flex: 3.7, justifyContent: "center", alignItems: "center" }}>
            <View style={{ height: "80%", width: "90%", justifyContent: 'center', alignItems: "center", borderRadius: 15, backgroundColor: Colors.black }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setbrandModal(true)
                  setModalVisible(true)
                  setyearModal(false)
                  setmodalModal(false)
                  dispatch(_getBrand(currentUser, navigation, brandName, setmodalName, setmodalId))
                  setaddFavoritesCarsModal(true)
                }}
                style={{ height: "27%", width: "90%", backgroundColor: Colors.titleGray, marginVertical: 2, borderRadius: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10, color: Colors.brownishGrey }}>
                  {brandName == "" ? "Brand" : brandName}
                </Text>
                <View>
                  <AntDesign name="caretdown" size={10} color={Colors.primary} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setModalVisible(true)
                  setmodalModal(true)
                  setbrandModal(false)
                  setyearModal(false)
                  dispatch(_getModal(currentUser, brandId, navigation))
                  setaddFavoritesCarsModal(true)
                }}
                style={{ height: "27%", width: "90%", backgroundColor: Colors.titleGray, marginVertical: 2, borderRadius: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10, color: Colors.brownishGrey }}>
                  {modalName == "" ? "Model" : modalName}
                </Text>
                <View                >
                  <AntDesign name="caretdown" size={10} color={Colors.primary} />
                </View>
              </TouchableOpacity>
              <View style={{ height: "27%", width: "90%", marginVertical: 2, borderRadius: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setModalVisible(true)
                    setyearModal(true)
                    setbrandModal(false)
                    setmodalModal(false)
                    setaddFavoritesCarsModal(true)
                  }}
                  style={{ height: "100%", width: "55%", backgroundColor: Colors.titleGray, marginVertical: 2, borderRadius: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10, color: Colors.brownishGrey }}>
                    {yearName == "" ? "Year" : yearName}
                  </Text>
                  <View
                  >
                    <AntDesign name="caretdown" size={10} color={Colors.primary} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(_addFavCars(currentUser, navigation, brandId, modalId, yearName, setyearName, setmodalName, setbrandName, setmodalId, setbrandId))
                  }}
                  activeOpacity={0.7}
                  style={{ height: "100%", justifyContent: "center", alignItems: "center", width: "35%", borderRadius: 20, backgroundColor: Colors.primary }}>
                  <Text style={{ color: Colors.white }}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {isLoader &&
            <ActivityIndicator
              style={{ marginTop: "0%" }}
              size="small" color={Colors.black}
            />}
          <View style={{ flex: 6.3, }}>
            <ScrollView contentContainerStyle={{ padding: 30 }}>
              {getFavCars && getFavCars.length > 0 &&
                < FlatList
                  data={getFavCars}
                  renderItem={({ item }: any) => {
                    const { brand, model, year, _id }: any = item
                    setFavCarId(_id)
                    return (
                      <View style={{ height: 100, width: "100%", borderBottomWidth: 0.7, borderBottomColor: Colors.black, padding: 10, flexDirection: "row" }}>
                        <View style={{ flex: 2.5, justifyContent: 'center', alignItems: "center" }}>
                          <FastImage
                            resizeMode={'contain'}
                            source={require('../../assets/users/border.png')}
                            style={{ height: "90%", width: "90%", }} />
                          <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", position: "absolute", zIndex: -1 }}>
                            <View style={{ height: "77%", width: "80%", justifyContent: "center", alignItems: "center", borderRadius: 70, backgroundColor: Colors.darkGray, }}>
                              <FastImage
                                resizeMode={'contain'}
                                source={require('../../assets/aa.png')}
                                style={{ height: "70%", width: "70%", }} />
                            </View>
                          </View>
                        </View>
                        <View style={{ flex: 5.5, justifyContent: 'space-evenly' }}>
                          <Text style={{ color: Colors.black, fontWeight: "bold" }}>
                            {brand && brand.en_name}
                          </Text>
                          <Text style={{ color: Colors.black, }}>
                            {model && model.en_name}
                          </Text>
                          <Text style={{ color: Colors.black, }}>
                            {year && year}
                          </Text>
                        </View>
                        <View style={{ flex: 2, }}>
                          <TouchableOpacity
                            onPress={() => {
                              setdltModalEnabled(true)
                            }}
                            activeOpacity={0.8}
                            style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <FastImage
                              resizeMode={'contain'}
                              source={require('../../assets/images/dlticon2.png')}
                              style={{ height: "60%", width: "60%", }} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  }}
                />
              }
            </ScrollView>
          </View>
        </View>
      </View>
    </>

  )
};
