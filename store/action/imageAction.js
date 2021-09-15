import { GETNEWSIMAGES, ISLOADER, ISERROR,PAGINATIONLOADER } from "../constant/constant";
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

export const _getNewsImages = (currentUser, page_size, page_index, navigation,getNewsImages, setpagination) => {
    // console.log(currentUser, page_size, page_index, 'uniqueId')
    return async (dispatch) => {
        dispatch({ type: PAGINATIONLOADER, payload: true, });

        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        // console.log(deviceToken, 'deviceToken', model)
        // console.log(deviceToken, 'uniqueId')
        // dispatch({ type: GETNEWSIMAGES, payload: {} })
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
                if (getNewsImages&&page_index>1) {
                    let getNewsImagesClone = getNewsImages;
                    getNewsImagesClone = getNewsImagesClone.concat(resp.data.data);
                    console.log(getNewsImagesClone,"getNewsImagesClone")
                    dispatch({ type: GETNEWSIMAGES, payload: getNewsImagesClone });
                    setpagination(page_index + 1)
                    console.log(getNewsImagesClone, page_size, page_index," page_size, page_index,")
                }
                else {
                    dispatch({ type: GETNEWSIMAGES, payload: resp.data.data })
                }
                dispatch(_loading(false));
                dispatch({ type: PAGINATIONLOADER, payload: false, });

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
export const _imageNewsLike = (currentUser, mediaId, navigation, getNewsImages, likedByMe, indexOfNewsMainImages, renderImgIndex) => {
    // console.log(currentUser, '1111111111111111')
    // console.log(mediaId, '222222222222')
    console.log(getNewsImages, '111111111111')
    // console.log(likedByMe, '444444444')
    // console.log(indexOfNewsMainImages, '55555555555')
    // console.log(renderImgIndex, '6666666')
    let getNewsImagesClone
    let itemNewsImage
    let itemNewsSelectedImage
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        if (getNewsImages) {
            getNewsImagesClone = [...getNewsImages];
            itemNewsImage = getNewsImagesClone[indexOfNewsMainImages];
            console.log(getNewsImagesClone, '2222222222')
            itemNewsSelectedImage = itemNewsImage.media[renderImgIndex];
            // console.log(itemNewsSelectedImage, '88888888888888')
        }
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
                if (getNewsImages) {

                    if (likedByMe) {
                        itemNewsSelectedImage.likedByMe = false;
                        if (itemNewsSelectedImage.likesCount > 0) {
                            itemNewsSelectedImage.likesCount = (itemNewsSelectedImage.likesCount) - 1;
                        }
                    }
                    else {
                        itemNewsSelectedImage.likedByMe = true;
                        itemNewsSelectedImage.likesCount = (itemNewsSelectedImage.likesCount) + 1;
                    }
                    itemNewsImage.media.splice(renderImgIndex, 1, itemNewsSelectedImage)
                    console.log(itemNewsImage, '33333333333333')
                    getNewsImagesClone.splice(indexOfNewsMainImages, 1, itemNewsImage)
                    // console.log(itemNewsImage, '99999999999999')
                    console.log(getNewsImagesClone, '444444444')
                    dispatch({ type: GETNEWSIMAGES, payload: getNewsImagesClone })
                }
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
// export const _likeDisLike = (currentUser, news_id, navigation, filterd_by, getNews, likedByMe,index) => {
//     return async (dispatch) => {
//         const deviceToken = await AsyncStorage.getItem('deviceToken');
//         const uniqueId = await AsyncStorage.getItem('uniqueId');
//         let getNewsClone = [...getNews];
//         let itemNews = getNewsClone[index];

//         try {
//             const option = {
//                 method: 'POST',
//                 url: `https://cupranationapp.herokuapp.com/apis/mobile/news-like?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
//                 headers: {
//                     'cache-control': 'no-cache',
//                     "Allow-Cross-Origin": '*',
//                     'Content-Type': 'application/json',
//                     'Authorization': `${currentUser.token}`

//                 },
//                 data: {
//                     "news_id": news_id.toString(),
//                 }
//             };
//             var resp = await axios(option);
//             if (resp.data.status === 200) {
//                 if (likedByMe) {
//                     itemNews.likedByMe = false;
//                     itemNews.likes_count=(itemNews.likes_count)-1;
//                 }
//                 else {
//                     itemNews.likedByMe = true;
//                     itemNews.likes_count=(itemNews.likes_count)+1;
//                 }
//                 console.log(getNewsClone,"555555555555555555555")
//                 dispatch({ type: GETNEWS, payload: getNewsClone })

//             } else if (resp.data.error.messageEn === "You Are Unauthorized") {
//                 Alert.alert(
//                     "Authentication!",
//                     "You Are Unauthorized Please Login.",
//                     [
//                         { text: "OK", onPress: () => dispatch(_logOut(navigation)) }
//                     ]
//                 );
//             }
//             else {
//                 dispatch(_error(resp.data.error.messageEn));
//             }
//             console.log(resp, 'resp _likeDisLike')
//         }
//         catch (err) {
//             dispatch(_loading(false));
//             console.log(err.response, "error from _likeDisLike", JSON.parse(JSON.stringify(err.message)));
//         }
//     }
// }