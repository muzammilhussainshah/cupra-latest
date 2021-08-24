import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from '../../components/Header';
import { _getNewsImages } from '../../store/action/imageAction'
import { StaticImages } from '../../data/StaticImages';
import { ImagesContainer, ImageTile, ImageTitle, ImageTitleWrapper } from './ImagesStyled';

export const ImagesScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [imagesArr, setImagesArr] = useState([])

  const getNewsImages = useSelector((state: any) => state.reducer.getNewsImages)
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const navigation = useNavigation()
  useEffect(() => {
    dispatch(_getNewsImages(currentUser, 10, 1, navigation))
  }, [])
  useEffect(() => {
    // dispatch(_getNewsImages(currentUser, 10, 1,navigation))
    // console.log(getNewsImages, 'getNewsImages')
    setImagesArr(getNewsImages)
  }, [getNewsImages])
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
        data={getNewsImages}
        renderItem={({ item }) => (
          <>
            {console.log(item, ';;;;;;;;;;;;;;;qqqqqqq')}
            < ImageTile
              imageUri={item.media && item.media}
            // onPress={() => navigation.navigate('showImage', { imageURL: item.uri })}
            />
          </>
        )}
      />
    </ImagesContainer>
  );
};
