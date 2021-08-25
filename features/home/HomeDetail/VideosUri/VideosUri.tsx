import React, { useState } from 'react';

import { Text, ScrollView, Dimensions, TextInput, FlatList, ActivityIndicator, TouchableOpacity, View, } from 'react-native';

import {
  VideoContainer,
  VideoTile,
  VideoTitle,
  VideoTitleWrapper,
} from '../../../video/VideoStyled';
import { Header } from '../../../../components/Header';

import { Colors } from '../../../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImagesContainer, ImageTile, ImageTitle, ImageTitleWrapper } from '../../../images/ImagesStyled';
import { useDispatch, useSelector } from 'react-redux';

// import { _getItemDetails, getReview } from '../../../store/action/shopAction';
export const VideosUri = ({ route, navigation, }: any) => {

  const Wheight = Dimensions.get('window').height;

  const [text, setText] = useState('');
  const [Err, setErr] = useState('');

  const flex1 = Wheight / 10

  const routes = route.params


  const { videosSlider } = routes
  console.log(routes, videosSlider, 'ssssssssssssssssssssssss')
  const isLoader = useSelector((state: any) => state.reducer.isLoader)

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
          <ImageTitleWrapper>
            <ImageTitle>Videos</ImageTitle>
            <Ionicons name="filter-outline" size={30} color="#fff" />
          </ImageTitleWrapper>
          <View style={{ alignItems: videosSlider.length>1?"center":"flex-start",padding: videosSlider.length>1?0:30 }}>
            <FlatList
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={videosSlider}
              renderItem={({ item }) => (
                <>
                  {console.log(item)}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('VideoPlayScreenHome', {
                        videoURL: item,
                      })
                    }
                    activeOpacity={0.7}
                    style={{ height: 160, width: 150, margin: 10, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                    <Ionicons name="play-circle-outline" size={50} color="white" />
                  </TouchableOpacity>
                </>
              )}
            />
          </View>
          {/* <ScrollView contentContainerStyle={{ padding: 30 }}>
            <FlatList
              data={videosSlider}
              renderItem={({ item }) => {
                return (
                  <View style={{marginVertical:5, borderRadius: 5,padding:10, borderWidth: 1, borderColor: Colors.white }}>

                    <Text style={{ color: Colors.white }}>{item}</Text>
                  </View>
                )
              }}
            />
          </ScrollView> */}
        </View >
      </View >
    </ScrollView>
  )
}
