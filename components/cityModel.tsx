import React, { useEffect, useState } from 'react';

import { PressableProps, TouchableOpacity, ActivityIndicator, Text, View, ScrollView, FlatList } from 'react-native';

// import { Text, View } from 'react-native-animatable';

import FastImage from 'react-native-fast-image';

import { useDispatch, useSelector } from 'react-redux';

import { Colors } from '../constants/Colors';

export type CityModelprops = PressableProps & {
  _func?: Function;
  _func2?: Function;
  Title?: string;
  yearModal?: any;
  brandModal?: any;
  modalModel?: any;
};

/**
 * Wraps `Pressable` with "touchable" styles
 *
 * @param props {@link PressableProps}
 */
export const CityModel: React.FunctionComponent<CityModelprops> = ({ _func, Title, _func2, brandModal, modalModel, yearModal }: any) => {
  const [cities, setCities] = useState([])
  const [models, setModels] = useState([])
  const [brands, setbrands] = useState([])
  const [year, setyear] = useState([])
  const yearClone: any = []

  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const isLoader = useSelector((state: any) => state.reducer.isLoader);
  if (brandModal) {
    const getBrands = useSelector((state: any) => state.reducer.getBrands);
    useEffect(() => {
      setbrands(getBrands)
      // console.log(getBrands, 'getBrands')
    }, [getBrands])

  } else if (modalModel) {
    const getModels = useSelector((state: any) => state.reducer.getModels);
    useEffect(() => {
      setModels(getModels)
      console.log(getModels, 'getModels')
    }, [getModels])
  } else if (yearModal) {
    for (let index = 1980; index <= 2050; index++) {
      yearClone.push(index)
    }
  } else {
    const getCity = useSelector((state: any) => state.reducer.getCity);
    useEffect(() => {
      setCities(getCity)
      console.log(getCity, '555555555555')
    }, [getCity])
  }
  return (
    <View
      style={{ height: "100%", width: "100%", justifyContent: "center", backgroundColor: 'rgba(0,0,0,0.9)', alignItems: "center", position: "absolute", zIndex: 2 }}>
      <View
        style={{ height: "80%", marginTop: 20, borderWidth: 2, borderColor: Colors.primary, backgroundColor: Colors.black, width: "80%", borderRadius: 20 }}>
        <View style={{ flex: 1.5, flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
          <TouchableOpacity
            onPress={() => _func({ "brands": '', "modalName": '' })}
            activeOpacity={0.7}>
            <FastImage
              style={{ height: 25, width: 25 }}
              resizeMode={FastImage.resizeMode.contain}
              source={require('../assets/images/back.png')}
            />
          </TouchableOpacity>
          <FastImage style={{ width: "75%", height: '75%' }} source={require('../assets/logo.png')} resizeMode={FastImage.resizeMode.contain} />
        </View>
        <View style={{ flex: 8.5, }}>
          {isLoader ?
            <ActivityIndicator
              style={{ marginTop: "50%" }}
              size="small" color={'#ffffff'}
            /> :
            <>
              {cities && cities.length > 1 &&
                <FlatList
                  data={cities && cities}
                  renderItem={({ item }: any) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          _func({ "cityName": item.en_name, 'cityId': item._id })
                        }}
                        style={{ flexDirection: "row", padding: 20 }}>
                        <Text style={{ color: Colors.white, fontSize: 20, }}>{item.en_name}</Text>
                      </TouchableOpacity>
                    )
                  }}
                />
              }
              {models && models.length > 1 &&
                <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
                  <FlatList
                    data={models && models}
                    renderItem={({ item }: any) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            _func({ "modalName": item.en_name, 'modalId': item._id })
                          }}
                          style={{ flexDirection: "row", padding: 20 }}>
                          <Text style={{ color: Colors.white, fontSize: 20, }}>{item.en_name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </ScrollView>
              }
              {brands && brands.length > 1 &&
                <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
                  <FlatList
                    data={brands && brands}
                    renderItem={({ item }: any) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            _func({ "brands": item.en_name, 'brandId': item._id })
                          }}
                          style={{ flexDirection: "row", padding: 20 }}>
                          <Text style={{ color: Colors.white, fontSize: 20, }}>{item.en_name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </ScrollView>
              }
              {yearClone && yearClone.length > 1 &&
                <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
                  <FlatList
                    data={yearClone}
                    renderItem={({ item }: any) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            _func({ "year": item })
                          }}
                          style={{ flexDirection: "row", padding: 20 }}>
                          <Text style={{ color: Colors.white, fontSize: 20, }}>{item}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </ScrollView>
              }
            </>

          }

        </View>
      </View >
    </View >
  );
};

export default CityModel;
