import React, { useEffect, useState } from 'react';

import { useNavigation, DrawerActions, } from '@react-navigation/native';

import { _getCompanyReviews, _getcomponyInfo, _addCompanyReviews } from '../../store/action/companyAction';

import { TouchableOpacity, TextInput, ScrollView, FlatList, ActivityIndicator } from "react-native"

import { Text, View } from 'react-native-animatable';

import FastImage from 'react-native-fast-image';

import { Colors } from '../../constants/Colors';

import { Header } from '../../components/Header';

import { _claim } from "../../store/action/claimsAction"

import { height, width } from '../../constants/Layout';

import { useDispatch, useSelector } from 'react-redux';

export const RateCompanyScreen: React.FC = () => {

  const [getReviews, setgetReviews] = useState('')
  const [rating, setrating] = useState(0)
  const [sumOfRating, setsumOfRating] = useState('')
  const [noOfRating, setnoOfRating] = useState('')

  const [getcompanyInfo, setgetcompanyInfo] = useState('')

  const [reviewText, setreviewText] = useState('')

  const [noOfReviews, setnoOfReviews] = useState(0)

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const currentUser = useSelector(({ reducer }: any) => reducer.currentUser);

  const companyReviews = useSelector(({ reducer }: any) => reducer.companyReviews);
  const contactUsInfo = useSelector(({ reducer }: any) => reducer.contactUsInfo);
  const isError = useSelector((state: any) => state.reducer.isError);
  const isLoader = useSelector((state: any) => state.reducer.isLoader);


  useEffect(() => {
    dispatch(_getCompanyReviews(currentUser, 10, 1, navigation))
    if (!(Object.keys(contactUsInfo).length > 0)) {
      dispatch(_getcomponyInfo(currentUser, navigation))
    }
  }, [])
  useEffect(() => {
    setgetReviews(companyReviews)
    console.log(companyReviews, 'companyReviewscompanyReviewscompanyReviews')
    if (companyReviews && companyReviews.length > 0) {
      let sumOfRatelocal: any = 0
      companyReviews.map((value: any) => {
        sumOfRatelocal = sumOfRatelocal + value.rate
        console.log(value, 'valuevaluevaluevaluevaluevaluevaluevalue')
      })
      console.log(sumOfRatelocal, 'sumOfRatelocal')
      console.log(companyReviews.length, 'companyReviews.length')
      setsumOfRating(sumOfRatelocal)
      setnoOfRating(companyReviews.length)
      setrating(sumOfRatelocal / companyReviews.length)
    }



  }, [companyReviews])
  useEffect(() => {
    setgetcompanyInfo(contactUsInfo)
    console.log(contactUsInfo, 'contactUsInfocontactUsInfo')
  }, [contactUsInfo])
  return (
    <View style={{ flex: 1, }}>
      <ScrollView>
        <View style={{ height: height - 24, width: width, backgroundColor: Colors.white, marginTop: 24 }}>
          <View style={{ flex: 1.5, backgroundColor: Colors.black, }}>
            <Header RatingScreen={true} onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />
          </View>
          <View style={{ flex: 8.5, justifyContent: "center", alignItems: "center" }}>
            <View style={{ position: "absolute", width: "100%", height: "20%", bottom: "80%", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
              <View style={{ height: 80, width: 80, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                <FastImage source={require('../../assets/images/RealCupraLogo.png')} resizeMode={"contain"} style={{ height: "100%", width: "100%" }} />
              </View>
            </View>
            <View style={{ height: "80%", width: "80%", backgroundColor: Colors.titleGray, borderRadius: 15 }}>
              <View style={{ flex: 1, }}></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("getCompanyReviews")}
                  style={{ width: "60%", alignItems: "center" }}>

                  <FlatList
                    data={[0, 1, 2, 3, 4]}
                    contentContainerStyle={{ flexDirection: "row", height: "100%", alignItems: 'flex-end', }}
                    renderItem={({ item, i }: any) => {
                      return (
                        <View>
                          {item < Math.floor(rating) ?
                            <FastImage
                              tintColor={"#f3c93d"}
                              source={require('../../assets/images/RealStar.png')}
                              style={{ height: 25, width: 25, marginHorizontal: 5 }} /> :
                            <FastImage
                              tintColor={"#ffffff"}
                              source={require('../../assets/images/RealStar.png')}
                              style={{ height: 25, width: 25, marginHorizontal: 5 }} />
                          }
                        </View>
                      )
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("getCompanyReviews")}
                style={{ flex: 1.2, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 17 }}> {rating && Math.floor(rating * 10) / 10} ( {getReviews && getReviews.length > 0 && getReviews.length} )</Text>
              </TouchableOpacity>
              <View style={{ flex: 0.8, alignItems: "center" }}>
                <Text style={{ fontSize: 19 }}>{getcompanyInfo && getcompanyInfo.en_name && getcompanyInfo.en_name}</Text>
              </View>
              <View style={{ flex: 0.8, alignItems: "center" }}>
                <Text style={{ fontSize: 17 }}>what do you think?</Text>
              </View>
              <View style={{ flex: 1, }}>
                <FlatList
                  data={[1, 2, 3, 4, 5]}
                  contentContainerStyle={{ flexDirection: "row", height: "100%", width: "100%", justifyContent: "center" }}
                  renderItem={({ item, }: any) => {
                    return (
                      <TouchableOpacity onPress={() => { setnoOfReviews(item) }}>
                        {item <= noOfReviews ?
                          <FastImage
                            tintColor={"#f3c93d"}
                            source={require('../../assets/images/RealStar.png')}
                            style={{ height: 25, width: 25, marginHorizontal: 5 }} /> :
                          <FastImage
                            tintColor={"#ffffff"}
                            source={require('../../assets/images/RealStar.png')}
                            style={{ height: 25, width: 25, marginHorizontal: 5 }} />
                        }
                      </TouchableOpacity>
                    )
                  }}
                />
              </View>
              <View style={{ flex: 2.7, justifyContent: "center", alignItems: "center" }}>
                <View style={{ height: "100%", width: "70%", borderRadius: 10, backgroundColor: Colors.white }}>
                  <TextInput
                    style={{
                      width: "100%",
                      height: "100%",
                      textAlignVertical: 'top',
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      color: Colors.darkGray
                    }}
                    value={reviewText}
                    placeholderTextColor={Colors.brownishGrey}
                    placeholder="Type Your Review Here"
                    onChangeText={(text: string) => setreviewText(text)}
                    multiline={true}
                    underlineColorAndroid='transparent'
                  /></View>
              </View>
              <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}>
                {isLoader ?
                  <ActivityIndicator
                    style={{ marginTop: "0%" }}
                    size="small" color={Colors.black}
                  /> :
                  <TouchableOpacity
                    onPress={() => dispatch(_addCompanyReviews(currentUser, navigation, noOfReviews, reviewText, setnoOfReviews, setreviewText))}
                    activeOpacity={0.7}
                    style={{ height: "60%", width: "60%", borderRadius: 5, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: Colors.white }}>Send Review</Text>
                  </TouchableOpacity>
                }
                {isError !== "" &&
                  <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{isError}
                  </Text>}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
};
