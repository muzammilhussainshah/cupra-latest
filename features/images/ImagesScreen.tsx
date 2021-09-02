import { useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, FlatList } from 'react-native';
import { _getNewsImages } from '../../store/action/imageAction'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from '../../components/Header';
import { StaticImages } from '../../data/StaticImages';
import { ImagesContainer, ImageTile, ImageTitle, ImageTitleWrapper } from './ImagesStyled';
import {  CommonActions, useIsFocused } from '@react-navigation/native';

export const ImagesScreen: React.FC = () => {
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const dispatch = useDispatch();
  const isFocused = useIsFocused()

  const [imagesArr, setImagesArr] = useState([])
  const [search, setsearch] = useState([]);

  const getNewsImages = useSelector((state: any) => state.reducer.getNewsImages)
  const navigation = useNavigation()
  useEffect(() => {
    dispatch(_getNewsImages(currentUser, 10, 1, navigation))
  }, [])
  

  useEffect(() => {
    console.log(getNewsImages,"getNewsImagesgetNewsImagesgetNewsImages")
    setImagesArr(getNewsImages)
  }, [getNewsImages])



  const searchUser: any = (e: any) => {
    let keywords = e.split(' ')
    setsearch(keywords)
    console.log('working fine')
    if (keywords[0] === "") {
      setImagesArr(getNewsImages)
    }
    if (keywords[0] !== "") {
      let searchPattern = new RegExp(keywords.map((term: any) => `(?=.*${term})`).join(''), 'i');
      let filterChat = [];
      for (let index = 0; index < getNewsImages.length; index++) {
        filterChat = getNewsImages.filter((data: any) => {
          return data.en_header.match(searchPattern) || data.ar_header.match(searchPattern)|| data.en_desc.match(searchPattern)|| data.ar_desc.match(searchPattern)
        });
      }
      setImagesArr(filterChat)
    }
  }

  return (
    <ImagesContainer>
      <Header 
        _func={(e: any) => {
          searchUser(e)
        }}
        searchBarInput={true}
      onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />

      <ImageTitleWrapper>
        <ImageTitle>Images</ImageTitle>
        <Ionicons name="filter-outline" size={30} color="#fff" />
      </ImageTitleWrapper>
      {imagesArr.length > 0 ?
        <FlatList
          contentContainerStyle={{ paddingBottom: 90 }}
          numColumns={2}
          style={{ flex: 1 }}

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
