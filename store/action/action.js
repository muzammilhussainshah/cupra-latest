import { ISLOADER, ISERROR, GETCITY, GETCOUNTRY,PAGINATIONLOADER,GETNEWS } from "../constant/constant";
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
export const _getHexColor = (colour) => {
    return dispatch => {

        var colours = {
            "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
            "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
            "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
            "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
            "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
            "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
            "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
            "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
            "honeydew": "#f0fff0", "hotpink": "#ff69b4",
            "indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
            "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
            "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
            "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
            "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
            "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
            "navajowhite": "#ffdead", "navy": "#000080",
            "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
            "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
            "rebeccapurple": "#663399", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
            "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
            "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
            "violet": "#ee82ee",
            "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
            "yellow": "#ffff00", "yellowgreen": "#9acd32"
        };

        if (typeof colours[colour.toLowerCase()] != 'undefined')
            return colours[colour.toLowerCase()];

        return false;
    }
}


export const _getCity = (currentUser, navigation, setModalVisible) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        dispatch(_loading(true));
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/city?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`

                },
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch({ type: GETCITY, payload: resp.data.data })

                dispatch(_loading(false));
                setModalVisible(true)
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
            console.log(resp, 'resp _getCity',)
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from _getCity", JSON.parse(JSON.stringify(err.message)));
        }
    }
}

export const _getCountry = ( navigation,) => {
    return async (dispatch) => {
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        // dispatch(_loading(true));
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/country?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                },
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {
                dispatch({ type: GETCOUNTRY, payload: resp.data.data })
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
            console.log(resp, 'resp _getCountry',)
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err.response, "error from _getCountry", JSON.parse(JSON.stringify(err.message)));
        }
    }
}

export const _SearchForAllThings = ( currentUser,keyWord,searchingFor,page_size,page_index,navigation,getNews, setpagination) => {
    return async (dispatch) => {
        dispatch({ type: PAGINATIONLOADER, payload: true, });
        const deviceToken = await AsyncStorage.getItem('deviceToken');
        const uniqueId = await AsyncStorage.getItem('uniqueId');
        // dispatch(_loading(true));
        try {
            const option = {
                method: 'GET',
                url: `https://cupranationapp.herokuapp.com/apis/mobile/search?deviceToken=${deviceToken}&deviceKey=${uniqueId}&page_size=${page_size}&page_index=${page_index}&text=${keyWord}`,
                headers: {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Content-Type': 'application/json',
                    'Authorization': `${currentUser.token}`
                },
            };
            var resp = await axios(option);
            if (resp.data.status === 200) {

                if (getNews&&page_index>1) {
                    let getNewsClone = getNews;
                    getNewsClone = getNewsClone.concat(resp.data.data.news);
                    console.log(getNewsClone,"getNewsClone")
                    dispatch({ type: GETNEWS, payload: getNewsClone });
                    setpagination(page_index + 1)
                }
                else {
                    dispatch({ type: GETNEWS, payload: resp.data.data.news })
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
            console.log(resp, 'resp _SearchForAllThings',page_size,page_index)
            dispatch(_loading(false));
        }
        catch (err) {
            dispatch(_loading(false));
            console.log(err, "error from _SearchForAllThings", JSON.parse(JSON.stringify(err.message)));
        }
    }
}
