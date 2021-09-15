import { CURRENTUSER, ISLOADER, ISERROR, MYPROFILE } from '../constant/constant';
import axios from 'axios';
// import DeviceInfo from 'react-native-device-info';
// import BaseUrl from '../../common/BaseUrl';
// import { Actions } from 'react-native-router-flux';
// import AsyncStorage from '@react-native-community/async-storage';
// import firestore from '@react-native-firebase/firestore';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';

import { Alert, AsyncStorage } from 'react-native';
import React from 'react';

import { useNavigation, CommonActions } from '@react-navigation/native';

export const _loading = bol => {
  return dispatch => {
    dispatch({ type: ISLOADER, payload: bol });
  };
};

export function _error(err, time) {
  return dispatch => {
    dispatch({ type: ISERROR, payload: err });

    setTimeout(
      () => {
        dispatch({ type: ISERROR, payload: '' });
      },
      time ? time : 5000,
    );
  };
}

export const _checkIsEmptyObj = obj => {
  for (var key in obj) {
    if (!obj[key]) {
      // console.log(key + " is blank. Deleting it");
      return key;
    }
  }
};
export const _signUp = (model, navigation) => {
  console.log(model, 'model');
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    // console.log(deviceToken, 'deviceToken', model)
    // console.log(uniqueId, 'uniqueId')
    dispatch(_loading(true));
    try {
      const option = {
        method: 'POST',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/create-customer?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: {
          full_name: model.name,
          mobile: `${model.country_number}${model.phone_number}`,
          email: model.email,
          // country: 'Pakistan',
          country : '60930f6ecb8d330015688090',
          password: model.password,
          confirmPassword: model.confirm_password,
        },
      };
      var resp = await axios(option);
      if (resp.data.status === 200) {
        dispatch(_resendCode(`${model.country_number}${model.phone_number}`));
        navigation.navigate('otp', {
          phone_number: model.country_number?.concat(model.phone_number),
        });
        dispatch(_loading(false));
      } else {
        dispatch(_loading(false));
        dispatch(_error(resp.data.error.messageEn));
      }
      console.log(resp, 'resp _signUp');
    } catch (err) {
      dispatch(_loading(false));

      console.log(
        err.response,
        'error from _signUp',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};

export const _signIn = ({ emailOrPhone, password, directSignin }, navigation) => {
  console.log(navigation, directSignin, 'aaaaaaaaaaaaaaaaaaa')
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    console.log(deviceToken, 'deviceTokendeviceTokendeviceTokendeviceTokendeviceTokendeviceTokendeviceTokendeviceToken')
    dispatch(_loading(true));
    try {
      const option = {
        method: 'POST',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/login?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: {
          emailOrPhone: emailOrPhone,
          password: password,
        },
      };
      var resp = await axios(option);
      if (resp.data.status === 200) {
        console.log(resp.data.status, 'resp.data.status resp.data.status ');
        dispatch({ type: CURRENTUSER, payload: resp.data.data.data });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'drawerStack' }],
          }),
        );
        try {
          await AsyncStorage.setItem('auth', 'emailPass');
          await AsyncStorage.setItem('userEmail', emailOrPhone);
          await AsyncStorage.setItem('password', password);
          dispatch(_loading(false));
        } catch (error) {
          dispatch(_loading(false));
          console.log(error, 'from async');
        }
      } else {
        dispatch(_loading(false));
        dispatch(_error(resp.data.error.messageEn));
      }
      // console.log(resp, 'resp _signIn',)
      dispatch(_loading(false));
    } catch (err) {
      dispatch(_loading(false));
      dispatch(_error(err.response.data.errors));
      console.log(
        err.response,
        'error from _signIn',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};

export const _logOut = navigation => {
  return async dispatch => {
    try {
      const socialType = await AsyncStorage.getItem('socialType');
      // const authType = await AsyncStorage.getItem('auth');
      // console.log(authType, "authTypeauthTypeauthType")




      console.log(socialType, "socialTypesocialType")
      if (socialType === 'Google') {
        console.log(socialType, "ggg", "socialTypesocialType")
        await GoogleSignin.signOut();
      }
      else if (socialType === "Facebook") {
        console.log(socialType, "fff", "socialTypesocialType")
        LoginManager.logOut()
      }
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('socialId');
      await AsyncStorage.removeItem('socialType');
      await AsyncStorage.removeItem('auth');

      dispatch({ type: CURRENTUSER, payload: {} });
      dispatch({ type: MYPROFILE, payload: {} });

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'welcome' }],
        }),
      );
    } catch (err) {
      console.log(
        err.response,
        'error from _signIn',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};

export const _varifyCustomer = (
  getPhonneNumber,
  otpCode,
  getroutName,
  getsocialId,
  getsocialType,
) => {
  console.log(
    getPhonneNumber,
    otpCode,
    getroutName,
    getsocialId,
    getsocialType,
    'Varify customer',
  );
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    dispatch(_loading(true));
    try {
      const option = {
        method: 'PUT',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/verify-customer?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: {
          mobile: getPhonneNumber && getPhonneNumber,
          otp: otpCode && otpCode,
        },
      };
      var resp = await axios(option);
      if (resp.data.status === 200) {
        if (getroutName == 'SocialSigninVerification') {
          dispatch(_loading(false));
          if (getsocialType == 'GOOGLE') {
            dispatch(_googleAuth('testing', getsocialId, getsocialType));
          } else {
            dispatch(_facebookAuth('testing', getsocialId, getsocialType));
          }
        } else {
          navigation.navigate('login');
          dispatch(_loading(false));
        }
      } else {
        dispatch(_loading(false));
        dispatch(_error(resp.data.error.messageEn));
      }
      console.log(resp, 'resp _varifyCustomer');
    } catch (err) {
      dispatch(_loading(false));
      dispatch(_error(resp.data.error.messageEn));
      console.log(
        err.response,
        'error from _varifyCustomer',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};

export const _resendCode = (emailOrPhone, getroutName) => {
  let resetPassword = false;
  if (getroutName && getroutName == '_resetPasswordReq') {
    resetPassword = true;
  }
  console.log(getroutName, 'getroutName');
  console.log(resetPassword, 'resetPassword');
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    dispatch(_loading(true));
    try {
      const option = {
        method: 'POST',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/resend-otp?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: {
          emailOrPhone: emailOrPhone,
          resetPassword: resetPassword,
        },
      };
      var resp = await axios(option);
      if (resp.data.status === 200) {
        dispatch(_loading(false));
      } else {
        dispatch(_loading(false));
        dispatch(_error(resp.data.error.messageEn));
      }
      console.log(resp, 'resp _resendCode', emailOrPhone);
    } catch (err) {
      console.log(
        err.response,
        'error from _resendCode',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};

export const _resetPasswordReq = (model, navigation) => {
  const emailOrPhone = model.country_number + model.phone_number;
  console.log(model, 'resetpass');
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    dispatch(_loading(true));
    try {
      const option = {
        method: 'POST',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/request-reset-password?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: {
          emailOrPhone: emailOrPhone,
        },
      };
      var resp = await axios(option);
      if (resp.data.status === 200) {
        dispatch(_loading(false));
        navigation.navigate('otp', {
          getroutName: '_resetPasswordReq',
          phone_number: emailOrPhone,
        });
      } else {
        dispatch(_loading(false));
        dispatch(_error(resp.data.error.messageEn));
      }
      console.log(resp, 'resp _resetPasswordReq');
    } catch (err) {
      dispatch(_loading(false));
      dispatch(_error(resp.data.error.messageEn));

      console.log(
        err.response,
        'error from _resetPasswordReq',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};
export const _verifyResetPassOtp = (getPhonneNumber, otpCode, navigation) => {
  const emailOrPhone = getPhonneNumber;
  const getOtpCode = otpCode;
  // console.log(getPhonneNumber, otpCode, navigation, getfullName, getEmail, getcountry, getsocialId, getsocialType, '555555')
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    dispatch(_loading(true));
    try {
      const option = {
        method: 'POST',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/verify-reset-password-otp?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: {
          emailOrPhone: emailOrPhone,
          otp: getOtpCode,
        },
      };
      var resp = await axios(option);
      if (resp.data.status === 200) {
        dispatch(_loading(false));
        navigation.navigate('requestPassword', {
          emailOrPhone: emailOrPhone,
          passToken: resp.data.data,
        });
      } else {
        dispatch(_loading(false));
        dispatch(_error(resp.data.error.messageEn));
      }

      // { resp.data.data !== '' && navigation.navigate('requestPassword', { emailOrPhone: emailOrPhone, passToken: resp.data.data }); }
      console.log(resp, 'resp _verifyResetPassOtp');
    } catch (err) {
      dispatch(_loading(false));
      dispatch(_error(resp.data.error.messageEn));
      console.log(
        err.response,
        'error from _verifyResetPassOtp',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};
export const _resetNewPassword = (
  model,
  getPhonneNumber,
  getpassToken,
  navigation,
) => {
  const emailOrPhone = getPhonneNumber;
  const passwordToken = getpassToken;
  const password = model.new_password;
  const confirmPassword = model.confirm_password;

  console.log(model, getPhonneNumber, getpassToken, '555555');
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    dispatch(_loading(true));
    try {
      const option = {
        method: 'POST',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/reset-new-password?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: {
          emailOrPhone: emailOrPhone,
          password: password,
          confirmPassword: confirmPassword,
          passwordToken: passwordToken,
        },
      };
      var resp = await axios(option);
      if (resp.data.status === 200) {
        dispatch(_signIn({ emailOrPhone, password }, navigation));
        dispatch(_loading(false));
      } else {
        dispatch(_loading(false));
        dispatch(_error(resp.data.error.messageEn));
      }

      console.log(resp, 'resp _resetNewPassword');
    } catch (err) {
      dispatch(_loading(false));
      dispatch(_error(resp.data.error.messageEn));

      console.log(
        err.response,
        'error from _resetNewPassword',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};
export const _googleAuth = (navigation, getSocialId, getSocialtype) => {
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    try {
      dispatch(_loading(true));
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      let signInMethod = auth()
        .signInWithCredential(googleCredential)
        .then(async resp => {
          console.log(resp, '5555');
          let fullName = resp.user._user.displayName;
          let email = resp.user._user.email;
          // let country = 'Jordan';
          let country = '60930f6ecb8d330015688090';
          let socialId = resp.user._user.uid;
          let socialType = 'GOOGLE';

          // let phoneNumber = resp.user._user.phoneNumber
          try {
            await AsyncStorage.setItem('socialId', socialId);
            await AsyncStorage.setItem('socialType', 'Google');
            await AsyncStorage.setItem('auth', 'google');
            dispatch(_loading(false));
          } catch (error) {
            dispatch(_loading(false));
            console.log(error, 'from async');
          }
          console.log(fullName, email, country, socialId, socialType, '66666');

          const option = {
            method: 'POST',
            url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/social-login?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
            headers: {
              'cache-control': 'no-cache',
              'Allow-Cross-Origin': '*',
              'Content-Type': 'application/json',
            },
            data: {
              social_id: getSocialId ? getSocialId : socialId,
              social_type: getSocialtype ? getSocialtype : socialType,
            },
          };
          var resp = await axios(option);
          if (resp.data.status === 200) {
            dispatch({ type: CURRENTUSER, payload: resp.data.data.data });

          } else if (resp.data.error.messageEn == 'Invalid Credentials') {
            dispatch(_loading(false));
            {
              navigation &&
                navigation.navigate('resetPassword', {
                  title: 'Enter Phone Number',
                  completeSignUp: 'Complete Signup',
                  full_name: fullName,
                  email: email,
                  country: country,
                  social_id: socialId,
                  social_type: socialType,
                });
            }
          }
          console.log(resp, 'login Succesfull');

          console.log(resp, '10000');

          // dispatch(_loading(false));
        })
        .catch(err => {
          console.log(err, 'eraaar');
          dispatch(_loading(false));
        });
      return signInMethod;
    } catch (err) {
      dispatch(_loading(false));
      dispatch(_error(resp.data.error.messageEn));
      console.log(
        err.response,
        'error from _resetNewPassword',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};
export const _facebookAuth = (navigation, getSocialId, getSocialtype) => {
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    try {
      dispatch(_loading(true));
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      console.log(result, 'result');

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();
      console.log(data, 'data');

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      console.log(facebookCredential, 'facebookCredential');

      // Sign-in the user with the credential
      let signInMethod = auth()
        .signInWithCredential(facebookCredential)
        .then(async resp => {
          console.log(resp, '_facebookAuth login');
          let fullName = resp.user._user.displayName;
          let email = resp.user._user.email;
          let country = '60930f6ecb8d330015688090';
          let socialId = resp.user._user.uid;
          let socialType = 'FACEBOOK';
          try {
            await AsyncStorage.setItem('socialId', socialId);
            await AsyncStorage.setItem('socialType', 'Facebook');
            await AsyncStorage.setItem('auth', 'facebook');
            dispatch(_loading(false));
          } catch (error) {
            dispatch(_loading(false));
            console.log(error, 'from facebook async');
          }

          // let phoneNumber = resp.user._user.phoneNumber
          console.log(fullName, email, country, socialId, socialType, '66666', getSocialtype);

          const option = {
            method: 'POST',
            url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/social-login?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
            headers: {
              'cache-control': 'no-cache',
              'Allow-Cross-Origin': '*',
              'Content-Type': 'application/json',
            },
            data: {
              social_id: getSocialId ? getSocialId : socialId,
              social_type: getSocialtype ? getSocialtype : socialType,
            },
          };
          var respSocialLogin = await axios(option);
          if (respSocialLogin.data.status === 200) {
            console.log('2000000000000000')
            dispatch({ type: CURRENTUSER, payload: respSocialLogin.data.data.data });

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'drawerStack' }],
              }),
            );

          } else if (respSocialLogin.data.error.messageEn == 'Invalid Credentials') {
            dispatch(_loading(false));
            {
              navigation &&
                navigation.navigate('resetPassword', {
                  title: 'Enter Phone Number',
                  completeSignUp: 'Complete Signup',
                  full_name: fullName,
                  email: email,
                  country: country,
                  social_id: socialId,
                  social_type: socialType,
                });
            }
          }
          console.log(respSocialLogin, 'fb login  Succesfull');
        })
        .catch(err => {
          console.log(err, 'err');
        });
      console.log(signInMethod, 'signInMethod');
      return signInMethod;
    } catch (err) {
      dispatch(_loading(false));
      dispatch(_error(resp.data.error.messageEn));
      console.log(
        err.response,
        'error from _resetNewPassword',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};

export const _directLogin = (
  { Id,
    type, },
) => {
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    dispatch(_loading(true));
    try {
      const option = {
        method: 'POST',
        url: `https://cupranationapp.herokuapp.com/apis/mobile//customer/social-login?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: {

          "social_id": Id,
          "social_type": type

        },
      };
      var resp = await axios(option);
      if (resp.data.status === 200) {
        // dispatch(_signIn({ emailOrPhone, password }, navigation));
        dispatch({ type: CURRENTUSER, payload: resp.data.data.data });
        dispatch(_loading(false));


      } else {
        dispatch(_loading(false));
        // dispatch(_error(resp.data.error.messageEn));
      }

      console.log(resp, 'resp _FbDirectLogin');
    } catch (err) {
      dispatch(_loading(false));
      // dispatch(_error(resp.data.error.messageEn));

      console.log(
        err,
        'error from _FbDirectLogin',
        // JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};
export const _completeSignUp = (
  getPhonneNumber,
  navigation,
  getfullName,
  getEmail,
  getcountry,
  getsocialId,
  getsocialType,
) => {
  // let phoneNumber = model.country_number + model.phone_number
  console.log('complete');

  console.log(
    getPhonneNumber,
    navigation,
    getfullName,
    getEmail,
    getcountry,
    getsocialId,
    getsocialType,
    '9874',
  );
  // console.log(model.country_number + model.phone_number, getfullName, getEmail, getcountry, getsocialId, getsocialType, navigation, '555555')
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    dispatch(_loading(true));
    try {
      const option = {
        method: 'POST',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/create-social-customer?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: {
          full_name: getfullName,
          mobile: getPhonneNumber,
          email: getEmail,
          country: getcountry,
          social_id: getsocialId,
          social_type: getsocialType,
        },
      };
      var resp = await axios(option);
      if (resp.data.status == 200) {
        dispatch(_loading(false));
        navigation.navigate('otp', {
          phone_number: getPhonneNumber,
          getroutName: 'SocialSigninVerification',
          getsocialId,
          getsocialType,
        });
      } else {
        dispatch(_loading(false));
        dispatch(_error(resp.data.error.messageEn));
      }
      console.log(resp, '_completeSignUp');
    } catch (err) {
      dispatch(_loading(false));
      // dispatch(_error(resp.data.error.messageEn));

      console.log(
        err,
        'error from _resetNewPassword',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};

export const _updateProfile = (
  currentUser,
  navigation,
  fileURL,
  mobile,
  fullName,
  gender,
  cityName,
) => {
  let data = new FormData();
  if (fileURL) {
    data.append('icon', {
      uri: fileURL.uri,
      name: 'image.jpg',
      type: fileURL.type,
    });
  }
  if (fullName) {
    data.append('full_name', fullName);
  }
  if (mobile) {
    console.log('email', mobile.replace(/ /g, ''))
    // data.append('email', mobile);
  }
  if (gender) {
    data.append('gender', gender == 'male' ? '1' : '2');
  }
  if (cityName) {
    data.append('city', cityName);
  }
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    dispatch(_loading(true));
    try {
      const option = {
        method: 'PUT',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/profile?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type':
            'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
          Authorization: `${currentUser.token}`,
        },
        data: data,
      };
      var resp = await axios(option);
      if (resp.data.status == 200) {
        dispatch(_getProfile(currentUser, navigation));
        dispatch(_loading(false));
        navigation.navigate('profile');
      } else if (resp.data.error.messageEn === 'You Are Unauthorized') {
        dispatch(_loading(false));
        Alert.alert('Authentication!', 'You Are Unauthorized Please Login.', [
          { text: 'OK', onPress: () => dispatch(_logOut(navigation)) },
        ]);
      } else {
        dispatch(_loading(false));
        dispatch(_error(resp.data.error.messageEn));
      }
      console.log(resp, '_updateProfile', data);
    } catch (err) {
      dispatch(_loading(false));
      console.log(
        err,
        'error from _updateProfile',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};

export const _getProfile = (currentUser, navigation, name) => {
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    if (name == 'claims') {
      dispatch(_loading(false));
    } else {

      dispatch(_loading(true));
    }
    try {
      const option = {
        method: 'GET',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/profile?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `${currentUser.token}`,
        },
      };
      var resp = await axios(option);
      if (resp.data.status == 200) {
        dispatch(_loading(false));
        dispatch({ type: MYPROFILE, payload: resp.data.data });
        // navigation.navigate('profile')
      } else if (resp.data.error.messageEn === 'You Are Unauthorized') {
        dispatch(_loading(false));
        Alert.alert('Authentication!', 'You Are Unauthorized Please Login.', [
          { text: 'OK', onPress: () => dispatch(_logOut(navigation)) },
        ]);
      } else {
        dispatch(_loading(false));
        dispatch(_error(resp.data.error.messageEn));
      }
      console.log(resp, '_getProfile', resp.data.data);
    } catch (err) {
      dispatch(_loading(false));
      console.log(
        err,
        'error from _getProfile',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};
