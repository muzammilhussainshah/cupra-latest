import styled from 'styled-components/native';
import { Colors } from '../../../constants/Colors';
import { View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
export const Container = styled.View`
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
`;
// border: 3px solid ${Colors.primary};
export const StoryBorderView = styled.View`
  height: 70px;
  width: 70px;
  margin: 10px;
  justify-content: center;
  align-items: center;
  `;
// border-radius: 30px;
const RowView = styled.View`
  flex-direction: row;
  height: 80px;
`;
const UserImage = styled(FastImage)`
  height: 100%;
  width: 100%;
`;
type UserImageProps = {
  userImage: any;
};
export const Stories: React.FC<UserImageProps> = ({ userImage }) => (
  <RowView>
    <StoryBorderView
      style={{ overflow: "hidden",   justifyContent: "center", alignItems: "center" }}>
      <View style={{ height: "68%", width: "68%", borderRadius: 50 , overflow: "hidden", position: "absolute", }}>
        {/* <UserImage source={require("../../../assets/users/border.png")} /> */}
        <UserImage source={userImage} />

      </View>
      
      <UserImage source={require("../../../assets/users/border.png")} />
    </StoryBorderView>
  </RowView>
);
