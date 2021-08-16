import { SIGNUPUSER, CURRENTUSER, ISLOADER, ISERROR } from "../constant/constant";
import axios from 'axios';
import { Alert, AsyncStorage } from 'react-native';


export const _getCatogery = (currentUser) => {
    console.log(currentUser,"currentUsercurrentUsercurrentUsercurrentUser")
    return async (dispatch) => {
        // try {
        // const deviceToken = await AsyncStorage.getItem('deviceToken');
        // const uniqueId = await AsyncStorage.getItem('uniqueId');
        //     const option = {
        //         method: 'GET',
        //         url: `https://cupranationapp.herokuapp.com/apis/mobile/category?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        //         headers: {
        //             'cache-control': 'no-cache',
        //             "Allow-Cross-Origin": '*',
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${}`
        //         },
        //     };
        //     var resp = await axios(option);
          
        //     console.log(resp, 'resp _getCatogery',)
        // }
        // catch (err) {
        //     dispatch(_loading(false));
        //     dispatch(_error(resp.data.error.messageEn));
        //     console.log(err.response, "error from _getCatogery", JSON.parse(JSON.stringify(err.message)));
        // }
    }
}
