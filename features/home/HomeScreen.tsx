import { DrawerActions, useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

import { Body } from '../../components/Body';

import { Header } from '../../components/Header';

import { Container, CardView } from './HomeStyled';

import { UserStory } from './userStory/UserStory';

import { _getAdds, _getNews, _storiesList, _stories } from '../../store/action/newsAction'

import { useDispatch, useSelector } from 'react-redux';

export type HomeScreenTypeProp = {
  title: string;
};
export const HomeScreen: React.FC = () => {
  const [filterdBy, setfilterdBy] = useState('MINE')

  const [getNewsSt, setgetNewsSt] = useState('')

  const [getStoriesSt, setgetStoriesSt] = useState('')

  const [currentUserSt, setcurrentUserSt] = useState('')

  const isLoader = useSelector((state: any) => state.reducer.isLoader);

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
          <Body>
            <FlatList
              data={getNewsSt}
              renderItem={({ item }) => {
                return (
                  <CardView
                    navigation={navigation}
                    icon={item.icon}
                    likedByMe={item.likedByMe}
                    likes_count={item.likes_count}
                    name={item.en_header}
                    disc={item.en_desc}
                    commentCount={item.comments_count}
                    postTime={item.createdAt}
                    _id={item._id}
                    filterdBy={filterdBy}
                    onPress={() => navigation.push("HomeDetail", { newsId: item._id, noOfLikes: item.likes_count, filterdBy: filterdBy,likedByMe:item.likedByMe })}
                  />
                )
              }}
            />
          </Body>
        </>
      }
    </Container >
  );
};
