import { DrawerActions, useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Dimensions } from 'react-native';

import { Body } from '../../components/Body';

import { Header } from '../../components/Header';

import { Container, CardView } from './HomeStyled';

import { UserStory } from './userStory/UserStory';

import { _getAdds, _getNews, _storiesList, _stories, _getAds, _adclick } from '../../store/action/newsAction'

import { _SearchForAllThings } from '../../store/action/action'

import { useDispatch, useSelector } from 'react-redux';

import InfiniteScroll from 'react-native-infinite-scroll';
import { ScrollView } from 'react-native-gesture-handler';

import FastImage from 'react-native-fast-image';
import { colors } from 'react-native-swiper-flatlist/src/themes';

const { width, height } = Dimensions.get("window");

export type HomeScreenTypeProp = {
  title: string;
};
export const HomeScreen: React.FC = () => {
  // const [filterdBy, setfilterdBy] = useState('MINE')
  const [filterdBy, setfilterdBy] = useState('LATEST')

  const [getNewsSt, setgetNewsSt]: any = useState('')

  const [searchTxt, setsearchTxt] = useState('')

  const [getStoriesSt, setgetStoriesSt] = useState('')

  const [isEmptyserch, setisEmptyserch] = useState(false)

  const [currentUserSt, setcurrentUserSt] = useState('')

  const [pagination, setpagination] = useState(2);

  const [search, setsearch] = useState([]);

  const isLoader = useSelector((state: any) => state.reducer.isLoader);

  const paginationLoader = useSelector((state: any) => state.reducer.paginationLoader);

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const getStories = useSelector((state: any) => state.reducer.getStories)

  const getNews = useSelector((state: any) => state.reducer.getNews)

  const ads = useSelector((state: any) => state.reducer.ads)

  const navigation: any = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      dispatch(_stories(currentUser, filterdBy, navigation,))
      dispatch(_getAds(currentUser,))
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
    if (paginationLoader != true && searchTxt === "") {
      // _getNews(currentUser, pagination, freePotatoes)
      dispatch(_getNews(currentUser, 10, pagination, filterdBy, navigation, true, getNews, setpagination))
      // setpagination(pagination + 1)
    }
    else if (paginationLoader != true && searchTxt !== "") {
      dispatch(_SearchForAllThings(currentUser, searchTxt, "getNews", 10, pagination, navigation, getNews, setpagination))

    }
  }



  const searchUser: any = (e: any) => {
    setpagination(2)
    dispatch(_SearchForAllThings(currentUser, e, "getNews", 10, 1, navigation))

    // let keywords = e.split(' ')
    // setsearch(keywords)
    // console.log('working fine')
    // if (keywords[0] === "") {
    //   setgetNewsSt(getNews)
    // }
    // if (keywords[0] !== "") {
    //   let searchPattern = new RegExp(keywords.map((term: any) => `(?=.*${term})`).join(''), 'i');
    //   let filterChat = [];
    //   for (let index = 0; index < getNews.length; index++) {
    //     filterChat = getNews.filter((data: any) => {
    //       return data.en_header.match(searchPattern) || data.ar_header.match(searchPattern) || data.en_desc.match(searchPattern) || data.ar_desc.match(searchPattern)
    //     });
    //   }
    //   setgetNewsSt(filterChat)
    // }

  }

  return (
    < Container >
      <Header
        isEmptyserch={isEmptyserch}
        _func={(e: any) => {
          searchUser(e)
          setsearchTxt(e)
        }}
        searchBarInput={true}
        notiScreen={() => navigation.navigate('notification')}
        onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />

      {isLoader ?
        <ActivityIndicator
          style={{ marginTop: "50%" }}
          size="small" color={'black'}
        /> :
        <>
          <UserStory data={getStories} navigation={navigation} filterdBy={filterdBy} />
          {/* adds */}
          <View style={{ width: '90%', alignSelf: 'center', marginTop: '2%' }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={ads}
              style={{}}
              horizontal
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("webView", { link: item.external_link });
                    dispatch(_adclick(currentUser,item._id))
                  }}
                  activeOpacity={.9}
                  style={{ marginHorizontal: 5, borderRadius: 15 }}
                >
                  <FastImage
                    style={{ width: width / 1.16, height: height / 5, borderRadius: 15 }}
                    resizeMode={FastImage.resizeMode.stretch}
                    source={{ uri: item.icon }}
                  />
                  <Text style={{ position: 'absolute', color: colors.white, fontSize: 25, alignSelf: 'center', top: '45%' }}>Advertisement Banner</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => String(index)}
            />
            <View  >
              <Text style={{ color: 'black', fontSize: 17, marginVertical: '2%' }}>Latest News</Text>
            </View>
          </View>


          {/* <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              paddingVertical: 20,
            }}>
            <TouchableOpacity onPress={() => {
              setisEmptyserch(!isEmptyserch)
              setfilterdBy("MINE")
              dispatch(_getNews(currentUser, 10, 1, 'MINE'));
            }}  >
              <Text style={{ color: 'black', fontSize: 15 }}>For you</Text>
              {filterdBy == "MINE" &&
                <View style={{ height: 3, backgroundColor: 'black', width: 20 }} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setisEmptyserch(!isEmptyserch)

              setfilterdBy("LATEST")
              dispatch(_getNews(currentUser, 10, 1, "LATEST"));
            }}>
              <Text style={{ color: 'black', fontSize: 15 }}>Latest</Text>
              {filterdBy == "LATEST" &&
                <View style={{ height: 3, backgroundColor: 'black', width: 20 }} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setisEmptyserch(!isEmptyserch)

              setfilterdBy("POPULAR")
              dispatch(_getNews(currentUser, 10, 1, 'POPULAR'));
            }}>
              <Text style={{ color: 'black', fontSize: 15 }}>Popular</Text>
              {filterdBy == "POPULAR" &&
                <View style={{ height: 3, backgroundColor: 'black', width: 20 }} />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setisEmptyserch(!isEmptyserch)

              setfilterdBy("FEATURED")
              dispatch(_getNews(currentUser, 10, 1, 'FEATURED'));
            }}>
              <Text style={{ color: 'black', fontSize: 15 }}>Featured</Text>
              {filterdBy == "FEATURED" &&
                <View style={{ height: 3, backgroundColor: 'black', width: 20 }} />
              }
            </TouchableOpacity>
          </View> */}
          {/* <InfiniteScroll
            style={{}}
            contentContainerStyle={{ paddingBottom: 130 }}

            showsHorizontalScrollIndicator={false}
            horizontal={false}
            onLoadMoreAsync={loadMorePage}
          > */}
          {/* <Body> */}

          {/* {getNewsSt.length > 0 &&
              getNewsSt.map((item: any, index: any) => {
                return (
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
                )
              })
            } */}


          {getNewsSt.length > 0 &&
            <FlatList
              data={getNewsSt}
              onEndReachedThreshold={0.4}
              onEndReached={loadMorePage}
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
                marginBottom: 50,
                // marginTop: 20,
              }}>
                <ActivityIndicator size="small" color={'black'} />
              </View>
            ) : null
          }
          {/* </InfiniteScroll> */}
          {/* </Body> */}

        </>
      }
    </Container >
  );
};
