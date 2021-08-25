import React from 'react';

import { Text, ScrollView, Dimensions, FlatList, View, } from 'react-native';

import FastImage from 'react-native-fast-image';

import { Header } from '../../../components/Header';

import moment from 'moment';

import ReviewComponent from "../../../components/ReviewComponent"

import { Colors } from '../../../constants/Colors';


import { _getHexColor, } from "../../../store/action/action"


import { useSelector } from 'react-redux';

export const GetAndSubmitReview = ({ route, navigation }) => {
  const { serviceName,itemId,serviceId } = route.params
  console.log(itemId,serviceId,'88888')
  const { width, height } = Dimensions.get('window');
  const flex1 = width / 10
  const flexh1 = height / 10
  const getReviews = useSelector((state: any) => state.reducer.getReviews);
  console.log(serviceName, 'serviceNameserviceNameserviceName')
  return (
    <View
      style={{ height: "100%", width: "100%", backgroundColor: Colors.black, }}>
      <View
        style={{ height: "20%", backgroundColor: Colors.black, justifyContent: "center" }}>
        <Header isGoBack={true} RatingScreen={true}
          navigateBack={() => { navigation.goBack() }} />
      </View>
      <View style={{ height: "80%", alignItems: "center", borderColor: Colors.brownishGrey, backgroundColor: Colors.black, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, }}>
        <ScrollView contentContainerStyle={{ width: flex1 * 10, paddingBottom: 50 }}>
          <>
            <View style={{ height: flexh1 * 5 }}>
              <ReviewComponent
                mix={true}
                itemName={serviceName}
                serviceId={serviceId}
                //  item={shopItemDetails}
                  _id={itemId}
                navigation={navigation} />
            </View>
            <View style={{ flexDirection: "row", height: 60, justifyContent: "center", alignItems: "center" }}>
              <FastImage
                source={require('../../../assets/images/RealStar.png')}
                style={{ height: 15, width: 15, marginHorizontal: 5 }} />
              <Text style={{ color: Colors.white, marginVertical: 20, fontSize: 16 }}>{serviceName}Rates</Text>
            </View>
            <FlatList
              data={getReviews}
              renderItem={({ item }) => {
                let items = item;
                return (
                  <View style={{ height: 70, flexDirection: "row", paddingHorizontal: 10, marginVertical: 10, width: "100%" }}>
                    <View style={{ flex: 2, alignItems: "center" }}>
                      <FastImage
                        resizeMode={'contain'}
                        source={
                          items.customer_id.icon ? { uri: items.customer_id.icon } : require('../../../assets/users/avatars-material-man-1.png')
                        }
                        style={{ height: "90%", width: "100%", }} />
                    </View>
                    <View style={{ flex: 8, justifyContent: "space-between" }}>
                      <Text style={{ color: Colors.white, fontSize: 16, fontWeight: "bold" }}>{item.customer_id.full_name}</Text>
                      <Text style={{ color: Colors.brownishGrey, fontWeight: "bold" }}>{moment(item.date,).fromNow()}</Text>
                      <View  >
                        <FlatList
                          data={[1, 2, 3, 4, 5]}
                          horizontal={true}
                          renderItem={({ item }) => {
                            return (
                              <FastImage
                                resizeMode={'contain'}
                                tintColor={item > items.rate ? "#ffffff" : "#f3c93d"}
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
          </>

        </ScrollView>
      </View>
    </View >
  )
}
