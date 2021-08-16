import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header';
import { StaticShop } from '../../data/StaticShop';
import { HeaderTitle, ShopContainer, SubCategoryTile } from './ShopStyled';
import { _getCatogery } from '../../store/action/shopAction';
import { useDispatch, useSelector } from 'react-redux';

export const Shop: React.FC = ({ navigation }: any) => {
  const [catogery, setcatogery] = useState([]);
  const [flag, setflag] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const shopCatogery = useSelector((state: any) => state.reducer.shopCatogery)




  useEffect(() => {
    dispatch(_getCatogery(currentUser))
  }, [])

  useEffect(() => {
    setcatogery(shopCatogery)
    setflag(!flag)
    // console.log(shopCatogery, "shopCatogeryshopCatogeryshopCatogeryshopCatogery")
  }, [shopCatogery])






  return (
    <ShopContainer>
      <Header />
      <HeaderTitle>
        Find the Best
        Parts for your vehicle!
      </HeaderTitle>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
          {catogery.length>0 && catogery.map((item: any, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => {
                var cloneCatogery: any = catogery;
                cloneCatogery.map((x: any) => {
                  x.isSelected = false;
                  // return x
                });
                cloneCatogery[index].isSelected = true
                setcatogery(cloneCatogery);
                setflag(!flag);
              }}>
                <Text style={{ marginLeft: 35, color: '#fb9315', fontSize: 15 }}>{item.en_name}</Text>
                {item.isSelected && <View style={{ marginLeft: 35, height: 3, backgroundColor: '#fb9315', width: 10 }} />}
              </TouchableOpacity>
            )
          })}


        </ScrollView>
      </View>

      <View>
        <Text style={{ color: '#fff', fontSize: 15, padding: 10 }}>Sub Category 1</Text>
      </View>
      <FlatList
        contentContainerStyle={{}}
        horizontal
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={StaticShop?.map(user => user)}
        renderItem={({ item }) => (
          <SubCategoryTile
            numberOfRates={item.rate}
            numberOfService={item.remaining}
            serviceName={item.service_name}
            serviceImage={item.uri}
            price={item.price}
            onPress={() => navigation.push('shopDetail', item)}
          />
        )}
      />

    </ShopContainer>
  )
}