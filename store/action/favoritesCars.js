import { ISLOADER, ISERROR, GETFAVCARS, GETMODELS, GETBRANDS } from "../constant/constant";
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
export const _getFavCars = (currentUser, navigation) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        dispatch(_loading(true));
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/faverate-car?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
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
                dispatch({ type: GETFAVCARS, payload: resp.data.data })
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
            console.log(resp, 'resp _getFavCars',)
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from _getFavCars", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _addFavCars = (currentUser, navigation, brandName, modalName, yearName, setyearName, setmodalName, setbrandName) => {
    console.log(brandName, modalName, yearName, 'brandName, modalName, yearName')
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        try {
            const option = {
                method: 'POST',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/faverate-car?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`

                },
                data: {
                    "brand": brandName.toString(),
                    "model": modalName.toString(),
                    "year": yearName.toString()
                }
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch(_loading(false));
                // dispatch(_loading(false));
                dispatch(_getFavCars(currentUser, navigation))
                setyearName('')
                setmodalName('')
                setbrandName('')
                // dispatch({ type: GETFAVCARS, payload: resp.data.data })
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
                Alert.alert(
                    "You can not add to favorite!",
                    resp.data.error.messageEn,

                );
                dispatch(_loading(false));
            }
            console.log(resp, 'resp _addFavCars',)
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from _addFavCars", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _dltFavCars = (currentUser, navigation, carId) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        // dispatch(_loading(true));
        try {
            const option = {
                method: 'DELETE',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/faverate-car?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`

                },
                data: {
                    "car_id": carId.toString()
                }
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch(_loading(false));
                // dispatch(_loading(false));
                dispatch(_getFavCars(currentUser, navigation))
                // dispatch({ type: GETFAVCARS, payload: resp.data.data })
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
                Alert.alert(
                    "You can not DELETE!",
                    resp.data.error.messageEn,

                );
                dispatch(_loading(false));
            }
            console.log(resp, 'resp _dltFavCars',)
            // dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from _dltFavCars", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _getModal = (currentUser, brandId, navigation) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        dispatch(_loading(true));
        dispatch({ type: GETMODELS, payload: {} })
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/models?deviceToken=${deviceToken}&deviceKey=${uniqueId}&brandId=${brandId}`,
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
                if (resp.data.data.length == 0) {
                    Alert.alert(
                        "Models!",
                        "No models available",
                    )
                } else {
                    dispatch({ type: GETMODELS, payload: resp.data.data })
                }
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
                Alert.alert(
                    "Models!",
                    "No models available",

                )
                dispatch(_loading(false));
            }
            console.log(resp, 'resp getModal',)
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from getModal", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _getBrand = (currentUser, navigation, brandName, setmodalName, setmodalId) => {
    console.log(brandName, 'aaskjljkjasdads')
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        dispatch(_loading(true));
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/brands?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
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
                dispatch({ type: GETBRANDS, payload: resp.data.data })
                // let BrandArr = resp.data.data
                // const getObjinArr = BrandArr.filter(BrandArr => BrandArr.en_name == brandName);
                // let index = BrandArr.indexOf(getObjinArr)
                setmodalName("Model")
                setmodalId('')
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
            console.log(resp, 'resp _getBrand',)
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from _getBrand", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
