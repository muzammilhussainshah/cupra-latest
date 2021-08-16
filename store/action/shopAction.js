import { SIGNUPUSER, CURRENTUSER, ISLOADER, ISERROR, SHOPCATOGERY } from "../constant/constant";
import axios from 'axios';
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


export const _getCatogery = (currentUser) => {
    console.log(currentUser, "currentUsercurrentUsercurrentUsercurrentUser")
    return async (dispatch) => {
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/category?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`
                },
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                resp.data.data.forEach((element, index) => {
                    if(index===0){
                        element.isSelected = true;
                    }
                    else{
                        element.isSelected = false;
                    }
                });
                dispatch({ type: SHOPCATOGERY, payload: resp.data.data })
            }
            console.log(resp.data.data, 'resp _getCatogery',)
        }
        catch (err) {
            dispatch(_loading(false));
            // dispatch(_error(resp.data.error.messageEn));
            console.log(err.response, "error from _getCatogery", JSON.parse(JSON.stringify(err.message)));
        }
    }
}