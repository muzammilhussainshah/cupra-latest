import React, { useState } from 'react';

import { useNavigation, } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';

import styled from 'styled-components/native';
import Modal from "../../components/modal"

import { TouchableOpacity, ScrollView, TextInput, Alert, Platform, PermissionsAndroid, ActivityIndicator } from "react-native"

import { CityModel } from '../../components/cityModel'

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

  const [cityModalEnabled, setcityModalEnabled] = useState(false);

  const isLoader = useSelector((state: any) => state.reducer.isLoader);
  const navigation = useNavigation();

  const [cityName, setcityName] = useState('');

  const [gender, setgender] = useState('');

  const [fullName, setfullName] = useState('');
  const [isModalActive, setIsModalActive] = useState(false);
  const [flag, setflag] = useState(false);
  const [imageUriLocal, setimageUriLocal] = useState("");
  const [imgFile, setimgFile] = useState("");
  const [mobile, setmobile] = useState('');
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

      {cityModalEnabled ?
        <CityModel _func={(value: string) => {
          setcityName(value)
          setcityModalEnabled(false)
        }} /> :
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          {/* {isModalActive &&
            <Modal _func={getImg} _func2={Platform.OS === "ios" ? takePhotoIphone : takePhoto} _modalActive={() => setIsModalActive(!isModalActive)} />
          } */}
          <View style={{ height: height }}>
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
                <View style={{ height: "10%", marginHorizontal: 10, alignItems: "center", flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => navigation.goBack()
                  }>
                    <SteeringIcon
                      resizeMode={FastImage.resizeMode.contain}
                      source={require('../../assets/images/back.png')}
                    />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 16, color: Colors.white, marginLeft: 10 }}>My Profile</Text>
                </View>
                <View style={{ height: "35%", flexDirection: "row", paddingHorizontal: 5, alignItems: 'flex-end', justifyContent: "center" }}>
                  <View style={{ height: '50%', width: '30%', }}>

                    {/* <FastImage source={{uri:'http://res.cloudinary.com/dcr3oyb57/raw/upload/v1630029564/innbq5p5y3ftkkhptedj'}} */}
                    <FastImage source={require('../../assets/users/border.png')}
                      resizeMode='contain'
                      style={{ height: '100%', width: '100%' }}
                    />
                    {/* Absolute for image insert inside border */}
                    <View style={{ height: "100%", width: "100%", overflow: "hidden", position: 'absolute', justifyContent: "center", alignItems: "center", zIndex: -2 }}>
                      <View style={{ height: "86%", width: "86%", borderRadius: 100, backgroundColor: imageUriLocal == "" ? Colors.darkGray : null, justifyContent: "center", alignItems: "center" }}>
                        {/* {imageUriLocal == "" ? */}
                        {/* <FastImage source={require('../../assets/aa.png')}
                            resizeMode='contain'
                            tintColor={Colors.titleGray}
                            style={{ height: '70%', width: '70%' }}
                          />  */}
                        {/* // : */}

                        < FastImage
                          resizeMode={imageUriLocal ? 'cover' : 'contain'}
                          style={{ height: imageUriLocal ? '100%' : "70%", width: imageUriLocal ? '100%' : "70%", borderRadius: 60 }}
                          // style={{ height: 120, width: 120, borderRadius: 60 }}
                          source={imageUriLocal ? { uri: imageUriLocal } : require('../../assets/aa.png')}
                        />
                        {/* } */}
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      // setIsModalActive(!isModalActive)
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
                    <Text style={{ fontSize: 16 }}>Muhammad Ayyad</Text>
                  </View>
                  <View style={{ flex: 9, alignItems: "center" }}>
                    <Text style={{ color: Colors.primary }}>Personal info</Text>
                    <View style={{ backgroundColor: '#f3f3fa', borderRadius: 20, width: "80%", paddingHorizontal: 10, paddingVertical: 2, marginVertical: 5 }}>
                      <Text style={{ color: Colors.darkGray }}>Dont worry...</Text>
                      <Text style={{ color: Colors.darkGray }}>you can change this info later</Text>
                    </View>
                    <View style={{ backgroundColor: '#f3f3fa', flexDirection: "row", height: 40, alignItems: "center", borderRadius: 20, width: "80%", padding: 10, marginVertical: 5 }}>
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Full Name</Text>
                      <TextInput
                        style={{ height: 40, marginLeft: 10, width: "100%" }}
                        onChangeText={text => setfullName(text)}
                        defaultValue={fullName}
                      />
                    </View>
                    <View style={{ backgroundColor: '#f3f3fa', flexDirection: "row", height: 40, alignItems: "center", borderRadius: 20, width: "80%", padding: 10, marginVertical: 5 }}>
                      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Mobile</Text>
                      <TextInput
                        style={{ height: 40, marginLeft: 10, width: "100%" }}
                        onChangeText={text => setmobile(text)}
                        defaultValue={mobile}
                        keyboardType={'numeric'}
                      />
                    </View>
                    <View style={{ backgroundColor: '#f3f3fa', flexDirection: "row", height: 40, borderRadius: 20, width: "80%", padding: 10, marginVertical: 5, }}>
                      <View style={{ justifyContent: "center", flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Gender</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => setgender("Male")}
                        style={{ justifyContent: "center", flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: gender == 'Male' ? Colors.primary : Colors.darkGray }}>Male</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setgender("Female")}
                        style={{ justifyContent: "center", flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: gender == 'Female' ? Colors.primary : Colors.darkGray }}>Female</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: '#f3f3fa', borderRadius: 20, height: 45, width: "80%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, marginVertical: 5 }}>
                      <View style={{ height: "100%", width: "90%" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10, color: Colors.darkGray }}>City</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(_getCity(currentUser, navigation))
                          setcityModalEnabled(true)
                        }}
                        style={{ height: "100%", width: "10%", alignItems: "center", justifyContent: "center" }}>
                        <AntDesign name="caretdown" size={10} color={Colors.primary} />
                      </TouchableOpacity>
                    </View>
                    {isLoader ?
                      <ActivityIndicator
                        style={{ marginTop: "2%" }}
                        size="small" color={Colors.black}
                      /> :
                      <TouchableOpacity
                        onPress={() =>
                          dispatch(_updateProfile(currentUser, navigation, imgFile, mobile, fullName, gender, cityName))
                        }
                        activeOpacity={0.8}
                        style={{ backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center", height: 40, borderRadius: 20, width: "80%", padding: 10, marginVertical: 15 }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: Colors.white }}>Save</Text>
                      </TouchableOpacity>

                    }

                  </View>
                </View>
              </View>
            </View >
          </View>
        </ScrollView>
      }

    </>

  )
};