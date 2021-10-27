import { useNavigation, DrawerActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, ActivityIndicator,Platform } from 'react-native';
import { _getNewsImages } from '../../store/action/imageAction'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from '../../components/Header';
import { StaticImages } from '../../data/StaticImages';
import { ImagesContainer, ImageTile, ImageTitle, ImageTitleWrapper } from './ImagesStyled';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import InfiniteScroll from 'react-native-infinite-scroll';

export const ImagesScreen: React.FC = () => {
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const isLoader = useSelector((state: any) => state.reducer.isLoader);
  const dispatch = useDispatch();
  const isFocused = useIsFocused()

  const [imagesArr, setImagesArr] = useState([])
  const [pagination, setpagination] = useState(2);
  const [isEmptyserch, setisEmptyserch] = useState(false)

  const [searchTxt, setsearchTxt] = useState('')
  const [search, setsearch] = useState([]);
  const paginationLoader = useSelector((state: any) => state.reducer.paginationLoader);

  const getNewsImages = useSelector((state: any) => state.reducer.getNewsImages)
  const navigation = useNavigation()
  useEffect(() => {
    dispatch(_getNewsImages(currentUser, 10, 1, navigation))
  }, [])


  useEffect(() => {
    console.log(getNewsImages, "getNewsImagesgetNewsImagesgetNewsImages")
    setImagesArr(getNewsImages)
  }, [getNewsImages])



  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setisEmptyserch(false)
      dispatch(_getNewsImages(currentUser, 10, 1, navigation))
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
      setImagesArr(getNewsImages)
    }
    if (keywords[0] !== "") {
     
      let searchPattern = new RegExp(keywords.map((term: any) => `(?=.*${term})`).join(''), 'i');
      let filterChat = [];
      for (let index = 0; index < getNewsImages.length; index++) {
        filterChat = getNewsImages.filter((data: any) => {
          return data.en_header.match(searchPattern) || data.ar_header.match(searchPattern) || data.en_desc.match(searchPattern) || data.ar_desc.match(searchPattern)
        });
      }
      setImagesArr(filterChat)
    }
  }

  const loadMorePage = () => {
    if (paginationLoader != true && searchTxt === "") {
      // _getNews(currentUser, pagination, freePotatoes)
      // dispatch(_getNews(currentUser, 10, pagination, filterdBy, navigation, true, getNews, setpagination))
      dispatch(_getNewsImages(currentUser, 10, pagination, navigation, getNewsImages, setpagination))

      // setpagination(pagination + 1)
    }

  }
  // useEffect(() => {
  //   return () => {
  //    setpagination(2)
  //   }
  // }, [])

  return (
    <ImagesContainer >
    {/* <ImagesContainer style={{paddingVertical:Platform.OS="ios"?-15:0}}> */}
      <Header
        isEmptyserch={isEmptyserch}
        _func={(e: any) => {
          searchUser(e)
          setsearchTxt(e)
        }}
        searchBarInput={true}
        notiScreen={() => navigation.navigate('notification')}
        onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />

      <ImageTitleWrapper>
        <ImageTitle>Images</ImageTitle>
        <Ionicons name="filter-outline" size={30} color="#fff" />
      </ImageTitleWrapper>
      {/* <InfiniteScroll
        style={{}}
        contentContainerStyle={{ paddingBottom: 130 }}

        showsHorizontalScrollIndicator={false}
        horizontal={false}
        onLoadMoreAsync={loadMorePage}
      > */}
        {isLoader ?
          <ActivityIndicator
            style={{ marginTop: "50%" }}
            size="small" color={'black'}
          /> :
          imagesArr.length > 0 ?
          <FlatList
            contentContainerStyle={{ paddingBottom: 90 }}
            numColumns={2}
            style={{ flex: 1 }}

            showsVerticalScrollIndicator={false}
            // keyExtractor={item => item.id}
            data={imagesArr && imagesArr}
            onEndReachedThreshold={0.4}
            onEndReached={loadMorePage}


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
          />
           : null
        }

        {
          (paginationLoader === true) ? (
            <View style={{
              justifyContent: 'center',
              alignItems: "center",
              marginBottom: 50,
              // marginTop: 50,
            }}>
              <ActivityIndicator size="small" color={'black'} />
              {/* <ActivityIndicator size="large" color={'black'} /> */}
            </View>
          ) : null
        }
      {/* </InfiniteScroll> */}


    </ImagesContainer>
  );
};
