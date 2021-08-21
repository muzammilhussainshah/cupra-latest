import { ISLOADER, ISERROR, SERVICES, SUBSERVICES, GETREVIEWS } from "../constant/constant";
import axios from 'axios';
import { Alert, AsyncStorage } from 'react-native';
import { _logOut } from './authAction';


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


export const _getServices = (currentUser, navigation) => {
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
export const _getSubServices = (currentUser, serviceId, navigation) => {
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
export const _bookService = (currentUser, model, date, serviceId, setopenModal, navigation) => {
    let name = model.name
    let getDate = date
    let mobile1 = model.phone_number
    let mobile2 = model.second_phone_number
    let comments = model.note
    let getserviceId = serviceId
    console.log(name, 'name')
    console.log(getDate, 'getDate')
    console.log(mobile1, 'mobile1')
    console.log(mobile2, 'mobile2')
    console.log(comments, 'comments')
    console.log(getserviceId, 'getserviceId')
    return async (dispatch) => {
        dispatch(_loading(true));
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            const option = {
                method: 'POST',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/book-subservice?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`
                },
                data: {
                    "subService_id": getserviceId,
                    "name": name,
                    "date_time": getDate,
                    "mobile1": mobile1,
                    "mobile2": mobile2,
                    "comments": comments
                }
            };
            var resp = await axios(option);
            console.log(resp, '_bookService')
            if (resp.data.status === 200) {
                setopenModal(true)
                dispatch(_loading(false));
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
                setopenModal(false)
                dispatch(_error(resp.data.error.messageEn));
                dispatch(_loading(false));
            }
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err, "error from _bookService", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _getSubServiceRating = (currentUser, itemId, serviceName, navigation, serviceId) => {
// console.log(serviceId,'serviceIdserviceIdserviceId')
    return async (dispatch) => {
        dispatch(_loading(true));
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/subservice-reviews/${itemId}?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`
                },
            };
            var resp = await axios(option);
            console.log(resp, '_getSubServiceRating')
            if (resp.data.status === 200) {
                dispatch(_loading(false));
                dispatch({ type: GETREVIEWS, payload: resp.data.data })
                navigation.navigate('GetAndSubmitReview', { serviceName, itemId, serviceId })

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
                dispatch(_loading(false));
            }
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err, "error from _getSubServiceRating", JSON.parse(JSON.stringify(err.message)));
        }
    }
}

export const submitServiceReview = (_id, numberOfReview, currentUser, navigation, getserviceId) => {
    console.log(_id, numberOfReview, currentUser, navigation, getserviceId, "currentUser, item.sub_category._id,")
    return async (dispatch) => {
        dispatch(_loading(true));
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            let url = `https://cupranationapp.herokuapp.com/apis/mobile/rate-subservice?deviceToken=${deviceToken}&deviceKey=${uniqueId}`
            const option = {
                method: 'POST',
                url,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`
                },
                data: {
                    "subService_id": _id,
                    "rate": numberOfReview.toString(),
                }
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch(_loading(false));
                dispatch(_getSubServices(currentUser, getserviceId, navigation))

                // dispatch(_getSubCatogery(currentUser, item.category._id, navigation));
                // _func2()
                navigation.goBack()
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
            else {
                dispatch(_loading(false));
                dispatch(_error(resp.data.error.messageEn));
            }
            console.log(resp, 'resp submitServiceReview')
            // dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));

            console.log(err, "error from submitServiceReview", JSON.parse(JSON.stringify(err.message)));
        }
    }
}

