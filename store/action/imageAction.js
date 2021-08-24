import { GETNEWSIMAGES, ISLOADER, ISERROR } from "../constant/constant";
import axios from 'axios';
import { _logOut } from './authAction';

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

export const _getNewsImages = (currentUser, page_size, page_index, navigation,) => {
    // console.log(currentUser, page_size, page_index, 'uniqueId')
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        // console.log(deviceToken, 'deviceToken', model)
        // console.log(deviceToken, 'uniqueId')
        dispatch({ type: GETNEWSIMAGES, payload: {} })
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/news-images?deviceToken=${deviceToken}&deviceKey=${uniqueId}&page_size=${page_size}&page_index=${page_index}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`

                },
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch({ type: GETNEWSIMAGES, payload: resp.data.data })
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

            console.log(resp, 'resp _getNewsImages')
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));

            console.log(err.response, "error from _getNewsImages", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _imageNewsLike = (currentUser, mediaId, navigation,) => {
    console.log(currentUser, mediaId, navigation, 'currentUser,mediaId, navigation')
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        // console.log(deviceToken, 'deviceToken', model)
        // console.log(deviceToken, 'uniqueId') 
        try {
            const option = {
                method: 'POST',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/like-media?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`
                },
                data: {
                    "media_id": mediaId.toString()
                }
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                // dispatch({ type: GETNEWSIMAGES, payload: resp.data.data })
                // console.log(resp, 'resp _getAdds')
                dispatch(_getNewsImages(currentUser, 10, 1, navigation))

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

            console.log(resp, 'resp _imageNewsLike')
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));

            console.log(err.response, "error from _imageNewsLike", JSON.parse(JSON.stringify(err.message)));
        }
    }
}