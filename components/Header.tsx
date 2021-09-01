import React, { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { View } from 'react-native-animatable';
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

  navigateBack?: () => void;
};
export const Header: React.FC<IHeaderTypeProp> = ({
  onPress,
  onOpenDrawer,
  isGoBack,
  RatingScreen,
  searchBarInput,
  _func,
  navigateBack,
}) => {
  const [mobile, setmobile] = useState('');


  return (
    <BackgroundContiner style={{ height: searchBarInput ? 130 : 80 }}>
      <LogoContainer >
        {isGoBack ? (
          <IconPlaceholder onPress={navigateBack} activeOpacity={0.6}>
            <SteeringIcon
              resizeMode={FastImage.resizeMode.contain}
              source={require('../assets/images/back.png')}
            />
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
        <IconPlaceholder onPress={onPress} activeOpacity={0.6}>
          <HeaderIcons
            resizeMode={FastImage.resizeMode.contain}
            source={require('../assets/images/bell.png')}
          />
        </IconPlaceholder>
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
          <View style={{ height: "50%", top: "50%", justifyContent: "center" }}>
            <IconPlaceholder
              style={{ justifyContent: "center", flexDirection: 'row', overflow: "hidden" }}
              onPress={onPress} activeOpacity={0.6}>
              <View style={{ height: 40, width: "85%", backgroundColor: Colors.darkGray, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
                <TextInput
                  style={{ height: '100%', paddingHorizontal: 15, width: "100%", color: Colors.titleGray }} 
                  onChangeText={text => _func(text)} 
                  placeholder='Search'
                  placeholderTextColor={Colors.titleGray}
                  defaultValue={mobile}
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

          </View>
        </View>
      }
    </BackgroundContiner>
  );
};
