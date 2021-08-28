import { useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { _getNewsImages } from '../../store/action/imageAction'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from '../../components/Header';
import { StaticImages } from '../../data/StaticImages';
import { ImagesContainer, ImageTile, ImageTitle, ImageTitleWrapper } from './ImagesStyled';

export const ImagesScreen: React.FC = () => {
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const dispatch = useDispatch();
  const [imagesArr, setImagesArr] = useState([])

  const getNewsImages = useSelector((state: any) => state.reducer.getNewsImages)
  const navigation = useNavigation()
  useEffect(() => {
    dispatch(_getNewsImages(currentUser, 10, 1, navigation))
  }, [])

  useEffect(() => {
    setImagesArr(getNewsImages)
  }, [getNewsImages])
  return (
    <ImagesContainer>
      <Header onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />

      <ImageTitleWrapper>
        <ImageTitle>Images</ImageTitle>
        <Ionicons name="filter-outline" size={30} color="#fff" />
      </ImageTitleWrapper>
      {imagesArr.length > 0 ?
        <FlatList
          contentContainerStyle={{ paddingBottom: 90 }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          // keyExtractor={item => item.id}
          data={imagesArr && imagesArr}
          renderItem={({ item, index }: any) => (
            <>
              < ImageTile
                allData={item}
                getNewsImages={imagesArr}
                indexOfNewsMainImages={index}
                imageUri={item.media && item.media[0].url}
              />
            </>
          )}
        /> : null
      }
    </ImagesContainer>
  );
};
