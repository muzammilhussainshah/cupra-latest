import {ISLOADER, ISERROR, VIDEOS} from '../constant/constant';
import axios from 'axios';
import {_logOut} from './authAction';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';

import {Alert, AsyncStorage} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';

export const _loading = bol => {
  return dispatch => {
    dispatch({type: ISLOADER, payload: bol});
  };
};

export function _error(err, time) {
  return dispatch => {
    dispatch({type: ISERROR, payload: err});

    setTimeout(
      () => {
        dispatch({type: ISERROR, payload: ''});
      },
      time ? time : 3000,
    );
  };
}

export function _dispatchVideos(payload) {
  return dispatch => {
    dispatch({type: VIDEOS, payload});
  };
}

export function _getVideos(currentUser, navigation) {
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    // console.log(deviceToken, 'deviceToken', model)
    dispatch(_loading(true));
    try {
      const option = {
        method: 'GET',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/news-videos`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `${currentUser.token}`,
        },
      };
      var resp = await axios(option);
      console.log('🚀 ~ file: videoAction.js ~ line 56 ~ resp', resp);
      if (resp.data.status === 200) {
        dispatch(_loading(false));
        dispatch(_dispatchVideos(resp.data.data));
        // dispatch(_loading(false));
        // console.log(resp, 'resp _getAdds')
      } else if (resp.data.error.messageEn === 'You Are Unauthorized') {
        dispatch(_loading(false));
        // Alert.alert('Authentication!', 'You Are Unauthorized Please Login.', [
        //   {text: 'OK', onPress: () => dispatch(_logOut(navigation))},
        // ]);
      } else {
        dispatch(_error(resp.data.error.messageEn));
        dispatch(_loading(false));
      }

      dispatch(_loading(false));
    } catch (err) {
      console.log(err,"_getVideos")
      dispatch(_loading(false));
    }
  };
}
