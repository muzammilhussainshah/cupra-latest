import React, { useState } from 'react';

import { PressableProps, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

import { Text, View, } from 'react-native-animatable';

import { Header } from '../components/Header';

import { submitReview } from '../store/action/shopAction';

import { useDispatch, useSelector } from 'react-redux';

import FastImage from 'react-native-fast-image';

import styled from 'styled-components/native';

import { Colors } from '../constants/Colors';

const SteeringImage: any = styled(FastImage)`
  width: 15px;
  height: 15px;
  margin-right:10px
  `;
export type ReviewComponent = PressableProps & {
  _func2?: Function;
  coverImage?: any;
  itemName?: string;
  _id?: string;
  selectedImageIndex?: number;
};

/**
 * Wraps `Pressable` with "touchable" styles
 *
 * @param props {@link PressableProps}
 */
export const ReviewComponent: React.FunctionComponent<ReviewComponent> = ({ _func2, _id, itemName }: any) => {
  const [numberOfReview, setnumberOfReview] = useState(0)
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.reducer.currentUser)

  const isLoader = useSelector((state: any) => state.reducer.isLoader);
  const isError = useSelector((state: any) => state.reducer.isError);


  console.log(isError, 'isErrorisErrorisErrorisError')

  return (

    <View
      style={{ height: "100%", width: "100%", backgroundColor: Colors.black, position: "absolute", zIndex: 2 }}>
      <View style={{ height: "20%", justifyContent: "center" }}>
        <Header isGoBack={true} RatingScreen={true} navigateBack={() => _func2()} />
      </View>
      <View style={{
        flex: 8, alignItems: "center", borderColor: Colors.brownishGrey, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30,
      }}>
         
      </View>
    </View >
  );
};

export default ReviewComponent;
