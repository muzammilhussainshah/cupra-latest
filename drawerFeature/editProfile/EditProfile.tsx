import React, { useState, useEffect } from 'react';

import { useNavigation, } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import { _getFavCars, _addFavCars, _dltFavCars, _getModal, _getBrand } from '../../store/action/favoritesCars';

import { Container, Item, KeyboardView, List, Title } from '../../components/SelectStyle';

import AntDesign from 'react-native-vector-icons/AntDesign';

import Modal from 'react-native-modal';

import DocumentPicker from 'react-native-document-picker';

import styled from 'styled-components/native';

import { TouchableOpacity, ScrollView, TextInput, Alert, Platform, PermissionsAndroid, ActivityIndicator, TouchableWithoutFeedback, FlatList } from "react-native"

import { CityModel } from '../../components/cityModel'

import { BlurView } from '@react-native-community/blur';

import { Text, View } from 'react-native-animatable';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import FastImage from 'react-native-fast-image';

import { _getCity } from '../../store/action/action'

import { _updateProfile } from '../../store/action/authAction'

import { Colors } from '../../constants/Colors';

import { height } from '../../constants/Layout';

const SteeringIcon = styled(FastImage)`
  height: 25px;
  width: 25px;
  margin: 5px;
  `;

// TODO:Refactor the GradientBanckground to make reusable component that take
// a different height and width
export const EditProfile: React.FC = () => {

  const dispatch = useDispatch()

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const myProfile = useSelector((state: any) => state.reducer.myProfile)

  const isError = useSelector((state: any) => state.reducer.isError);

  const [modalVisible, setModalVisible] = useState(false);

  const isLoader = useSelector((state: any) => state.reducer.isLoader);

  const [cityModalEnabled, setcityModalEnabled] = useState(false);

  const navigation = useNavigation();

  const [cityName, setcityName] = useState(currentUser && currentUser.country.en_name);

  const [cityId, setcityId] = useState('');

  const [gender, setgender] = useState(myProfile && myProfile.gender && myProfile.gender.toLowerCase());

  const [fullName, setfullName] = useState(currentUser && currentUser.full_name);

  const [isModalActive, setIsModalActive] = useState(false);

  const [cities, setCities] = useState([])

  const [flag, setflag] = useState(false);

  const [imageUriLocal, setimageUriLocal] = useState("");

  const [imgFile, setimgFile] = useState("");

  const [mobile, setmobile] = useState(currentUser && currentUser.email.toString());

  const getCity = useSelector((state: any) => state.reducer.getCity);


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };


  useEffect(() => {
    setCities(getCity)
    console.log(getCity, '555555555555')
  }, [getCity])
  const takePhoto = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let options: any = {
          title: 'Select Image',
          includeBase64: true,
          customButtons: [
            {
              name: 'customOptionKey',
              title: 'Choose Photo from Custom Option'
            },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchCamera(options, (response: any) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            // alert(response.customButton);
            Alert.alert(
              "",
              response.customButton
            );
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            setimageUriLocal(response.uri)
            // _CreateDP(currentUser, response)
            setIsModalActive(false)
          }
        });
      } else {
        Alert.alert("Camera permission denied");
      }

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }
  const takePhotoIphone = async () => {
    try {

      let options: any = {
        title: 'Select Image',
        includeBase64: true,
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option'
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchCamera(options, (response: any) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          // alert(response.customButton);
          Alert.alert(
            "",
            response.customButton
          );
        } else {
          const source = { uri: response.uri };
          console.log('response', JSON.stringify(response));
          setimageUriLocal(response.uri)
          // _CreateDP(currentUser, response)
          setIsModalActive(false)
        }
      });

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }
  const getImg = async () => {
    try {
      let options: any = {
        title: 'Select Image',
        includeBase64: true,
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option'
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, async (res: any) => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log(
            'User tapped custom button: ',
            res.customButton
          );
          Alert.alert(
            "",
            res.customButton
          );
          //   alert(res.customButton);
        } else {
          console.log(res.assets[0], 'res.urires.urires.urires.uri')
          setflag(!flag)
          setimageUriLocal(res.assets[0].uri)
          setimgFile(res.assets[0])
          setIsModalActive(false)
        }
      });

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }
  return (
    <>
      {modalVisible && cityModalEnabled && cities && cities.length > 1 &&
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
                data={cities}
                renderItem={({ item }: any) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          setcityName(item.en_name)
                          setcityId(item._id)
                          setcityModalEnabled(false)
                          // dispatch(_getModal(currentUser, item._id, navigation))
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
        </Modal>}

      < ScrollView contentContainerStyle={{ paddingBottom: 30, backgroundColor: Colors.white }}>
        {/* {isModalActive &&
            <Modal _func={getImg} _func2={Platform.OS === "ios" ? takePhotoIphone : takePhoto} _modalActive={() => setIsModalActive(!isModalActive)} />
          } */}
        < View
          style={{ height: height }}>
          <View style={{ flex: 1, paddingTop: 24 }}>
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
            <View style={{ height: "100%", marginTop: 24, zIndex: 3, position: "absolute", width: "100%" }}>
              <View style={{ height: "10%", marginHorizontal: 20, alignItems: "center", flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}
                  style={{ height: '65%', width: '12%', backgroundColor: Colors.primary, borderRadius: 10, justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ color: Colors.white }}>{'<'}</Text>
                  {/* <SteeringIcon
                    resizeMode={FastImage.resizeMode.contain}
                    source={require('../../assets/images/back.png')}
                  /> */}
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: Colors.white, marginLeft: 20 }}>My Profile</Text>
              </View>
              <View style={{ height: "35%", flexDirection: "row", paddingHorizontal: 5, alignItems: 'flex-end', justifyContent: "center" }}>
                <View style={{ height: '50%', width: '30%', }}>
                  <FastImage source={require('../../assets/users/border.png')}
                    resizeMode='contain'
                    style={{ height: '100%', width: '100%' }}
                  />
                  {/* Absolute for image insert inside border */}
                  <View style={{ height: "100%", width: "100%", overflow: "hidden", position: 'absolute', justifyContent: "center", alignItems: "center", zIndex: -2 }}>
                    <View style={{ height: "86%", width: "86%", borderRadius: 100, backgroundColor: imageUriLocal == "" ? Colors.darkGray : null, justifyContent: "center", alignItems: "center" }}>
                      < FastImage
                        resizeMode={imageUriLocal ? 'cover' : 'contain'}
                        style={{ height: imageUriLocal ? '100%' : myProfile.icon ? "100%" : "70%", width: imageUriLocal ? '100%' : myProfile.icon ? "100%" : "70%", borderRadius: 60 }}
                        source={imageUriLocal ? { uri: imageUriLocal } : myProfile.icon ? { uri: myProfile.icon } : require('../../assets/aa.png')}
                      />
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    getImg()
                  }
                  style={{ height: 35, width: 35, }}>
                  <FastImage source={require('../../assets/cameraIcon.png')}
                    resizeMode='cover'
                    tintColor={Colors.primary}
                    style={{ height: '100%', width: '100%' }}
                  />
                </TouchableOpacity>

              </View>
              <View style={{ height: "55%", }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                  <Text style={{ fontSize: 16 }}>{currentUser.full_name}</Text>
                </View>
                <View style={{ flex: 9, alignItems: "center" }}>
                  <Text style={{ color: Colors.primary }}>Personal info</Text>
                  <View style={{ backgroundColor: '#f3f3fa', borderRadius: 20, width: "80%", paddingHorizontal: 10, paddingVertical: 2, marginVertical: 5 }}>
                    <Text style={{ color: Colors.darkGray }}>Dont worry...</Text>
                    <Text style={{ color: Colors.darkGray }}>you can change this info later</Text>
                  </View>
                  <View style={{ backgroundColor: '#f3f3fa', flexDirection: "row", height: 40, alignItems: "center", borderRadius: 20, width: "80%", padding: 10, marginVertical: 5 }}>
                    <Text style={{ fontSize: 16, width: "25%", fontWeight: "bold" }}>Full Name</Text>
                    <TextInput
                      style={{ height: 40, width: "75%" }}
                      onChangeText={text => setfullName(text)}
                      defaultValue={fullName}
                    />
                  </View>
                  <View style={{ backgroundColor: '#f3f3fa', flexDirection: "row", height: 40, alignItems: "center", borderRadius: 20, width: "80%", padding: 10, marginVertical: 5 }}>
                    <Text style={{ fontSize: 16, width: "25%", fontWeight: "bold" }}>Email</Text>
                    <TextInput
                      style={{ height: 40, width: "75%" }}
                      onChangeText={text => setmobile(text)}
                      defaultValue={mobile} />
                  </View>
                  <View style={{ backgroundColor: '#f3f3fa', flexDirection: "row", height: 40, borderRadius: 20, width: "80%", padding: 10, marginVertical: 5, }}>
                    <View style={{ justifyContent: "center", flex: 1 }}>
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Gender</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setgender("male")}
                      style={{ justifyContent: "center", flex: 1 }}>
                      <Text style={{ fontSize: 16, fontWeight: "bold", color: gender == 'male' ? Colors.primary : Colors.darkGray }}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setgender("female")}
                      style={{ justifyContent: "center", flex: 1 }}>
                      <Text style={{ fontSize: 16, fontWeight: "bold", color: gender == 'female' ? Colors.primary : Colors.darkGray }}>Female</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(_getCity(currentUser, navigation, setModalVisible))
                      setcityModalEnabled(true)
                    }}
                    style={{ backgroundColor: '#f3f3fa', borderRadius: 20, height: 45, width: "80%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, marginVertical: 5 }}>
                    <View style={{ height: "100%", width: "90%" }}>
                      <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10, color: Colors.darkGray }}>{cityName}</Text>
                    </View>
                    <View style={{ height: "100%", width: "10%", alignItems: "center", justifyContent: "center" }}>
                      <AntDesign name="caretdown" size={10} color={Colors.primary} />
                    </View>
                  </TouchableOpacity>
                  {isLoader ?
                    <ActivityIndicator
                      style={{ marginTop: "2%" }}
                      size="small" color={Colors.black}
                    /> :
                    <TouchableOpacity
                      onPress={() =>
                        dispatch(_updateProfile(currentUser, navigation, imgFile, mobile, fullName, gender, cityId))
                      }
                      activeOpacity={0.8}
                      style={{ backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, width: "80%", padding: 10, marginTop: 15 }}>
                      <Text style={{ fontSize: 17, fontWeight: "bold", color: Colors.white }}>Save</Text>
                    </TouchableOpacity>
                  }
                  {isError !== "" &&
                    <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{isError}
                    </Text>
                  }

                </View>
              </View>
            </View>
          </View >
        </ View>
      </ScrollView>

    </>

  )
};
