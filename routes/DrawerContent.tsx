import React from 'react';
import { TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import styled from 'styled-components/native';
import { Colors } from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, ButtonsContainer, ButtonText } from '../components/Button';
import FastImage from 'react-native-fast-image';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { _logOut } from '../store/action/authAction';
import { Navigation } from '.';

const DrawerContaienr = styled.View`
  background-color: ${Colors.tangerine};
  flex: 1;
  justify-content: center;
`;
const RowView = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;
const SectionView = styled.View`
  justify-content: center;
  margin-right: 15px;
`;
const BottomSection = styled.View`
  margin-bottom: 15px;
`;
const LogoutButton = styled(DrawerItem)`
  background-color: ${Colors.black};
  margin-right: 40px;
  margin-left: 30px;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 30px;
`;
const MenuWrapper = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;
const CloseImage = styled(FastImage)`
  height: 30px;
  width: 30px;
`;
export const DrawerContent: React.FC = (props: any) => {
  const dispatch = useDispatch();

  // console.log(props,"title={title}title={title}title={title}")
  return (
    <DrawerContaienr>
      <DrawerContentScrollView>
        <MenuWrapper>
          <RowView>
            <ButtonsContainer containerWidth={150}>
              <Button
                style={{ borderRadius: 10 }}
                backgroundColor={'transparent'}
                onPress={() => { }}>
                <ButtonText>Arabic</ButtonText>
              </Button>
            </ButtonsContainer>
            <TouchableOpacity
              onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
            >
              <CloseImage source={require('../assets/images/close.png')} />
            </TouchableOpacity>
          </RowView>
          <SectionView>
            <DrawerItem
              onPress={() => { props.navigation.navigate("HomeTab") }}
              icon={({ size }) => (
                <Ionicons
                  name="home-outline"
                  size={size}
                  color={Colors.white}
                />
              )}
              label="Home"
              labelStyle={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'SourceSansPro-Bold',
              }}
            />
            <DrawerItem
              onPress={() => { props.navigation.navigate("profile")}}
              icon={({ size }) => (
                <Ionicons
                  name="person-outline"
                  size={size}
                  color={Colors.white}
                />
              )}
              label="Profile"
              labelStyle={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'SourceSansPro-Bold',
              }}
            />
            <DrawerItem
              onPress={() => { props.navigation.navigate("favorites")}}
               icon={({ size }) => (
                <Ionicons
                  name="heart-outline"
                  size={size}
                  color={Colors.white}
                />
              )}
              label="Favorites"
              labelStyle={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'SourceSansPro-Bold',
              }}
            />
            <DrawerItem
              onPress={() => { }}
              icon={({ size }) => (
                <Ionicons
                  name="browsers-outline"
                  size={size}
                  color={Colors.white}
                />
              )}
              label="Clamis"
              labelStyle={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'SourceSansPro-Bold',
              }}
            />
            <DrawerItem
              onPress={() => { }}
              icon={({ size }) => (
                <Ionicons
                  name="help-outline"
                  size={size}
                  color={Colors.white}
                />
              )}
              label="Contact Us"
              labelStyle={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'SourceSansPro-Bold',
              }}
            />
            <DrawerItem
              onPress={() => { }}
              icon={({ size }) => (
                <Ionicons
                  name="help-outline"
                  size={size}
                  color={Colors.white}
                />
              )}
              label="Privacy Policy"
              labelStyle={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'SourceSansPro-Bold',
              }}
            />
          </SectionView>
        </MenuWrapper>
      </DrawerContentScrollView>
      <BottomSection>
        <LogoutButton
          onPress={() => { dispatch(_logOut(props.navigation)) }}
          icon={() => (
            <Ionicons name="power-outline" size={30} color={Colors.primary} />
          )}
          label="Logout"
          labelStyle={{ color: Colors.primary }}
        />
      </BottomSection>
    </DrawerContaienr>
  );
};
