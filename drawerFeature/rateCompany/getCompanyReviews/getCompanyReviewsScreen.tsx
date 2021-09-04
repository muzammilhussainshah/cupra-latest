import React from 'react';

import { Text, ScrollView, Dimensions, FlatList, View, } from 'react-native';

import FastImage from 'react-native-fast-image';

import { Header } from '../../../components/Header';

import moment from 'moment';

import { Colors } from '../../../constants/Colors';

import { _getHexColor, } from "../../../store/action/action"

import { useSelector } from 'react-redux';

export const GetCompanyReview = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const flex1 = width / 10
  const companyReviews = useSelector(({ reducer }: any) => reducer.companyReviews);
  console.log(companyReviews, 'companyReviews555')
  return (
    <View
      style={{ height: "100%", width: "100%", backgroundColor: Colors.black, }}>
      <View
        style={{ height: "20%", backgroundColor: Colors.black, justifyContent: "center" }}>
        <Header isGoBack={true} RatingScreen={true}
          navigateBack={() => { navigation.goBack() }} />
      </View>
      <View style={{
        flex: 8, alignItems: "center", borderColor: Colors.brownishGrey, backgroundColor: Colors.white, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30,
      }}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <FastImage
            source={require('../../../assets/images/RealStar.png')}
            style={{ height: 15, width: 15, marginHorizontal: 5 }} />
          <Text style={{ color: Colors.black, marginVertical: 20, fontSize: 16 }}>Company  Rates</Text>
        </View>
        <ScrollView contentContainerStyle={{ width: flex1 * 10 }}>
          <FlatList
            data={companyReviews}
            renderItem={({ item }) => {
              let items = item;
              return (
                <View style={{ height: 70, flexDirection: "row", paddingHorizontal: 10, marginVertical: 10, width: "100%" }}>
                  <View style={{ flex: 2,   justifyContent: 'center', alignItems: "center" }}>
                    <View style={{ height: '80%', width: "80%",  borderRadius:10,overflow:"hidden" }}>
                      <FastImage
                        resizeMode={"stretch"}
                        source={
                          items.customer.icon ? { uri: items.customer.icon } :
                            require('../../../assets/users/avatars-material-man-1.png')
                        }
                        style={{ height: "100%", width: "100%", }} />
                    </View>
                  </View>
                  <View style={{ flex: 8, justifyContent: "space-between" }}>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                      {item.customer.full_name}
                    </Text>
                    <Text style={{ color: Colors.brownishGrey, fontWeight: "bold" }}>{moment(item.createdAt,).fromNow()}</Text>
                    <View  >
                      <FlatList
                        data={[1, 2, 3, 4, 5]}
                        horizontal={true}
                        renderItem={({ item }) => {
                          return (
                            <FastImage
                              resizeMode={'contain'}
                              tintColor={item > items.rate ? Colors.titleGray : "#f3c93d"}
                              source={require('../../../assets/images/RealStar.png')}
                              style={{ height: 15, marginHorizontal: 2, width: 15, }} />
                          )
                        }}
                      />
                    </View>
                  </View>
                </View>
              )
            }}
          />
        </ScrollView>
      </View>
    </View >
  )
}
