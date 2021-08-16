import React from 'react';
import { Header } from '../../components/Header';
import { VideoContainer, VideoTile, VideoTitle, VideoTitleWrapper } from './VideoStyled';
import { View, Button, FlatList } from 'react-native';
import { StaticVideos } from '../../data/StaticVideos';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const VideoScreen: React.FC = () => {
  const navigation = useNavigation()
  return (
    <VideoContainer>
      <Header onOpenDrawer={() => { }} />
      <VideoTitleWrapper>
        <VideoTitle>Videos</VideoTitle>
        <Ionicons name="filter-outline" size={30} color="#fff" />
      </VideoTitleWrapper>
      <FlatList
        contentContainerStyle={{ paddingBottom: 90 }}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={StaticVideos?.map(user => user)}
        renderItem={({ item }) => (
          <VideoTile
            VideoImage={item.uri}
            onPress={() => navigation.navigate('videoPlay', { videoURL: 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4' })}
          />
        )}
      />
    </VideoContainer>
  )
}
