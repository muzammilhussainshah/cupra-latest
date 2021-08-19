import { SIGNUPUSER, CURRENTUSER, ISLOADER, ISERROR, SHOPCATOGERY, SHOPSUBCATOGERY, ITEMDETAILS, GETREVIEWS } from "../constant/constant";
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
                var catogery = resp.data.data;
                catogery.unshift({ en_name: "All", isSelected: true })
                catogery.forEach((element, index) => {
                    if (index !== 0) {
                        element.isSelected = false;
                    }
                });
                dispatch({ type: SHOPCATOGERY, payload: catogery })
                dispatch(_getSubCatogery(currentUser))
            }
            console.log(resp, 'resp _getCatogery',)
        }
        catch (err) {
            dispatch(_loading(false));
            // dispatch(_error(resp.data.error.messageEn));
            console.log(err.response, "error from _getCatogery", JSON.parse(JSON.stringify(err.message)));
        }
    }
}



export const _getSubCatogery = (currentUser, catId) => {
    console.log(currentUser, "currentUsercurrentUsercurrentUsercurrentUser")
    return async (dispatch) => {
        dispatch(_loading(true));
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            let url = `https://cupranationapp.herokuapp.com/apis/mobile/subcategory?deviceToken=${deviceToken}&deviceKey=${uniqueId}`
            if (catId) url = `https://cupranationapp.herokuapp.com/apis/mobile/subcategory?deviceToken=${deviceToken}&deviceKey=${uniqueId}&category=${catId}`
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
            if (resp.data.status === 200) {
                dispatch({ type: SHOPSUBCATOGERY, payload: resp.data.data })
            }
            console.log(resp, 'resp _getSubCatogery',)
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            // dispatch(_error(resp.data.error.messageEn));
            console.log(err.response, "error from _getSubCatogery", JSON.parse(JSON.stringify(err.message)));
        }
    }
}

export const _getItemDetails = (currentUser, itemId, navigation,) => {
    // console.log(itemLikes, 'item.likesitem.likesv')
    return async (dispatch) => {
        dispatch({ type: ITEMDETAILS, payload: {} })
        dispatch(_loading(true));
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            let url = `https://cupranationapp.herokuapp.com/apis/mobile/item/${itemId}?deviceToken=${deviceToken}&deviceKey=${uniqueId}&id=${itemId}`
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
            // console.log(resp, '_getItemDetails')
            if (resp.data.status === 200) {
                dispatch({ type: ITEMDETAILS, payload: resp.data.data })

                // navigation.push('shopDetail', resp.data.data,)
            }
            console.log(resp, 'resp _getItemDetails',)
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            // dispatch(_error(resp.data.error.messageEn));
            console.log(err.response, "error from _getItemDetails", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const _makeItemReservation = (itemId, quantity, color, currentUser) => {
    console.log(itemId, quantity, color, 'itemId, quantity,color')
    return async (dispatch) => {
        dispatch(_loading(true));
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            let url = `https://cupranationapp.herokuapp.com/apis/mobile/make-item-reservation?deviceToken=${deviceToken}&deviceKey=${uniqueId}&id=${itemId}`
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
                    "item_id": itemId,
                    "quantity": quantity.toString(),
                    "color": color
                }
            };
            var resp = await axios(option);

            console.log(resp, 'resp _makeItemReservation')
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));

            console.log(err, "error from _makeItemReservation", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const likeDislike = (itemId, currentUser, likedByMe) => {
    console.log(itemId, 'itemId,likeDislike')
    return async (dispatch) => {
        // dispatch(_loading(true));
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            let url = `https://cupranationapp.herokuapp.com/apis/mobile/like-item?deviceToken=${deviceToken}&deviceKey=${uniqueId}`
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
                    "item_id": itemId,
                }
            };
            var resp = await axios(option);

            console.log(resp, 'resp likeDislike')
            // dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));

            console.log(err, "error from likeDislike", JSON.parse(JSON.stringify(err.message)));
        }
    }
}

export const submitReview = (itemId, numberOfReview, currentUser, _func2) => {
    console.log(itemId, 'itemId,likeDislike')
    return async (dispatch) => {
        dispatch(_loading(true));
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            let url = `https://cupranationapp.herokuapp.com/apis/mobile/rate-item?deviceToken=${deviceToken}&deviceKey=${uniqueId}`
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
                    "item_id": itemId,
                    "rate": numberOfReview,
                }
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch(_loading(false));
                _func2()

            } else {
                dispatch(_loading(false));
                dispatch(_error(resp.data.error.messageEn));
            }
            console.log(resp, 'resp submitReview')
            // dispatch(_loading(false));


        }
        catch (err) {
            dispatch(_loading(false));

            console.log(err, "error from submitReview", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
export const getReview = (itemId, currentUser, navigation, serviceName) => {
    console.log(itemId, 'itemId,likeDislike')
    return async (dispatch) => {
        dispatch(_loading(true));
        try {
            const deviceToken = await AsyncStorage.getItem('deviceToken');
            const uniqueId = await AsyncStorage.getItem('uniqueId');
            // let url = `https://cupranationapp.herokuapp.com/apis/mobile/item/${itemId}?deviceToken=${deviceToken}&deviceKey=${uniqueId}&id=${itemId}`

            let url = `https://cupranationapp.herokuapp.com/apis/mobile/item-reviews/${itemId}?deviceToken=${deviceToken}&deviceKey=${uniqueId}`
            const option = {
                method: 'GET',
                url,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`
                },
                data: {
                    "item_id": itemId,
                }
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch({ type: GETREVIEWS, payload: resp.data.data })
                dispatch(_loading(false));
                navigation.push('GetReview', navigation,)

            } else {
                dispatch(_loading(false));
                dispatch(_error(resp.data.error.messageEn));
            }
            console.log(resp, 'resp getReview')


        }
        catch (err) {
            dispatch(_loading(false));

            console.log(err, "error from getReview", JSON.parse(JSON.stringify(err.message)));
        }
    }
}