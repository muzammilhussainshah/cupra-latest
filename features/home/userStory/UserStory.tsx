import React from 'react';
import { FlatList } from 'react-native';
import { StaticUsers } from '../../../data/StaticUsers';
import { Container, Stories } from './UserStoryStyled';

export const UserStory = ({ data }: any) => {
  return (
    <Container>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={data}
        renderItem={({ item }) => {

          console.log(item, 'aaa///')
          return (
            <Stories userImage={{ uri: item.icon }} />

          )

        }
        }
      />
    </Container>
  );
};
