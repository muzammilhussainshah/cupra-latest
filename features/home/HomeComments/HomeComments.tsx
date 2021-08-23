import React, { useState } from 'react';

import { Text, ScrollView, Dimensions, TextInput, FlatList, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';

import FastImage from 'react-native-fast-image';

import moment from 'moment';

import { Header } from '../../../components/Header';

import { Colors } from '../../../constants/Colors';

import { _getHexColor, } from "../../../store/action/action"

import { _commentOnNews, _dltCommentOnNews } from "../../../store/action/newsAction"

import { useDispatch, useSelector } from 'react-redux';

import { _getItemDetails, getReview } from '../../../store/action/shopAction';
// background:"red";

// TODO: Remove the views and handle the component from the styled
export const HomeComments = ({ route, navigation, }: any) => {

  const Wheight = Dimensions.get('window').height;

  const [text, setText] = useState('');

  const flex1 = Wheight / 10

  const routes = route.params

  const { newsId,filterdBy } = routes
  console.log(routes,'sss')

  const newsComment = useSelector((state: any) => state.reducer.newsComment)

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const dispatch = useDispatch()

  return (
    <ScrollView>
      <View style={{ height: flex1 * 10, backgroundColor: Colors.black }}>
        <View
          style={{ height: "20%", backgroundColor: Colors.black, justifyContent: "center" }}>
          <Header
            isGoBack={true}
            RatingScreen={true}
            navigateBack={() => { navigation.goBack() }} />
        </View>
        <View style={{ height: "80%", overflow: "hidden", borderColor: Colors.brownishGrey, backgroundColor: '#18191d', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, }}>
          <View style={{ height: "10%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <View style={{ height: "50%", justifyContent: "flex-end" }}>
              <FastImage
                resizeMode={'contain'}
                source={require('../../../assets/images/comment.png')}
                style={{ height: 20, marginHorizontal: 10, width: 20, }} />
            </View>
            <Text style={{ color: Colors.white }}>Comments</Text>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
            <FlatList
              data={newsComment}
              renderItem={({ item }) => {
                const { text, createdAt, createdBy, mine, news_id, _id } = item
                return (
                  <View style={{ paddingHorizontal: 10, marginVertical: 2 }}>
                    <View style={{ height: 60, flexDirection: "row", }}>
                      <View style={{ flex: 1.4, justifyContent: "center", alignItems: "center" }}>
                        <FastImage
                          resizeMode={'contain'}
                          source={require('../../../assets/users/border.png')}
                          style={{ height: "100%", width: "100%", }} />
                        <View style={{ height: "100%", width: "100%", position: "absolute", zIndex: 3 }}>
                        </View>
                      </View>
                      <View style={{ flex: mine ? 7.6 : 8.6, justifyContent: 'center' }}>
                        <Text style={{ color: Colors.white, fontWeight: "bold" }}>{createdBy.full_name}</Text>
                        <Text style={{ color: Colors.brownishGrey }}>{moment(createdAt).fromNow()}</Text>
                      </View>
                      {mine &&
                        <TouchableOpacity
                          onPress={() => dispatch(_dltCommentOnNews(currentUser, news_id, _id, navigation,filterdBy))}
                          activeOpacity={0.8}
                          style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                          <FastImage
                            resizeMode={'contain'}
                            source={require('../../../assets/images/dlticon2.png')}
                            style={{ height: "70%", width: "70%", }} />
                        </TouchableOpacity>
                      }
                    </View>
                    <View style={{ flex: 4, marginVertical: 5, paddingHorizontal: 10, justifyContent: "center" }}>
                      <Text style={{ color: Colors.titleGray, maxWidth: "80%" }}>{text}</Text>
                    </View>
                  </View>
                )
              }}
            />
          </ScrollView>
          <View style={{ height: "15%", paddingHorizontal: 15, backgroundColor: Colors.black, flexDirection: 'row' }}>
            <View style={{ width: "90%", justifyContent: "center", }}>
              <TextInput
                placeholder="Type your Comment here"
                placeholderTextColor={Colors.brownishGrey}
                value={text}
                style={{ color: Colors.white }}
                onChangeText={text => setText(text)}
              />
            </View>
            <View style={{ width: "10%", justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(_commentOnNews(currentUser, newsId, text, navigation,filterdBy))
                  setText("")
                }
                }
              >
                <FastImage
                  resizeMode={'contain'}
                  source={require('../../../assets/images/sendIcon.png')}
                  style={{ height: 40, width: 40, }} />
              </TouchableOpacity>
            </View>
          </View>
        </View >
      </View >
    </ScrollView>
  )
}
