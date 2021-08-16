import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header';
import { StaticShop } from '../../data/StaticShop';
import { HeaderTitle, ShopContainer, SubCategoryTile } from './ShopStyled';
import { _getCatogery } from '../../store/action/shop';
import { useDispatch,useSelector } from 'react-redux';

export const Shop: React.FC = ({ navigation }: any) => {
  const [catogery, setcatogery] = useState([{ item: 0, isSelected: true }, { item: 0, isSelected: false }, { item: 0, isSelected: false }, { item: 0, isSelected: false }]);
  const [flag, setflag] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.reducer.currentUser)




  useEffect(() => {
    dispatch(_getCatogery(currentUser)) 
  },[])






  return (
    <ShopContainer>
      <Header />
      <HeaderTitle>
        Find the Best
        Parts for your vehicle!
      </HeaderTitle>
      <View>

        <ScrollView horizontal={true}>
          {catogery.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => {
                var cloneCatogery = catogery;
                cloneCatogery.map((x) => {
                  x.isSelected = false;
                  // return x
                });
                cloneCatogery[index].isSelected = true
                setcatogery(cloneCatogery);
                setflag(!flag);
              }}>
                <Text style={{ marginLeft: 35, color: '#fb9315', fontSize: 15 }}>Oil</Text>
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
