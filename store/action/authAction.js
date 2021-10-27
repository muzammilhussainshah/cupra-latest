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
export const _onlineUser = (currentUser, navigation) => {
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    try {
      const option = {
        method: 'POST',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/online?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
          'Authorization': `${currentUser.token}`
        },
      };
      var resp = await axios(option);
      if (resp.data.status === 200) {
      }
      else if (resp.data.error.messageEn === "You Are Unauthorized") {
        dispatch(_loading(false));
        Alert.alert(
          "Authentication!",
          "You Are Unauthorized Please Login.",
          [
            { text: "OK", onPress: () => dispatch(_logOut(navigation)) }
          ]
        );
      }
      console.log(resp, 'resp _onlineUser');
    } catch (err) {
      dispatch(_loading(false));

      console.log(
        err.response,
        'error from _onlineUser',
        JSON.parse(JSON.stringify(err.message)),
      );
    }
  };
};
export const _signUp = (model, navigation, country) => {
  console.log(model, 'model', model.country_number + model.phone_number);

  const countryId = country.find(x => x.country_phone_code === model.country_number)
  let phone_numberWithout0 = model.phone_number;
  if (model.phone_number[0] === '0') phone_numberWithout0 = phone_numberWithout0.substring(1);

  console.log('country id', countryId._id)
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
          mobile: `${model.country_number}${phone_numberWithout0}`,
          email: model.email,
          // country: 'Pakistan',
          country: countryId._id,
          // country: '60930f6ecb8d330015688090',
          password: model.password,
          confirmPassword: model.confirm_password,
        },
      };
      var resp = await axios(option);
      if (resp.data.status === 200) {
        // dispatch(_resendCode(`${model.country_number}${model.phone_number}`));
        navigation.navigate('otp', {
          phone_number: model.country_number?.concat(model.phone_number),
          password: model.password,
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

// export const _signIn = ({ emailOrPhone, password,}, navigation) => {
export const _signIn = ({ emailOrPhone, password }, navigation, setUser) => {
  console.log(navigation, 'aaaaaaaaaaaaaaaaaaa')
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
      console.log(resp, 'resp _signIn')

      if (resp.data.status === 200) {
        console.log(resp.data.status, 'resp.data.status resp.data.status ');
        dispatch({ type: CURRENTUSER, payload: resp.data.data.data });
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
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
        await LoginManager.logOut()
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
      console.log(
        err.response,
        'error from _logOut',
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
  navigation,
  getpassword
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
          // if (getsocialType == 'GOOGLE') {
          //   dispatch(_googleAuth('testing', getsocialId, getsocialType));
          // } else {
          // dispatch(_facebookAuth('testing', getsocialId, getsocialType));


          const option = {
            method: 'POST',
            url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/social-login?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
            headers: {
              'cache-control': 'no-cache',
              'Allow-Cross-Origin': '*',
              'Content-Type': 'application/json',
            },
            data: {
              social_id: getsocialId,
              social_type: getsocialType,
            },
          };
          var respSocialLogin = await axios(option);
          if (respSocialLogin.data.status === 200) {

            if (getsocialType == 'GOOGLE') {
              try {
                await AsyncStorage.setItem('socialId', getsocialId);
                await AsyncStorage.setItem('socialType', 'Google');
                await AsyncStorage.setItem('auth', 'google');
              } catch (error) {
                console.log(error, 'from async');
              }
            }
           else if (getsocialType == 'APPLE') {
              try {
                await AsyncStorage.setItem('socialId', getsocialId);
                await AsyncStorage.setItem('socialType', 'Apple');
                await AsyncStorage.setItem('auth', 'apple');
              } catch (error) {
                console.log(error, 'from async');
              }
            }
            else {

              try {
                await AsyncStorage.setItem('socialId', getsocialId);
                await AsyncStorage.setItem('socialType', 'Facebook');
                await AsyncStorage.setItem('auth', 'facebook');
                // dispatch(_loading(false));
              } catch (error) {
                console.log(error, 'from facebook async');
              }
            }



            console.log('2000000000000000')
            dispatch({ type: CURRENTUSER, payload: respSocialLogin.data.data.data });

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'drawerStack' }],
              }),
            );

          }

















          // }
        }
        else {

          // getpassword in this case getroutName
          dispatch(_signIn({ emailOrPhone: getPhonneNumber, password: getpassword }, navigation,));

          // navigation.navigate('login');
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
export const _googleAuthSignIn = (navigation, getSocialId, getSocialtype) => {
  return async dispatch => {
    await GoogleSignin.signOut();

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
          let socialId = resp.user._user.uid;
          let socialType = 'GOOGLE';
          // console.log(getSocialId,socialId,getSocialtype,socialType,'creditional')
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
            try {
              await AsyncStorage.setItem('socialId', socialId);
              await AsyncStorage.setItem('socialType', 'Google');
              await AsyncStorage.setItem('auth', 'google');
            } catch (error) {
              console.log(error, 'from async');
              dispatch(_loading(false));
            }

            dispatch({ type: CURRENTUSER, payload: resp.data.data.data });
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'drawerStack' }],
              }),
            );

          } else {
            console.log(resp, 'login Succesfull');
            dispatch(_error(resp.data.error.messageEn))
            dispatch(_loading(false));
          }
          // dispatch(_loading(false));
        })
        .catch(err => {
          dispatch(_loading(false));
          console.log(
            err.response,
            'error from google auth',
            JSON.parse(JSON.stringify(err.message)),

          );
          dispatch(_error('Network error please check you connection'))
        });
      return signInMethod;
    } catch (err) {

      dispatch(_loading(false));
      // dispatch(_error(resp.data.error.messageEn));
      console.log(
        err.response,
        'error from _resetNewPassword',
        JSON.parse(JSON.stringify(err.message)),

      );
      dispatch(_error(JSON.parse(JSON.stringify(err.message)) + ' please try again'))
      // if (JSON.parse(JSON.stringify(err.message)) === 'User logged in as different Facebook user.') {
      GoogleSignin.signOut();
      // }



    }
  };
};
export const _appleAuthSignIn = (navigation, getSocialId, getSocialtype) => {
  return async dispatch => {
    await GoogleSignin.signOut();

    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    try {
      dispatch(_loading(true));
      const option = {
        method: 'POST',
        url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/social-login?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
        headers: {
          'cache-control': 'no-cache',
          'Allow-Cross-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: {
          social_id: getSocialId,
          social_type: getSocialtype,
        },
      };
      var resp = await axios(option);
      if (resp.data.status === 200) {
        try {
          await AsyncStorage.setItem('socialId', getSocialId);
          await AsyncStorage.setItem('socialType', 'Apple');
          await AsyncStorage.setItem('auth', 'apple');
        } catch (error) {
          console.log(error, 'from async');
          dispatch(_loading(false));
        }

        dispatch({ type: CURRENTUSER, payload: resp.data.data.data });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'drawerStack' }],
          }),
        );

      } else {
        console.log(resp, 'login Succesfull');
        dispatch(_error(resp.data.error.messageEn))
        dispatch(_loading(false));
      }
      // dispatch(_loading(false));

    } catch (err) {
      dispatch(_loading(false));
      // dispatch(_error(resp.data.error.messageEn));
      console.log(
        err.response,
        'error from _resetNewPassword',
        JSON.parse(JSON.stringify(err.message)),

      );
      dispatch(_error(JSON.parse(JSON.stringify(err.message)) + ' please try again'))
    }
  };
};
export const _facebookAuthSignIn = (navigation, getSocialId, getSocialtype) => {
  return async dispatch => {
    await LoginManager.logOut()

    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    // if (LoginManager.getInstance() != null) {
    // }
    try {
      dispatch(_loading(true));
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      console.log(result, 'result');

      if (result.isCancelled) {
        dispatch(_loading(false));
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();
      console.log(data, '_facebookAuth');

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
          let socialId = resp.user._user.uid;
          let socialType = 'FACEBOOK';
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
          console.log(respSocialLogin, 'respSocialLoginrespSocialLogin')
          if (respSocialLogin.data.status === 200) {
            try {
              await AsyncStorage.setItem('socialId', socialId);
              await AsyncStorage.setItem('socialType', 'Facebook');
              await AsyncStorage.setItem('auth', 'facebook');
              // dispatch(_loading(false));
            } catch (error) {
              console.log(error, 'from facebook async');
            }
            dispatch({ type: CURRENTUSER, payload: respSocialLogin.data.data.data });
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'drawerStack' }],
              }),
            );
          }
          else {
            // alert(respSocialLogin + '1')
            // console.log(respSocialLogin, 'login Error');
            dispatch(_error(respSocialLogin.data.error.messageEn + " Please SignUp First "))
          }
          dispatch(_loading(false));
        })
        .catch(err => {
          // alert(JSON.parse(JSON.stringify(err.message)) + '2')

          dispatch(_loading(false));
          console.log(
            err.response,
            'error from facebook auth',
            JSON.parse(JSON.stringify(err.message)),
          );
          dispatch(_error('Network error please check you connection'))
        });
      return signInMethod;
    } catch (err) {
      // alert(JSON.parse(JSON.stringify(err.message)) + '3')

      dispatch(_loading(false));
      console.log(
        err.response,
        'error from _resetNewPassword',
        JSON.parse(JSON.stringify(err.message)),

      );
      dispatch(_error(JSON.parse(JSON.stringify(err.message)) + ' please try again'))
      if (JSON.parse(JSON.stringify(err.message)) === 'User logged in as different Facebook user.') {
        LoginManager.logOut()
      }


    }
  };
};
export const _appleAuthSignup = (navigation, getSocialId, getSocialtype) => {
  return async dispatch => {
    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    try {
      dispatch(_loading(true));

      navigation &&
        navigation.navigate('resetPassword', {
          title: 'Enter Phone Number',
          completeSignUp: 'Complete Signup',
          full_name: '',
          email: '',
          social_id: getSocialId,
          social_type: getSocialtype,
        });


    } catch (err) {
      dispatch(_loading(false));
      console.log(
        err.response,
        'error from _resetNewPassword',
        JSON.parse(JSON.stringify(err.message)),
      );
      dispatch(_error(JSON.parse(JSON.stringify(err.message)) + ' please try again'))
    }
  };
};
export const _googleAuthSignup = (navigation, getSocialId, getSocialtype) => {
  return async dispatch => {
    await GoogleSignin.signOut();

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
          let socialId = resp.user._user.uid;
          let socialType = 'GOOGLE';
          // console.log(getSocialId,socialId,getSocialtype,socialType,'creditional') 
          // if (respSocialLogin.data.error.messageEn == 'Invalid Credentials') {
          {
            navigation &&
              navigation.navigate('resetPassword', {
                title: 'Enter Phone Number',
                completeSignUp: 'Complete Signup',
                full_name: resp.additionalUserInfo.profile.name,
                email: resp.additionalUserInfo.profile.email,
                // country: country,
                social_id: socialId,
                social_type: socialType,
              });
          }
          // }
          // dispatch(_loading(false));
        })
        .catch(err => {
          dispatch(_loading(false));
          console.log(
            err.response,
            'error from google auth',
            JSON.parse(JSON.stringify(err.message)),

          );
          dispatch(_error('Network error please check you connection'))
        });
      return signInMethod;
    } catch (err) {

      dispatch(_loading(false));
      // dispatch(_error(resp.data.error.messageEn));
      console.log(
        err.response,
        'error from _resetNewPassword',
        JSON.parse(JSON.stringify(err.message)),

      );
      dispatch(_error(JSON.parse(JSON.stringify(err.message)) + ' please try again'))
      // if (JSON.parse(JSON.stringify(err.message)) === 'User logged in as different Facebook user.') {
      GoogleSignin.signOut();
      // }



    }
  };
};
export const _facebookAuthSignUp = (navigation, getSocialId, getSocialtype) => {
  return async dispatch => {
    await LoginManager.logOut()

    const deviceToken = await AsyncStorage.getItem('deviceToken');
    const uniqueId = await AsyncStorage.getItem('uniqueId');
    // if (LoginManager.getInstance() != null) {
    // }
    try {
      dispatch(_loading(true));
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      console.log(result, 'result');

      if (result.isCancelled) {
        dispatch(_loading(false));
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();
      console.log(data, '_facebookAuth');

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
          console.log(resp, '5555');
          let socialId = resp.user._user.uid;
          let socialType = 'FACEBOOK';
          // console.log(getSocialId,socialId,getSocialtype,socialType,'creditional') 
          // if (respSocialLogin.data.error.messageEn == 'Invalid Credentials') {
          {
            navigation &&
              navigation.navigate('resetPassword', {
                title: 'Enter Phone Number',
                completeSignUp: 'Complete Signup',
                full_name: resp.additionalUserInfo.profile.name,
                email: resp.additionalUserInfo.profile.email,
                // country: country,
                social_id: socialId,
                social_type: socialType,
              });
          }
          // }
          // dispatch(_loading(false));
        })
        .catch(err => {
          dispatch(_loading(false));
          console.log(
            err.response,
            'error from facebook auth',
            JSON.parse(JSON.stringify(err.message)),

          );
          dispatch(_error('Network error please check you connection'))
        });
      return signInMethod;
    } catch (err) {
      dispatch(_loading(false));
      console.log(
        err.response,
        'error from _resetNewPassword',
        JSON.parse(JSON.stringify(err.message)),

      );
      dispatch(_error(JSON.parse(JSON.stringify(err.message)) + ' please try again'))
      if (JSON.parse(JSON.stringify(err.message)) === 'User logged in as different Facebook user.') {
        LoginManager.logOut()
      }


    }
  };
};

export const _directLogin = ({ Id, type, }, navigation, setUser) => {
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
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'drawerStack' }],
          }),
        );
        dispatch(_loading(false));


      } else {
        dispatch(_loading(false));
        // dispatch(_error(resp.data.error.messageEn));
      }

      console.log(resp.data.status, 'resp _FbDirectLogin');
      if (resp.data.status === 400) {
        dispatch(_logOut(navigation))

      }
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
  getsocialId,
  getsocialType,
  country_number,
  country
) => {
  // let phoneNumber = model.country_number + model.phone_number
  console.log('complete');
  const countryId = country.find(x => x.country_phone_code === country_number)


  console.log(
    getPhonneNumber,
    navigation,
    getfullName,
    getEmail,
    getsocialId,
    getsocialType,
    '9874',
  );
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
          // country: ,
          country: countryId._id,
          social_id: getsocialId,
          social_type: getsocialType,
        },
      };
      var resp = await axios(option);
      if (resp.data.status == 200) {
        if (resp.data.data.token) {
          const option = {
            method: 'POST',
            url: `https://cupranationapp.herokuapp.com/apis/mobile/customer/social-login?deviceToken=${deviceToken}&deviceKey=${uniqueId}`,
            headers: {
              'cache-control': 'no-cache',
              'Allow-Cross-Origin': '*',
              'Content-Type': 'application/json',
            },
            data: {
              social_id: getsocialId,
              social_type: getsocialType,
            },
          };
          var respSocialLogin = await axios(option);
          if (respSocialLogin.data.status === 200) {

            if (getsocialType == 'GOOGLE') {
              try {
                await AsyncStorage.setItem('socialId', getsocialId);
                await AsyncStorage.setItem('socialType', 'Google');
                await AsyncStorage.setItem('auth', 'google');
              } catch (error) {
                console.log(error, 'from async');
              }
            }
           else if (getsocialType == 'APPLE') {
              try {
                await AsyncStorage.setItem('socialId', getsocialId);
                await AsyncStorage.setItem('socialType', 'Apple');
                await AsyncStorage.setItem('auth', 'apple');
              } catch (error) {
                console.log(error, 'from async');
              }
            }
            else {

              try {
                await AsyncStorage.setItem('socialId', getsocialId);
                await AsyncStorage.setItem('socialType', 'Facebook');
                await AsyncStorage.setItem('auth', 'facebook');
                // dispatch(_loading(false));
              } catch (error) {
                console.log(error, 'from facebook async');
              }
            }
            console.log(respSocialLogin, '100000000')
            dispatch({ type: CURRENTUSER, payload: respSocialLogin.data.data.data });
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'drawerStack' }],
              }),
            );
          }
          dispatch(_loading(false));
        } else {

          dispatch(_loading(false));
          navigation.navigate('otp', {
            phone_number: getPhonneNumber,
            getroutName: 'SocialSigninVerification',
            getsocialId,
            getsocialType,
          }
          )
        }
        ;
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
