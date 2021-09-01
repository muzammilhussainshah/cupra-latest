import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import {
  VideoContainer,
  VideoTile,
  VideoTitle,
  VideoTitleWrapper,
} from './VideoStyled';
import { View, Dimensions, FlatList } from 'react-native';
import { StaticVideos } from '../../data/StaticVideos';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { _getVideos } from '../../store/action/videoAction';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export const VideoScreen: React.FC = () => {
  const navigation = useNavigation();
  const currentUser = useSelector((state: any) => state.reducer.currentUser);
  const videos = useSelector((state: any) => state.reducer.videos);
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');

  useEffect(() => {
    dispatch(_getVideos(currentUser, navigation));
  }, []);
  console.log(videos, 'videosvideosvideosvideos')
  return (
    <VideoContainer>
      <Header onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />

      <VideoTitleWrapper>
        <VideoTitle>Videos</VideoTitle>
        <Ionicons name="filter-outline" size={30} color="#fff" />
      </VideoTitleWrapper>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={videos}
        renderItem={item1 => (
          <SwiperFlatList
            keyExtractor={item => item.id}
            style={{ flex: 1 }}
            data={item1.item.media}
            renderItem={item2 => {
              console.log(item1,  'item2item2item2item2item2item2item2item2item2item2item2item2')
              return (
                <VideoTile
                  VideoImage={item2.item.url}
                  likes={item2.item.likesCount}
                  getDate={item2.item.createdAt}
                  mediaId={item2.item._id}
                  navigation={navigation}
                  likedByMe={item2.item.likedByMe}
                  onPress={() =>
                    navigation.navigate('videoPlay', {
                      videoURL: item2.item.url,
                    })
                  }
                />
              )
            }
            }
          />
        )}
      />
    </VideoContainer>
  );
};
