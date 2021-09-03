import { ISLOADER, ISERROR, CONTACTUSINFO, COMPANYPOLICY, NOTIFICATION, COMPANYREVIEWS } from "../constant/constant";
import { _logOut } from './authAction';
import axios from 'axios';
// import DeviceInfo from 'react-native-device-info';
// import BaseUrl from '../../common/BaseUrl';
// import { Actions } from 'react-native-router-flux'; 
// import AsyncStorage from '@react-native-community/async-storage';
// import firestore from '@react-native-firebase/firestore'; 
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import auth from "@react-native-firebase/auth";

import { Alert, AsyncStorage } from 'react-native';


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
export const _getcomponyInfo = (currentUser, navigation,) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        dispatch(_loading(true));
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/company-info?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`

                },
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch({ type: CONTACTUSINFO, payload: resp.data.data })
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
            console.log(resp, 'resp _getcomponyInfo',)
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from _getcomponyInfo", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _getPrivacyPolicy = (currentUser, navigation,) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        dispatch(_loading(true));
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/company-policy?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`

                },
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch({ type: COMPANYPOLICY, payload: resp.data.data })
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
            console.log(resp, 'resp _getPrivacyPolicy',)
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from _getPrivacyPolicy", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _getNotification = (currentUser, navigation,) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        dispatch(_loading(true));
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/notification?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`

                },
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch({ type: NOTIFICATION, payload: resp.data.data })
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
            console.log(resp, 'resp _getNotification',)
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from _getNotification", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _getCompanyReviews = (currentUser, page_size, page_index, navigation) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        dispatch(_loading(true));
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/company-review?deviceToken=${deviceToken}&deviceKey=${uniqueId}&page_size=${page_size}&page_index=${page_index}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`

                },
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch({ type: COMPANYREVIEWS, payload: resp.data.data })
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

            console.log(resp, 'resp _getCompanyReviews')
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));

            console.log(err.response, "error from _getCompanyReviews", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _addCompanyReviews = (currentUser, navigation, noOfReviews, reviewText,setnoOfReviews,setreviewText) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        dispatch(_loading(true));
        try {
            const option = {
                method: 'POST',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/company-review?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`

                },
                data: {
                    "rate": noOfReviews.toString(),
                    "review": reviewText.toString()
                }
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                // dispatch({ type: COMPANYREVIEWS, payload: resp.data.data })
                dispatch(_loading(false));
                setnoOfReviews('')
                setreviewText('')
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

            console.log(resp, 'resp _addCompanyReviews')
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));

            console.log(err.response, "error from _addCompanyReviews", JSON.parse(JSON.stringify(err.message)));
        }
    }
}