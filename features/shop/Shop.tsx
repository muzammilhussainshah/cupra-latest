import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Header } from '../../components/Header';
import { StaticShop } from '../../data/StaticShop';
import { HeaderTitle, ShopContainer, SubCategoryTile } from './ShopStyled';
import { _getCatogery, _getSubCatogery, _getItemDetails } from '../../store/action/shopAction';
import { useDispatch, useSelector } from 'react-redux';
import { Value } from 'react-native-reanimated';

export const Shop: React.FC = ({ navigation }: any) => {
  const [catogery, setcatogery] = useState([]);
  const [Subcatogery, setSubcatogery] = useState([]);
  const [flag, setflag] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const shopCatogery = useSelector((state: any) => state.reducer.shopCatogery)
  const shopSubCatogery = useSelector((state: any) => state.reducer.shopSubCatogery)
  const isLoader = useSelector(({ reducer }: any) => reducer.isLoader);
  // console.log(Subcatogery, 'Subcatogery')
  useEffect(() => {
    dispatch(_getCatogery(currentUser))
  }, [])

  useEffect(() => {
    setcatogery(shopCatogery)
    setflag(!flag)
  }, [shopCatogery])

  useEffect(() => {
    setSubcatogery(shopSubCatogery)
    setflag(!flag)
  }, [shopSubCatogery])

  return (
    <ShopContainer>
      <Header />
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
                  dispatch(_getSubCatogery(currentUser, item._id))
                  var cloneCatogery: any = catogery;
                  cloneCatogery.map((x: any) => {
                    x.isSelected = false;
                  });
                  cloneCatogery[index].isSelected = true
                  setcatogery(cloneCatogery);
                  setflag(!flag);
                }}>
                  <Text style={{ marginHorizontal: 20, color: '#fb9315', fontSize: 15 }}>{item.en_name}</Text>
                  {item.isSelected && <View style={{ marginHorizontal: 20, height: 3, backgroundColor: '#fb9315', width: 10 }} />}
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
        {isLoader ?
          <ActivityIndicator
            style={{ marginTop: "50%" }}
            size="small" color={'#ffffff'}
          /> :
          Subcatogery.length > 0 && Subcatogery.map((v: any, i) => {
            // i === 5 && console.log(v, "sub catogeris in render")
            if (v.items.length > 0) {
              // console.log(v.en_name, "sub catogeris in render")
              return (
                <>
                  <View>
                    <Text style={{ color: '#fff', fontSize: 15, padding: 10 }}>‎{v.en_name}</Text>
                  </View>
                  <FlatList
                    contentContainerStyle={{}}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    data={v.items}
                    renderItem={({ item }) => (
                      <>
                        {/* {console.log(item.likes, 'itemitemitemitem')} */}
                        <SubCategoryTile
                          numberOfRates={item.total_rate}
                          numberOfService={item.stock_count}
                          serviceName={item.en_name}
                          noOfLikes={item.likes}
                          serviceImage={{ uri: item.icon }}
                          price={item.price}
                          onPress={() => dispatch(_getItemDetails(currentUser, item._id, navigation,))}
                        // onPress={() => navigation.push('shopDetail', item)}
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
  )
}