import React, { useState } from 'react';

import { PressableProps, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

import { Text, View, } from 'react-native-animatable';

import { Header } from './Header';

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
export type GetReviewComponent = PressableProps & {
  _func?: Function;
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
export const GetReviewComponent: React.FunctionComponent<GetReviewComponent> = ({ _func, _id, itemName }: any) => {
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
        <Header isGoBack={true} RatingScreen={true} navigateBack={() => _func()} />
      </View>
      <View style={{
        flex: 8, alignItems: "center", borderColor: Colors.brownishGrey, borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30,
      }}>
        <Text style={{ color: Colors.white, marginVertical: 50 }}>{'asdasd'}</Text>
        <Text style={{ color: Colors.white }}>What Do you think this item rate should be?</Text>
        <View style={{ flexDirection: "row", marginVertical: 30 }}>
          <TouchableOpacity
            onPress={() => setnumberOfReview(1)}
          >
            <FastImage
              tintColor={numberOfReview <= 0 ? "#ffffff" : Colors.primary}

              source={require('../assets/images/RealStar.png')}
              style={{ height: 15, width: 15, marginHorizontal: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setnumberOfReview(2)}
          >
            <FastImage
              tintColor={numberOfReview <= 1 ? "#ffffff" : Colors.primary}
              source={require('../assets/images/RealStar.png')}
              style={{ height: 15, width: 15, marginHorizontal: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setnumberOfReview(3)}
          >
            <FastImage
              tintColor={numberOfReview <= 2 ? "#ffffff" : Colors.primary}
              source={require('../assets/images/RealStar.png')}
              style={{ height: 15, width: 15, marginHorizontal: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setnumberOfReview(4)}
          >
            <FastImage
              tintColor={numberOfReview <= 3 ? "#ffffff" : Colors.primary}
              source={require('../assets/images/RealStar.png')}
              style={{ height: 15, width: 15, marginHorizontal: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setnumberOfReview(5)}
          >
            <FastImage
              tintColor={numberOfReview <= 4 ? "#ffffff" : Colors.primary}
              source={require('../assets/images/RealStar.png')}
              style={{ height: 15, width: 15, marginHorizontal: 5 }} />
          </TouchableOpacity>
        </View>

        {isLoader ?
          <ActivityIndicator
            style={{ marginTop: "5%" }}
            size="small" color={'#ffffff'}
          /> :
          <TouchableOpacity
            onPress={() => {
              dispatch(submitReview(_id, numberOfReview, currentUser, _func))
            }}
            style={{ height: 40, justifyContent: "center", alignItems: "center", borderRadius: 10, width: 110, backgroundColor: Colors.primary }}>
            <Text style={{ color: Colors.white }}>Submit Review</Text>
          </TouchableOpacity>
        }
        {isError !== "" &&
          <Text style={{ color: "red", fontSize: 12, marginTop: 5, alignSelf: "center" }}>{isError}
          </Text>}


      </View>
    </View >
  );
};

export default GetReviewComponent;
