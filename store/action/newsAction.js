import { SIGNUPUSER, CURRENTUSER, ISLOADER, ISERROR, GETNEWS, NEWSITEMDETAILS } from "../constant/constant";
import axios from 'axios';
// import DeviceInfo from 'react-native-device-info';
// import BaseUrl from '../../common/BaseUrl';
// import { Actions } from 'react-native-router-flux'; 
// import AsyncStorage from '@react-native-community/async-storage';
// import firestore from '@react-native-firebase/firestore'; 
import { _logOut } from './authAction';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import auth from "@react-native-firebase/auth";

import { Alert, AsyncStorage } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';


export const _loading = (bol) => {
    return dispatch => {
        dispatch({ type: ISLOADER, payload: bol });
    }
}

export function _error(err, time) {
    return dispatch => {
        dispatch({ type: ISERROR, payload: err });

        setTimeout(() => {
            dispatch({ type: ISERROR, payload: "" });
        }, time ? time : 3000)
    }
}

export const _checkIsEmptyObj = (obj) => {
    for (var key in obj) {
        if (!obj[key]) {
            // console.log(key + " is blank. Deleting it");
            return key
        }
    }
}
export const _getAdds = (currentUser, navigation, filterd_by) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        // console.log(deviceToken, 'deviceToken', model)
        console.log(uniqueId, 'uniqueId')
        console.log(deviceToken, 'uniqueId')
        console.log(currentUser, 'currentUser')
        dispatch(_loading(true));
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/ads?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`

                },
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {

                dispatch(_loading(false));
                dispatch(_getNews(currentUser, 10, 1, filterd_by, navigation));
                // dispatch(_loading(false));
                // console.log(resp, 'resp _getAdds')

            } else if (resp.data.error.messageEn === "You Are Unauthorized") {
                dispatch(_loading(false));
                Alert.alert(
                    "Authentication!",
                    "You Are Unauthorized Please Login.",
                    [
                        { text: "OK", onPress: () => dispatch(_logOut(navigation)) }
                    ]
                );
            }
            else {
                dispatch(_error(resp.data.error.messageEn));
                dispatch(_loading(false));
            }

            console.log(resp, 'resp _getAdds')
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));

            console.log(err.response, "error from _getAdds", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _getNews = (currentUser, page_size, page_index, filterd_by, navigation) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        // console.log(deviceToken, 'deviceToken', model)
        console.log(uniqueId, 'uniqueId')
        console.log(deviceToken, 'uniqueId')
        dispatch(_loading(true));
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/news?deviceToken=${deviceToken}&deviceKey=${uniqueId}&page_size=${page_size}&page_index=${page_index}&filterd_by=${filterd_by}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`

                },
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch({ type: GETNEWS, payload: resp.data.data })
                // console.log(resp, 'resp _getAdds')
                dispatch(_loading(false));

            } else if (resp.data.error.messageEn === "You Are Unauthorized") {
                dispatch(_loading(false));
                Alert.alert(
                    "Authentication!",
                    "You Are Unauthorized Please Login.",
                    [
                        { text: "OK", onPress: () => dispatch(_logOut(navigation)) }
                    ]
                );
            }
            else {
                dispatch(_error(resp.data.error.messageEn));
                dispatch(_loading(false));
            }

            console.log(resp, 'resp _getNews')
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));

            console.log(err.response, "error from _getNews", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _likeDisLike = (currentUser, news_id, navigation) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        console.log(uniqueId, 'uniqueId')
        console.log(deviceToken, 'uniqueId')
        try {
            const option = {
                method: 'POST',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/news-like?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`

                },
                data: {
                    "news_id": news_id.toString(),
                }
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {

            } else if (resp.data.error.messageEn === "You Are Unauthorized") {
                Alert.alert(
                    "Authentication!",
                    "You Are Unauthorized Please Login.",
                    [
                        { text: "OK", onPress: () => dispatch(_logOut(navigation)) }
                    ]
                );
            }
            else {
                dispatch(_error(resp.data.error.messageEn));
            }
            console.log(resp, 'resp _likeDisLike')
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from _likeDisLike", JSON.parse(JSON.stringify(err.message)));
        }
    }
}



export const _getNewsItemDetails = (currentUser, itemId, navigation,) => {
    // console.log(itemLikes, 'item.likesitem.likesv')
    return async (dispatch) => {
        dispatch({ type: NEWSITEMDETAILS, payload: {} })
        dispatch(_loading(true));
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            let url = `https://cupranationapp.herokuapp.com/apis/mobile/news/${itemId}?deviceToken=${deviceToken}&deviceKey=${uniqueId}&id=${itemId}`
            const option = {
                method: 'GET',
                url,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`
                },
            };
            var resp = await axios(option);
            // console.log(resp, '_getNEWSITEMDETAILS')
            if (resp.data.status === 200) {
                dispatch({ type: NEWSITEMDETAILS, payload: resp.data.data })
                // navigation.push('shopDetail', resp.data.data,)
            }
            else if (resp.data.error.messageEn === "You Are Unauthorized") {
                Alert.alert(
                    "Authentication!",
                    "You Are Unauthorized Please Login.",
                    [
                        { text: "OK", onPress: () => dispatch(_logOut(navigation)) }
                    ]
                );
            }
            console.log(resp, 'resp _getNewsItemDetails',)
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            // dispatch(_error(resp.data.error.messageEn));
            console.log(err.response, "error from _getNewsItemDetails", JSON.parse(JSON.stringify(err.message)));
        }
    }
}