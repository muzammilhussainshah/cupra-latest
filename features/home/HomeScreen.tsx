import { DrawerActions, useNavigation } from '@react-navigation/native';

import React, { useEffect, useState, useRef } from 'react';

import { View, ScrollView, Text, ActivityIndicator, FlatList, TouchableOpacity, Dimensions, Linking } from 'react-native';

import { Body } from '../../components/Body';

import { Header } from '../../components/Header';

import { Container, CardView } from './HomeStyled';

import { UserStory } from './userStory/UserStory';

import { _getAdds, _getNews, _storiesList, _stories, _getAds, _adclick, } from '../../store/action/newsAction'

import { _SearchForAllThings } from '../../store/action/action'

import { _onlineUser } from '../../store/action/authAction'

import { useDispatch, useSelector } from 'react-redux';

import InfiniteScroll from 'react-native-infinite-scroll';
import Video from 'react-native-video';

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

  const [isMore, setisMore] = useState<any>(true)

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
  const videoPlayer = useRef(null);

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      dispatch(_stories(currentUser, filterdBy, navigation,))
      dispatch(_getAds(currentUser, navigation))
      dispatch(_onlineUser(currentUser, navigation))
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
      console.log('work ifff')

      // _getNews(currentUser, pagination, freePotatoes)
      dispatch(_getNews(currentUser, 10, pagination, filterdBy, navigation, true, getNews, setpagination, setisMore))
      // setpagination(pagination + 1)
    }
    else if (paginationLoader != true && searchTxt !== "") {
      dispatch(_SearchForAllThings(currentUser, searchTxt, "getNews", 10, pagination, navigation, getNews, setpagination))

    }
  }



  const searchUser: any = (e: any) => {
    setpagination(2)
    if (e !== '') {
      dispatch(_SearchForAllThings(currentUser, e, "getNews", 10, 1, navigation))
    }
    else if (e === '') {
      dispatch(_stories(currentUser, filterdBy, navigation,))
    }

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



  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };




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
        <ScrollView

          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent) && isMore) {
              loadMorePage()
            }
          }}
          scrollEventThrottle={400}




        >
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
                    // navigation.navigate("webView", { link: item.external_link });
                    Linking.canOpenURL(item.external_link).then(supported => {
                      if (supported) {
                        Linking.openURL(item.external_link);
                      } else {
                        console.log("Don't know how to open URI: " + item.external_link);
                      }
                    });

                    dispatch(_adclick(currentUser, item._id))
                  }}
                  activeOpacity={.7}
                  style={{ marginHorizontal: 5 ,width: 360, height: 160,}}
                >
                  {item.media_type === "VIDEO" ?

                    <Video source={{ uri: item.icon }}   // Can be a URL or a local file.
                      ref={videoPlayer}
                      // Store reference
                      // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                      // onError={this.videoError}               // Callback when video cannot be loaded
                      resizeMode="cover"
                      repeat={true}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                      }} />
                    :


                    <FastImage
                      style={{ width: width / 1.16, height: height / 5, }}
                      resizeMode={FastImage.resizeMode.stretch}
                      source={{ uri: item.icon }}
                    />
                  }
                  {/* <Text style={{ position: 'absolute', color: colors.white, fontSize: 25, alignSelf: 'center', top: '45%' }}>Advertisement Banner</Text> */}
                  <Text style={{ position: 'absolute',  fontSize: 17, color: colors.white, alignSelf: 'center', top: '75%' }}>{index+1+'/'+ads.length}</Text>
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
              contentContainerStyle={{ paddingBottom: '20%' }}
              // onEndReachedThreshold={0.1}
              // onEndReached={isMore&&loadMorePage}
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
                marginBottom: 100,
                // marginTop: 20,
              }}>
                <ActivityIndicator size="small" color={'black'} />
              </View>
            ) : null
          }
          {/* </InfiniteScroll> */}
          {/* </Body> */}

        </ScrollView>
      }
    </Container >
  );
};
