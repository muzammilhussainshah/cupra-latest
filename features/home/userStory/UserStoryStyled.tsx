import styled from 'styled-components/native';
import {Colors} from '../../../constants/Colors';
import React from 'react';
import FastImage from 'react-native-fast-image';
export const Container = styled.View`
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
`;
export const StoryBorderView = styled.View`
  border: 3px solid ${Colors.primary};
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;
const RowView = styled.View`
  flex-direction: row;
  height: 80px;
`;
const UserImage = styled(FastImage)`
  height: 50px;
  width: 50px;
`;
type UserImageProps = {
  userImage: any;
};
export const Stories: React.FC<UserImageProps> = ({userImage}) => (
  <RowView>
    <StoryBorderView>
      <UserImage source={userImage} />
    </StoryBorderView>
  </RowView>
);
