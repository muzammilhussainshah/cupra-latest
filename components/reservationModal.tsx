import React from 'react';

import { PressableProps, TouchableOpacity } from 'react-native';

import { Text, View } from 'react-native-animatable';

import FastImage from 'react-native-fast-image';

import { Colors } from '../constants/Colors';

export type ReservationModalprops = PressableProps & {
  _func?: Function;
  _func2?: Function;
  Title?: string;
};

/**
 * Wraps `Pressable` with "touchable" styles
 *
 * @param props {@link PressableProps}
 */
export const ReservationModal: React.FunctionComponent<ReservationModalprops> = ({ _func, Title, _func2 }: any) => {
  return (
    <TouchableOpacity
      onPress={() => _func()}
      style={{ height: "100%", width: "100%", justifyContent: "center", backgroundColor: 'rgba(0,0,0,0.9)', alignItems: "center", position: "absolute", zIndex: 2 }}>

      <TouchableOpacity
        activeOpacity={1}
        style={{ height: "40%", borderWidth: 2, borderColor: Colors.primary, backgroundColor: Colors.black, width: "70%", borderRadius: 20 }}>
        <View style={{ flex: 2, justifyContent: "center", alignItems: "center", }}>
          <FastImage style={{ width: "75%", height: '75%' }} source={require('../assets/logo.png')} resizeMode={FastImage.resizeMode.contain} />
        </View>

        <View style={{ flex: 2, justifyContent: "center", alignItems: "center", }}>
          <Text style={{ fontSize: 12.5, color: Colors.white }}>
            {Title}
          </Text>
        </View>

        <View style={{ flex: 6, flexDirection: "row", justifyContent: "space-evenly", }}>
          {Title == "Are you sure you want to make this reservation?" ?
            <>
              <TouchableOpacity
                onPress={() => _func2()}
                style={{ width: "35%", marginTop: 10, justifyContent: "center", alignItems: "center", height: 40, borderRadius: 5, backgroundColor: Colors.primary }}>
                <Text style={{ color: Colors.white }}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => _func()}
                style={{ width: "35%", marginTop: 10, justifyContent: "center", alignItems: "center", height: 40, borderRadius: 5, backgroundColor: Colors.primary }}>
                <Text style={{ color: Colors.white }}>Cancel</Text>
              </TouchableOpacity>
            </>
            :
            <TouchableOpacity
              onPress={() => _func()}
              style={{ width: "35%", marginTop: 10, justifyContent: "center", alignItems: "center", height: 40, borderRadius: 5, backgroundColor: Colors.primary }}>
              <Text style={{ color: Colors.white }}>Okay</Text>
            </TouchableOpacity>
          }
        </View>

      </TouchableOpacity >
    </TouchableOpacity >
  );
};

export default ReservationModal;
