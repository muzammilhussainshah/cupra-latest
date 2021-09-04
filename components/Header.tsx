import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, Linking,Platform } from 'react-native';
import { Text, View } from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { Colors } from '../constants/Colors';

const BackgroundContiner = styled.View`
  background-color: ${Colors.black};
  padding-left: 16px;
  padding-right: 16px;
`;

const LogoContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const Logo = styled(FastImage)`
  width: 190px;
  height: 100px;
`;
const HeaderIcons = styled(FastImage)`
  height: 25px;
  width: 25px;
  margin: 5px;
`;
const SteeringIcon = styled(FastImage)`
  height: 30px;
  width: 30px;
  margin: 5px;
`;
const IconPlaceholder = styled(TouchableOpacity)`
  background-color: transparent;
  border-width: 1px;
  border-radius: 20px;
`;

export type IHeaderTypeProp = {
  onOpenDrawer?: () => void;
  onPress?: () => void;
  isGoBack?: boolean;
  RatingScreen?: boolean;
  searchBarInput?: boolean;
  _func?: any;
  isEmptyserch?: any;
  notiScreen?: any;

  navigateBack?: () => void;
};
export const Header: React.FC<IHeaderTypeProp> = ({
  onPress,
  onOpenDrawer,
  isGoBack,
  RatingScreen,
  searchBarInput,
  _func,
  notiScreen,
  isEmptyserch,
  navigateBack,
}) => {
  const [text, settext] = useState('');

  useEffect(() => {
    settext("")
  }, [isEmptyserch])


  const dialCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${0787000300}';
    }
    else {
      phoneNumber = 'telprompt:${0787000300}';
    }

    Linking.openURL(phoneNumber);
  };


  return (
    <BackgroundContiner style={{ height: searchBarInput ? 130 : 80 }}>
      <LogoContainer >
        {isGoBack ? (
          <IconPlaceholder style={{ backgroundColor: Colors.primary, justifyContent: "center", height: '45%', width: '13%', alignItems: "center", borderRadius: 10 }} onPress={navigateBack} activeOpacity={0.6}>
            <Text style={{ color: Colors.white, fontSize: 20 }}>{"<"}</Text>
            {/* <SteeringIcon
              resizeMode={FastImage.resizeMode.contain}
              source={require('../assets/images/back.png')}
            /> */}
          </IconPlaceholder>
        ) : (
          <IconPlaceholder onPress={onOpenDrawer} activeOpacity={0.6}>
            <SteeringIcon
              resizeMode={FastImage.resizeMode.contain}
              source={require('../assets/images/steering.png')}
            />
          </IconPlaceholder>
        )}
        <Logo
          source={require('../assets/logo.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
        {searchBarInput ?
          <IconPlaceholder activeOpacity={0.6} onPress={() => dialCall()}>
            <View style={{ width: 70, borderRadius: 10, marginBottom: 5, height: 30, justifyContent: "center", alignItems: 'center' }}>
              <HeaderIcons
                style={{ height: '100%', width: "100%" }}
                resizeMode={FastImage.resizeMode.contain}
                source={require('../assets/phoneCall.png')}
              />
            </View>
          </IconPlaceholder> :
          <View style={{ width: 70, borderRadius: 10, marginBottom: 5, height: 30, justifyContent: "center", alignItems: 'center' }}>
          </View>
        }
        {!RatingScreen && !searchBarInput &&
          <IconPlaceholder onPress={onPress} activeOpacity={0.6}>
            <HeaderIcons
              resizeMode={FastImage.resizeMode.contain}
              tintColor={'#FFF'}
              source={require('../assets/images/search.png')}
            />
          </IconPlaceholder>
        }
      </LogoContainer>
      {searchBarInput &&
        <View style={{ height: "100%", width: "100%", left: 16, position: 'absolute' }}>
          <View style={{ height: "50%", top: "18%", alignItems: "center", flexDirection: "row" }}>
            <IconPlaceholder
              style={{ justifyContent: "center", width: "90%", flexDirection: 'row', overflow: "hidden" }}
              onPress={onPress} activeOpacity={0.6}>
              <View style={{ height: 40, width: "85%", backgroundColor: Colors.darkGray, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
                <TextInput
                  style={{ height: '100%', paddingHorizontal: 15, width: "100%", color: Colors.titleGray }}
                  onChangeText={text => {

                    settext(text)
                    _func(text)
                  }
                  }
                  placeholder='Search'
                  placeholderTextColor={Colors.titleGray}
                  value={text}
                />
              </View>
              <View style={{ height: 40, width: "10%", justifyContent: "center", backgroundColor: Colors.darkGray, borderBottomRightRadius: 20, borderTopRightRadius: 20 }}>
                <HeaderIcons
                  style={{ height: 17, width: 17 }}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={'#FFF'}
                  source={require('../assets/images/search.png')}
                />
              </View>
            </IconPlaceholder>
            <IconPlaceholder onPress={() => notiScreen && notiScreen()} activeOpacity={0.6}>
              <HeaderIcons
                resizeMode={FastImage.resizeMode.contain}
                source={require('../assets/images/bell.png')}
              />
            </IconPlaceholder>
          </View>
        </View>
      }
    </BackgroundContiner>
  );
};
