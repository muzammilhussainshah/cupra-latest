import { ISLOADER, ISERROR, SERVICES, SUBSERVICES } from "../constant/constant";
import axios from 'axios';
import { Alert, AsyncStorage } from 'react-native';
import {_logOut } from './authAction';


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


export const _getServices = (currentUser,navigation) => {
    return async (dispatch) => {
        dispatch(_loading(true));
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/services?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`
                },
            };
            var resp = await axios(option);
            console.log(resp, 'resp _getServices',)
            if (resp.data.status === 200) {
                var services = resp.data.data;
                dispatch({ type: SERVICES, payload: services })
                dispatch(_loading(false));
            }
            else if (resp.data.error.messageEn === "You Are Unauthorized") {
                Alert.alert(
                    "Authentication!",
                    "You Are Unauthorized Please Login.",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => dispatch(_logOut(navigation)) }
                    ]
                );
            }

            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from _getServices", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _getSubServices = (currentUser, serviceId,navigation) => {
    // console.log(serviceId, 'serviceId')
    return async (dispatch) => {
        dispatch(_loading(true));
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/subservices?deviceToken=${deviceToken}&deviceKey=${uniqueId}&service=${serviceId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`
                },
            };
            var resp = await axios(option);
            console.log(resp, 'resp _getSubServices',)
            if (resp.data.status === 200) {
                var subservices = resp.data.data;
                dispatch({ type: SUBSERVICES, payload: subservices })
                dispatch(_loading(false));
                
            }
            else if (resp.data.error.messageEn === "You Are Unauthorized") {
                Alert.alert(
                    "Authentication!",
                    "You Are Unauthorized Please Login.",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => dispatch(_logOut(navigation)) }
                    ]
                    );
                }
                dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from _getSubServices", JSON.parse(JSON.stringify(err.message)));
        }
    }
}

