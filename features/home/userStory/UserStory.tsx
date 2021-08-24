import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Container, Stories } from './UserStoryStyled';
export const UserStory = ({ data, navigation, filterdBy }: any) => {

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
            <TouchableOpacity
              onPress={() => navigation.push("HomeDetail", { newsId: item._id, noOfLikes: item.likes_count, filterdBy })}
              activeOpacity={0.8}>
              <Stories userImage={{ uri: item.icon }} />
            </TouchableOpacity>

          )

        }
        }
      />
    </Container>
  );
};
