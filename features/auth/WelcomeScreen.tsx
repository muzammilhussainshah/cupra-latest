import React, {
  useEffect
  , useState,
} from 'react';

import {
  Keyboard,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  ActivityIndicator,
  View, Text
} from 'react-native';
import {
  Container,
  Item,
  KeyboardView,
  List,
} from '../../components/SelectStyle';
import {
  Button,
  ButtonsContainer
  , ButtonText
} from '../../components/Button';
import { Colors } from '../../constants/Colors';
import { height } from '../../constants/Layout';
import {
  _signIn,
  _directLogin
} from '../../store/action/authAction';
import { _getCountry, } from '../../store/action/action';
import { _guestLogin, _directLoginForGuest } from '../../store/action/authAction';
import { CommonActions } from '@react-navigation/native';
import { SpashScreen } from '../../components/SplashScreen';
import {
  BackGroundContinerImage,
  WelcomeTitle,
  ButtonsRow,
  GradientBanckground,
} from './styled';

import {
  useDispatch,
  useSelector
} from 'react-redux';
import { useNavigation, } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';

// TODO:Refactor the GradientBanckground to make reusable component that take
// a different height and width

export type SelectItem = {
  id: string;
  name: string;
  date?: Date;
};

export const WelcomeScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [SelectCountry, setSelectCountry] = useState(false);
  const [countryId, setcountryId] = useState('');
  const [getcountry, setgetcountry] = useState<any>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const country = useSelector(({ reducer }: any) => reducer.country);
  const isLoader = useSelector(({ reducer }: any) => reducer.isLoader);
  const isError = useSelector(({ reducer }: any) => reducer.isError);
  let currentUserForGuest;
  useEffect(() => {
    getDataAsync();
    dispatch(_getCountry(navigation))
    directLogInForGuest()
  }, []);
  const directLogInForGuest = async () => {
    currentUserForGuest = await AsyncStorage.getItem('currentUserForGuest');
    // console.log(JSON.parse(currentUserForGuest), 'currentUserForGuest')
  }
  let localCodeArr: any = []
  // console.log(getcountry,'getcountrygetcountrygetcountry')
  useEffect(() => {
    // setgetcountry(country)
    // console.log(country, 'country')
    country && country.length > 0 && country.map((value: any) => {
      localCodeArr.push(value)
    })
    setgetcountry(localCodeArr)
    // console.log(localCodeArr, '444444444')
  }, [country])

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleChange = (item: SelectItem) => {
    Keyboard.dismiss();
    if (getcountry.onChange) {
      getcountry.onChange(item.en_name);
    }
    setcountryId(item._id)
    setSelectCountry(item.en_name);
    toggleModal();
  };
  const getDataAsync = async () => {

    const getEmail = await AsyncStorage.getItem('userEmail');
    const getSocialtype = await AsyncStorage.getItem('socialType');
    const getsocialId = await AsyncStorage.getItem('socialId');
    const password = await AsyncStorage.getItem('password');
    // console.log(getSocialtype,'getSocialtype')

    if (getEmail && getEmail !== 'null') {

      dispatch(_signIn({ emailOrPhone: getEmail, password: password }, navigation, setUser));

      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [{ name: 'drawerStack' }],
      //   }),
      // );
      // setUser(true);
    }
    else if (getSocialtype && getSocialtype == 'Facebook') {
      console.log('FacebookFacebookFacebook')
      dispatch(_directLogin({ Id: getsocialId, type: 'FACEBOOK' }, navigation, setUser));
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [{ name: 'drawerStack' }],
      //   }),
      // );
      // setUser(true);
    }
    else if (getSocialtype && getSocialtype == 'Google') {
      dispatch(_directLogin({ Id: getsocialId, type: 'GOOGLE' }, navigation, setUser));
    }
    else if (getSocialtype && getSocialtype == 'Apple') {
      dispatch(_directLogin({ Id: getsocialId, type: 'APPLE' }, navigation, setUser));
    }
    else if (getSocialtype && getSocialtype == 'Guest') {
      // console.log('saghirahmedshah')
      dispatch(_directLoginForGuest(   navigation, setUser));

      // dispatch({ type: CURRENTUSER, payload: JSON.parse(currentUserForGuest) });

      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [{ name: 'drawerStack' }],
      //   }),
      // );
      // setUser(true);
    }

    else {
      console.log('elseelseelse')

      setUser(false);
    }
  };

  return (
    user === false ? (
      <BackGroundContinerImage
        resizeMode={FastImage.resizeMode.cover}
        source={require('../../assets/backgroundImage.png')}>
        <Modal
          isVisible={modalVisible}
          hideModalContentWhileAnimating
          useNativeDriver
          onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal}
          style={{ margin: 0 }}
          customBackdrop={Platform.select({
            ios: (
              <BlurView
                style={{ flex: 1 }}
                blurType={'dark'}
                blurAmount={100}
                blurRadius={100}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={toggleModal}>
                  <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
              </BlurView>
            ),
            android: null,
          })}>
          <KeyboardView>
            <Container>
              {/* {props.title && <Title>{props.title}</Title>} */}
              <List
                contentContainerStyle={{ paddingBottom: 30 }}
                removeClippedSubviews
                maxToRenderPerBatch={10}
                data={getcountry && getcountry}
                // data={props.items.filter(item => item?.name) as SelectItem[]}
                renderItem={({ item }: any) => {
                  return (
                    <>
                      {/* {console.log(item, disableMonth, ' item item item item item item item item item item item item item item item item item item item item item item item')} */}
                      <Item
                        getDisable={false}
                        onChange={() => {
                          handleChange(item as SelectItem)
                        }}>
                        {(item.en_name as SelectItem)}
                      </Item>
                    </>
                  )
                }
                }
                // keyExtractor={item => item.dateId} 
                keyboardDismissMode={'on-drag'}
              />
            </Container>
          </KeyboardView>
        </Modal>
        <GradientBanckground
          radius={(height * 3) / 4}
          center={[0, 0]}
          colors={['rgba(251,147,21,0.6)', 'rgba(0,0,0,0.8)']}>
          <WelcomeTitle>Welcome</WelcomeTitle>
          <ButtonsRow>
            <ButtonsContainer
              style={{
                borderWidth: 1,
                padding: 5,
                borderColor: '#ffffff',
                borderRadius: 25,
              }}
              containerWidth={140}>
              <Button
                backgroundColor={'transparent'}
                onPress={() => {
                  navigation.navigate('login');
                }}>
                <ButtonText>Login</ButtonText>
              </Button>
            </ButtonsContainer>
            <ButtonsContainer
              style={{
                borderWidth: 1,
                padding: 5,
                borderColor: '#ffffff',
                borderRadius: 25,
              }}
              containerWidth={140}>
              <Button
                backgroundColor={'transparent'}
                onPress={() => {
                  navigation.navigate('signup');
                }}>
                <ButtonText>Signup</ButtonText>
              </Button>
            </ButtonsContainer>
          </ButtonsRow>


          {isLoader ?
            <ActivityIndicator
              // style={{ marginTop: "15%" }}
              size="small" color={'#ffffff'}
            /> :
            <View style={{ flexDirection: "row", marginBottom: 5, alignItems: "center" }}>
              <Text style={{ color: "white" }}>Guest from</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setModalVisible(true)}
                style={{ height: 40, flexDirection: 'row', marginHorizontal: 20, justifyContent: "center", alignItems: 'center', paddingHorizontal: 20, borderRadius: 30, borderWidth: 1, borderColor: 'white' }}>
                <Text style={{ color: "white", marginRight: 15 }}>{SelectCountry ? SelectCountry : 'Country'}</Text>
                <AntDesign name="caretdown" size={13} color={Colors.primary} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => dispatch(_guestLogin(navigation, countryId))}
                style={{ height: 40, justifyContent: "center", alignItems: 'center', paddingHorizontal: 20, borderRadius: 30, borderWidth: 1, borderColor: 'white' }}>
                <Text style={{ color: "white" }}>Go</Text>
              </TouchableOpacity>
            </View>
          }
          {isError !== "" &&
            <Text style={{ color: "red", fontSize: 12, alignSelf: "center" }}>{isError}{' '}{isError == "Invalid Credentials" && "please signup first"}
            </Text>}

        </GradientBanckground>
      </BackGroundContinerImage>
    ) :
      <SpashScreen />
  );
};
