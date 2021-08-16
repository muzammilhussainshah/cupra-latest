import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {Colors} from '../constants/Colors';

const BackgroundContiner = styled.View`
  background-color: ${Colors.black};
  height: 80px;
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
  navigateBack?: () => void;
};
export const Header: React.FC<IHeaderTypeProp> = ({
  onPress,
  onOpenDrawer,
  isGoBack,
  navigateBack,
}) => {
  return (
    <BackgroundContiner>
      <LogoContainer>
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
        <IconPlaceholder onPress={onPress} activeOpacity={0.6}>
          <HeaderIcons
            resizeMode={FastImage.resizeMode.contain}
            tintColor={'#FFF'}
            source={require('../assets/images/search.png')}
          />
        </IconPlaceholder>
      </LogoContainer>
    </BackgroundContiner>
  );
};
