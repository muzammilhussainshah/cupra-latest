import React, { useState } from 'react';

import { Text, ScrollView, Dimensions, TextInput, FlatList, ActivityIndicator, TouchableOpacity, View, } from 'react-native';

import FastImage from 'react-native-fast-image';

import moment from 'moment';

import { Header } from '../../../components/Header';

import { Colors } from '../../../constants/Colors';

import { _getHexColor, } from "../../../store/action/action"

import { _commentOnNews, _dltCommentOnNews } from "../../../store/action/newsAction"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch, useSelector } from 'react-redux';

import { _getItemDetails, getReview } from '../../../store/action/shopAction';
export const HomeComments = ({ route, navigation, }: any) => {

  const Wheight = Dimensions.get('window').height;

  const [text, setText] = useState('');

  const [Err, setErr] = useState('');

  const flex1 = Wheight / 10

  const routes = route.params

  const { newsId, filterdBy } = routes

  const isLoader = useSelector((state: any) => state.reducer.isLoader)

  const newsComment = useSelector((state: any) => state.reducer.newsComment)

  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  // console.log(currentUser, 'currentUsercurrentUsercurrentUser')
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
        <View style={{ height: "80%", overflow: "hidden", borderColor: Colors.brownishGrey, backgroundColor: Colors.white, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, }}>
          <View style={{ height: "10%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <View style={{ height: "50%", justifyContent: "flex-end" }}>
              {/* <FastImage
                resizeMode={'contain'}
                source={require('../../../assets/images/comment.png')}
                style={{ height: 20, marginHorizontal: 10, width: 20, }} /> */}
              <MaterialCommunityIcons name="message-processing" size={20} color={Colors.titleGray}
                style={{ marginRight:10 }} />
            </View>
            {/* <MaterialCommunityIcons size={25}/> */}

            <Text style={{ color: Colors.black }}>Comments</Text>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
            {isLoader ?
              <ActivityIndicator
                style={{ marginTop: "40%" }}
                size="small" color={Colors.white}
              /> :
              <FlatList
                data={newsComment}
                renderItem={({ item }) => {
                  const { text, createdAt, createdBy, mine, news_id, _id } = item
                  const { icon } = createdBy
                  console.log(item, '[[[[[[[[[[[[[[[[[[[[[')
                  return (
                    <View style={{ paddingHorizontal: 10, marginVertical: 2 }}>
                      <View style={{ height: 60, flexDirection: "row", }}>
                        <View style={{ flex: 1.4, justifyContent: "center", alignItems: "center" }}>
                          <FastImage
                            resizeMode={'contain'}
                            source={require('../../../assets/users/border.png')}
                            style={{ height: "90%", width: "90%", }} />
                          {icon &&
                            <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", position: "absolute", zIndex: -1 }}>
                              <View style={{ borderRadius: 50, overflow: "hidden", height: "75%", width: "90%" }}>
                                <FastImage
                                  resizeMode={'cover'}
                                  source={{ uri: icon }}
                                  style={{ height: "100%", width: "100%", }} />
                              </View>
                            </View>
                          }
                        </View>
                        <View style={{ flex: mine ? 7.6 : 8.6, justifyContent: 'center' }}>
                          <Text style={{ color: Colors.black, fontWeight: "bold", marginHorizontal: 10 }}>{createdBy.full_name}</Text>
                          <Text style={{ color: Colors.brownishGrey, marginHorizontal: 10 }}>{moment(createdAt).fromNow()}</Text>
                        </View>
                        {mine &&
                          <TouchableOpacity
                            onPress={() => dispatch(_dltCommentOnNews(currentUser, news_id, _id, navigation, filterdBy))}
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
                        <Text style={{ color: Colors.black, maxWidth: "80%" }}>{text}</Text>
                      </View>
                    </View>
                  )
                }}
              />
            }
          </ScrollView>
          <View style={{ height: "15%", paddingHorizontal: 15, backgroundColor: Colors.black, flexDirection: 'row' }}>
            <View style={{ width: "90%", justifyContent: "center", }}>
              <TextInput
                placeholder="Type your Comment here"
                multiline
                placeholderTextColor={Colors.brownishGrey}
                value={text}
                style={{ color: Colors.white }}
                onChangeText={text => setText(text)}
              />
            </View>
            <View style={{ width: "10%", justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  if (text) {
                    dispatch(_commentOnNews(currentUser, newsId, text, navigation, filterdBy))
                    setText("")
                  }
                  else {
                    setErr("Add your comment here")
                    setTimeout(() => {
                      setErr("")
                    }, 1000);
                  }
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
          {Err ? <Text style={{ color: "red", textAlign: "center", backgroundColor: Colors.black, width: "100%" }}>{Err}</Text> : null}
        </View >
      </View >
    </ScrollView>
  )
}
