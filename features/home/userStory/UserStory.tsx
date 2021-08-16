import React from 'react';
import {FlatList} from 'react-native';
import {StaticUsers} from '../../../data/StaticUsers';
import {Container, Stories} from './UserStoryStyled';

export const UserStory = () => {
  return (
    <Container>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={StaticUsers?.map(user => user)}
        renderItem={({item}) => <Stories userImage={item.uri} />}
      />
    </Container>
  );
};
