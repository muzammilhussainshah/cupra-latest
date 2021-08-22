import { DrawerActions, useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

import { Body } from '../../components/Body';

import { Header } from '../../components/Header';

import { Container, CardView } from './HomeStyled';

import { UserStory } from './userStory/UserStory';

import { _getAdds, _getNews } from '../../store/action/newsAction'

import { useDispatch, useSelector } from 'react-redux';

export type HomeScreenTypeProp = {
  title: string;
};
export const HomeScreen: React.FC = () => {
  const [filterdBy, setfilterdBy] = useState('Mine')
  const [getNewsSt, setgetNewsSt] = useState('')
  const isLoader = useSelector((state: any) => state.reducer.isLoader);
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const getNews = useSelector((state: any) => state.reducer.getNews)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      dispatch(_getAdds(currentUser, navigation, filterdBy))
    }
  }, [currentUser])
  useEffect(() => {
    console.log(getNews, '1234567897897456123')
    setgetNewsSt(getNews)
  }, [getNews])
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
          <UserStory />
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              paddingVertical: 20,
            }}>
            <TouchableOpacity onPress={() => {
              setfilterdBy("Mine")
              dispatch(_getNews(currentUser, 10, 1, filterdBy));
            }}  >
              <Text style={{ color: 'white', fontSize: 15 }}>Mine</Text>
              {filterdBy == "Mine" &&
                <View style={{ height: 3, backgroundColor: 'white', width: 20 }} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setfilterdBy("Latest")
              dispatch(_getNews(currentUser, 10, 1, filterdBy));
            }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Latest</Text>
              {filterdBy == "Latest" &&
                <View style={{ height: 3, backgroundColor: 'white', width: 20 }} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setfilterdBy("Popular")
              dispatch(_getNews(currentUser, 10, 1, filterdBy));
            }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Popular</Text>
              {filterdBy == "Popular" &&
                <View style={{ height: 3, backgroundColor: 'white', width: 20 }} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setfilterdBy("Featured")
              dispatch(_getNews(currentUser, 10, 1, filterdBy));
            }}>
              <Text style={{ color: 'white', fontSize: 15 }}>Featured</Text>
              {filterdBy == "Featured" &&
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
                    name={item.en_client_name}
                    disc={item.en_header}
                    commentCount={item.comments_count}
                    postTime={item.createdAt}
                    _id={item._id}
                    onPress={() => navigation.navigate("HomeDetail", { newsId: item._id, noOfLikes: item.likes_count })}
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
