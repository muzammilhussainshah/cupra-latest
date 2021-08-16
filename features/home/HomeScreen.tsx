import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {Body} from '../../components/Body';
import {Header} from '../../components/Header';
import {Container, CardView} from './HomeStyled';
import {UserStory} from './userStory/UserStory';

export type HomeScreenTypeProp = {
  title: string;
};
export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Header
        onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
        onPress={() => {}}
      />
      <UserStory />
      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          paddingVertical: 20,
        }}>
        <View>
          <Text style={{color: 'white', fontSize: 15}}>For you</Text>
          <View style={{height: 3, backgroundColor: 'white', width: 20}} />
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 15}}>Latest</Text>
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 15}}>Popular</Text>
        </View>
        <View>
          <Text style={{color: 'white', fontSize: 15}}>Featured</Text>
        </View>
      </View>
      <Body>
        <CardView />
        <CardView />
        <CardView />
        <CardView />
      </Body>
    </Container>
  );
};
