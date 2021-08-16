import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from '../../components/Header';
import { StaticImages } from '../../data/StaticImages';
import { ImagesContainer, ImageTile, ImageTitle, ImageTitleWrapper } from './ImagesStyled';

export const ImagesScreen: React.FC = () => {
  const navigation = useNavigation()
  return (
    <ImagesContainer>
      <Header onOpenDrawer={() => { }} />
      <ImageTitleWrapper>
        <ImageTitle>Images</ImageTitle>
        <Ionicons name="filter-outline" size={30} color="#fff" />
      </ImageTitleWrapper>
      <FlatList
        contentContainerStyle={{ paddingBottom: 90 }}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={StaticImages?.map(user => user)}
        renderItem={({ item }) => (
          <ImageTile
            imageUri={item.uri}
            onPress={() => navigation.navigate('showImage', { imageURL: item.uri })}
          />
        )}
      />
    </ImagesContainer>
  );
};
