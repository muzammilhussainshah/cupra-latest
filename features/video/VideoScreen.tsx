import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import {
  VideoContainer,
  VideoTile,
  VideoTitle,
  VideoTitleWrapper,
} from './VideoStyled';
import { View, Dimensions, FlatList ,ActivityIndicator,Platform} from 'react-native';
import { StaticVideos } from '../../data/StaticVideos';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { _getVideos } from '../../store/action/videoAction';
import InfiniteScroll from 'react-native-infinite-scroll';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export const VideoScreen: React.FC = () => {
  const navigation = useNavigation();
  const currentUser = useSelector((state: any) => state.reducer.currentUser);
  const videos = useSelector((state: any) => state.reducer.videos);
  const paginationLoader = useSelector((state: any) => state.reducer.paginationLoader);
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');
  const [pagination, setpagination] = useState(2);
  const [search, setsearch] = useState([]);
  const [videosST, setvideosST] = useState([]);
  const [searchTxt, setsearchTxt] = useState('')
  const [isEmptyserch, setisEmptyserch] = useState(false)

  useEffect(() => {
    dispatch(_getVideos(currentUser, navigation, 10, 1,));
  }, []);

  useEffect(() => {
    setvideosST(videos)
  }, [videos]);
  console.log(videos, 'videosvideosvideosvideos')



  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setisEmptyserch(false)
      dispatch(_getVideos(currentUser, navigation, 10, 1,));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setisEmptyserch(true)
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const searchUser: any = (e: any) => {
    let keywords = e.split(' ')
    setsearch(keywords)
    console.log('working fine')
    if (keywords[0] === "") {
      setvideosST(videos)
    }
    if (keywords[0] !== "") {
      let searchPattern = new RegExp(keywords.map((term: any) => `(?=.*${term})`).join(''), 'i');
      let filterChat = [];
      for (let index = 0; index < videos.length; index++) {
        filterChat = videos.filter((data: any) => {
          return data.en_header.match(searchPattern) || data.ar_header.match(searchPattern) || data.en_desc.match(searchPattern) || data.ar_desc.match(searchPattern)
        });
      }
      setvideosST(filterChat)
    }
  }



  const loadMorePage = () => {
    if (paginationLoader != true && searchTxt === "") {
      // _getNews(currentUser, pagination, freePotatoes)
      // dispatch(_getNews(currentUser, 10, pagination, filterdBy, navigation, true, getNews, setpagination))

      dispatch(_getVideos(currentUser, navigation, 10, pagination, videos, setpagination));

      // setpagination(pagination + 1)
    }
    // else if (paginationLoader != true && searchTxt !== "") {
    //   dispatch(_SearchForAllThings(currentUser, searchTxt, "getNews", 10, pagination, navigation, getNews, setpagination))

    // }
  }
  return (
    <VideoContainer style={{paddingVertical:Platform.OS="ios"?-15:0}}>
      <Header

        isEmptyserch={isEmptyserch}
        _func={(e: any) => {
          searchUser(e)
        }}
        notiScreen={() => navigation.navigate('notification')}
        searchBarInput={true}
        onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />

      <VideoTitleWrapper>
        <VideoTitle>Videos</VideoTitle>
        <Ionicons name="filter-outline" size={30} color="#fff" />
      </VideoTitleWrapper>
      <InfiniteScroll
        style={{}}
        contentContainerStyle={{ paddingBottom: 130 }}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        onLoadMoreAsync={loadMorePage}
      >
        
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => item.id}
          data={videosST}
          renderItem={item1 => (
            <SwiperFlatList
              keyExtractor={item => item.id}
              style={{ flex: 1 }}
              data={item1.item.media}
              renderItem={item2 => {
                console.log(item1.item, 'VideoTileVideoTile')
                return (
                  <VideoTile
                    VideoImage={item2.item.url}
                    _id={item2.item._id}
                    likes={item2.item.likesCount}
                    getDate={item2.item.createdAt}
                    mediaId={item2.item._id}
                    en_header={item1.item.en_header}
                    navigation={navigation}
                    likedByMe={item2.item.likedByMe}
                    onPress={() =>
                      navigation.navigate('videoPlay', {
                        videoURL: item2.item.url,
                        _id:item2.item._id
                      })
                    }
                  />
                )
              }
              }
            />
          )}
        />

        {
          (paginationLoader === true) ? (
            <View style={{
              justifyContent: 'center',
              alignItems: "center",
              // marginBottom: 20,
              // marginTop: 20,
            }}>
              <ActivityIndicator size="small" color={'black'} />
            </View>
          ) : null
        }
      </InfiniteScroll>
    </VideoContainer>
  );
};
