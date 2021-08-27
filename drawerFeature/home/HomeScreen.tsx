import { DrawerActions, useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';

import { Body } from '../../components/Body';

import { Header } from '../../components/Header';

import { Container, CardView } from './HomeStyled';

import { UserStory } from './userStory/UserStory';

import { _getAdds, _getNews, _storiesList, _stories } from '../../store/action/newsAction'

import { useDispatch, useSelector } from 'react-redux';

import InfiniteScroll from 'react-native-infinite-scroll';

export type HomeScreenTypeProp = {
  title: string;
};
export const HomeScreen: React.FC = () => {
  const [filterdBy, setfilterdBy] = useState('MINE')

  const [getNewsSt, setgetNewsSt] = useState('')

  const [getStoriesSt, setgetStoriesSt] = useState('')

  const [currentUserSt, setcurrentUserSt] = useState('')

  const [pagination, setpagination] = useState(2);

  const isLoader = useSelector((state: any) => state.reducer.isLoader);

  const paginationLoader = useSelector((state: any) => state.reducer.paginationLoader);

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const getStories = useSelector((state: any) => state.reducer.getStories)

  const getNews = useSelector((state: any) => state.reducer.getNews)

  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      dispatch(_stories(currentUser, filterdBy, navigation,))
    }
    setcurrentUserSt(currentUser)
  }, [currentUser])

  useEffect(() => {
    setgetNewsSt(getNews)
  }, [getNews, currentUser])

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      setgetStoriesSt(getStories)
    }

  }, [getStories])


  const loadMorePage = () => {
    if (paginationLoader != true) {
      // _getNews(currentUser, pagination, freePotatoes)
      dispatch(_getNews(currentUser, 10, pagination, filterdBy, navigation, true, getNews, setpagination))
      // setpagination(pagination + 1)
    }
  }



  return (
    < Container >
      <Header
        onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
        onPress={() => { }}
      />
      {isLoader ?
        <ActivityIndicator
          style={{ marginTop: "50%" }}
          size="small" color={'#ffffff'}
        /> :
        <>
          <UserStory data={getStories} navigation={navigation} filterdBy={filterdBy} />
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              paddingVertical: 20,
            }}>
            <TouchableOpacity onPress={() => {
              setfilterdBy("MINE")
              dispatch(_getNews(currentUser, 10, 1, 'MINE'));
            }}  >
              <Text style={{ color: 'white', fontSize: 15 }}>For you</Text>
              {filterdBy == "MINE" &&
                <View style={{ height: 3, backgroundColor: 'white', width: 20 }} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setfilterdBy("LATEST")
              dispatch(_getNews(currentUser, 10, 1, "LATEST"));
            }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Latest</Text>
              {filterdBy == "LATEST" &&
                <View style={{ height: 3, backgroundColor: 'white', width: 20 }} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setfilterdBy("POPULAR")
              dispatch(_getNews(currentUser, 10, 1, 'POPULAR'));
            }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Popular</Text>
              {filterdBy == "POPULAR" &&
                <View style={{ height: 3, backgroundColor: 'white', width: 20 }} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setfilterdBy("FEATURED")
              dispatch(_getNews(currentUser, 10, 1, 'FEATURED'));
            }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Featured</Text>
              {filterdBy == "FEATURED" &&
                <View style={{ height: 3, backgroundColor: 'white', width: 20 }} />
              }
            </TouchableOpacity>
          </View>
          <InfiniteScroll
            style={{}}
            contentContainerStyle={{ paddingBottom: 130 }}

            showsHorizontalScrollIndicator={false}
            horizontal={false}
            onLoadMoreAsync={loadMorePage}
          >
            {/* <Body> */}
            {getNewsSt.length > 0 &&
              <FlatList
                data={getNewsSt}
                renderItem={({ item, index }) => (
                  <CardView
                    navigation={navigation}
                    icon={item.icon}
                    likedByMe={item.likedByMe}
                    likes_count={item.likes_count}
                    name={item.en_header}
                    disc={item.en_desc}
                    index={index}
                    commentCount={item.comments_count}
                    postTime={item.createdAt}
                    _id={item._id}
                    filterdBy={filterdBy}
                    onPress={() => navigation.push("HomeDetail", { newsId: item._id, noOfLikes: item.likes_count, filterdBy: filterdBy, likedByMe: item.likedByMe, index })}
                  />
                )}
                keyExtractor={(item, index) => String(index)}
              />
            }
            {
              (paginationLoader === true) ? (
                <View style={{
                  justifyContent: 'center',
                  alignItems: "center",
                  marginBottom: 20,
                  marginTop: 20,
                }}>
                  <ActivityIndicator size="large" color="#ffff" />
                </View>
              ) : null
            }
          </InfiniteScroll>
          {/* </Body> */}

        </>
      }
    </Container >
  );
};
