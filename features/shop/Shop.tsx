import React, { useState, useEffect } from 'react';

import { FlatList, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SHOPSUBCATOGERY, } from "../../store/constant/constant";

import { Header } from '../../components/Header';
import { DrawerActions } from '@react-navigation/native';

import GetReviewComponent from '../../components/GetReviewComponent';

import { StaticShop } from '../../data/StaticShop';

import { HeaderTitle, ShopContainer, SubCategoryTile } from './ShopStyled';

import { _getCatogery, _getSubCatogery, _getItemDetails, _loading } from '../../store/action/shopAction';

import { useDispatch, useSelector } from 'react-redux';

import { Value } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const Shop: React.FC = ({ navigation, }: any) => {
  const [catogery, setcatogery] = useState([]);

  const [Subcatogery, setSubcatogery] = useState([]);

  const [search, setsearch] = useState([]);

  const [searchedItems, setsearchedItems] = useState([]);

  const [getReview, setgetReview] = useState(false);

  const [flag, setflag] = useState(false);

  const [isEmptyserch, setisEmptyserch] = useState(false);

  const dispatch = useDispatch();

  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const shopCatogery = useSelector((state: any) => state.reducer.shopCatogery)

  const shopSubCatogery = useSelector((state: any) => state.reducer.shopSubCatogery)

  const isLoader = useSelector(({ reducer }: any) => reducer.isLoader);


  useEffect(() => {
    dispatch(_getCatogery(currentUser, navigation))
  }, [])

  useEffect(() => {
    setcatogery(shopCatogery)
    setflag(!flag)
  }, [shopCatogery])

  useEffect(() => {
    setSubcatogery(shopSubCatogery)
    setflag(!flag)
  }, [shopSubCatogery])







  function removeDuplicates(data, key) {

    return [
      ...new Map(data.map(item => [key(item), item])).values()
    ]

  };


  const searchUser: any = async (e: any) => {
  dispatch(_loading(true))
    let keywords = e.split(' ')
    setsearch(keywords)
    if (keywords[0] === "") {
      setSubcatogery(shopSubCatogery)

    }
    if (keywords[0] !== "") {
      let searchPattern = new RegExp(keywords.map((term: any) => `(?=.*${term})`).join(''), 'i');
      let filterChat: any = [];
      let searchedItems: any;

      for (let index = 0; index < shopSubCatogery.length; index++) {
        // console.log(shopSubCatogery[index], "++++++++++++++++", shopSubCatogery)
        for (let j = 0; j < shopSubCatogery[index].items.length; j++) {
          // console.log(shopSubCatogery[j].items, "filterChatfilterChatfilterChat")
          if (shopSubCatogery[index].items[j].en_name.match(searchPattern)||shopSubCatogery[index].items[j].ar_name.match(searchPattern)) {
            filterChat.push(shopSubCatogery[index])
            // console.log("filterChatfilterChatfilterChat", Subcatogery[index])
          }

        }
      }
      // console.log(filterChat, "+++++++++++++++++++")
      searchedItems = await removeDuplicates(filterChat, item => item._id)
      setSubcatogery(searchedItems)
    }
    dispatch(_loading(false))

  }


  return (
    <>
      {/* {getReview &&
        <GetReviewComponent _func={() => setgetReview(false)} />
      } */}
      <ShopContainer>
        <Header
          isEmptyserch={isEmptyserch}
          _func={(e: any) => searchUser(e)}
          searchBarInput={true}
          onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())} />

        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

          <HeaderTitle>
            Find the Best
            Parts for your vehicle!
          </HeaderTitle>
          <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  >
              {catogery.length > 0 && catogery.map((item: any, index) => {
                // index === 1 && console.log(item, "sssssssssssss")
                return (
                  <TouchableOpacity key={index} onPress={() => {
                    setisEmptyserch(!isEmptyserch)
                    dispatch(_getSubCatogery(currentUser, item._id))
                    var cloneCatogery: any = catogery;
                    cloneCatogery.map((x: any) => {
                      x.isSelected = false;
                    });
                    cloneCatogery[index].isSelected = true
                    setcatogery(cloneCatogery);
                    setflag(!flag);
                  }}>
                    <Text style={{ marginHorizontal: 20, color: Colors.black, fontSize: 15 }}>{item.en_name}</Text>
                    {item.isSelected && <View style={{ marginHorizontal: 20, height: 3, backgroundColor: Colors.black, width: 10 }} />}
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
          {isLoader ?
            <ActivityIndicator
              style={{ marginTop: "50%" }}
              size="small" color={'black'}
            /> :
            Subcatogery.length > 0 && Subcatogery.map((v: any, i) => {
              // i === 5 && console.log(v, "sub catogeris in render")
              if (v.items.length > 0) {
                // console.log(v, "sub catogeris in render")
                return (
                  <>
                    <View>
                      <Text style={{ color: Colors.black, fontSize: 15, padding: 10 }}>‎{v.en_name}</Text>
                    </View>
                    <FlatList
                      contentContainerStyle={{}}
                      horizontal
                      showsVerticalScrollIndicator={false}
                      keyExtractor={item => item.id}
                      data={v.items}
                      renderItem={({ item }) => (
                        <>
                          {/* {console.log(item, 'itemitemitemitem')} */}
                          <SubCategoryTile
                            numberOfRates={item.total_rate}
                            numberOfService={item.stock_count}
                            serviceName={item.en_name}
                            navigation={navigation}
                            noOfLikes={item.likes}
                            serviceImage={{ uri: item.icon }}
                            price={item.price}
                            item_id={item._id}
                            likedByMe={item.likedByMe}
                            currentUser={currentUser}
                            rating={item.rating}
                            _func={() => setgetReview(true)}
                            // onPress={() => dispatch(_getItemDetails(currentUser, item._id, navigation,))}
                            onPress={() => navigation.navigate('shopDetail', item)}
                          />
                        </>
                      )}
                    />
                  </>
                )
              }
            })
          }
        </ScrollView>
      </ShopContainer>
    </>

  )
}