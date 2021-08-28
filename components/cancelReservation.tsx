import React, { useState } from 'react';

import { PressableProps, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';

import { Text, View } from 'react-native-animatable';

import FastImage from 'react-native-fast-image';
// import { ScrollView } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { height, width } from '../constants/Layout';
import { Colors } from '../constants/Colors';

export type CancelReservationprops = PressableProps & {
  _func?: Function;
  _func2?: Function;
  Title?: string;
  cancelReservation?: boolean;
};

/**
 * Wraps `Pressable` with "touchable" styles
 *
 * @param props {@link PressableProps}
 */
export const CancelReservation: React.FunctionComponent<CancelReservationprops> = ({ _func, Title, _func2 }: any) => {
  const isLoader = useSelector((state: any) => state.reducer.isLoader);
  const isError = useSelector((state: any) => state.reducer.isError);
  const [reason, setreason] = useState('');

  return (
    <TouchableOpacity
      onPress={() => _func()}
      style={{ height: "100%", width: "100%", justifyContent: "center", backgroundColor: 'rgba(0,0,0,0.9)', alignItems: "center", position: "absolute", zIndex: 2 }}>
      <ScrollView>
        <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center" }}>

          <TouchableOpacity
            activeOpacity={1}
            style={{ height: "40%", borderWidth: 2, borderColor: Colors.primary, backgroundColor: Colors.black, width: "80%", paddingVertical: 5, borderRadius: 20 }}>
            <View style={{ flex: 2, justifyContent: "center", alignItems: "center", }}>
              <FastImage style={{ width: "75%", height: '75%' }} source={require('../assets/logo.png')} resizeMode={FastImage.resizeMode.contain} />
            </View>

            <View style={{ flex: 2, justifyContent: "center", alignItems: "center", }}>
              <Text style={{ maxWidth: "100%", color: Colors.white }}>
                {Title}
              </Text>
            </View>
            <View style={{ flex: 6, justifyContent: "space-evenly", alignItems: "center" }}>
              <TextInput

                style={{ width: "80%", paddingHorizontal: 10, maxHeight: "50%", borderWidth: 1, color: Colors.titleGray, borderColor: Colors.primary }}
                onChangeText={text => setreason(text)}
                defaultValue={reason}
                multiline={true}
                placeholder="Enter Reason"
                placeholderTextColor={Colors.titleGray}
              />
              <View style={{ flexDirection: "row", justifyContent: 'space-evenly', width: "100%" }}>

                <TouchableOpacity
                  onPress={() => _func()}
                  style={{ paddingHorizontal: 10, width: 100, marginTop: 10, justifyContent: "center", alignItems: "center", height: 40, borderRadius: 5, backgroundColor: Colors.primary }}>
                  <Text style={{ color: Colors.white }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => _func2(reason)}
                  style={{ paddingHorizontal: 10, width: 100, marginTop: 10, justifyContent: "center", alignItems: "center", height: 40, borderRadius: 5, backgroundColor: Colors.primary }}>
                  <Text style={{ color: Colors.white }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>

          </TouchableOpacity >
        </View>
      </ScrollView>

    </TouchableOpacity >
  );
};

export default CancelReservation;
