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
const Borderimg = styled(FastImage)`
  height: 100%;
  width: 100%;
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
      style={{ overflow: "hidden", justifyContent: "center", alignItems: "center" }}>
      <View style={{ height: "80%", width: "80%", borderRadius: 50, overflow: "hidden", position: "absolute", }}>
        {/* <UserImage source={require("../../../assets/users/border.png")} /> */}
        <UserImage source={userImage} />
      </View>
      <View style={{height:"90%",width:"90%"  }}>
        <Borderimg
          resizeMode="contain"
          source={require("../../../assets/users/border.png")} />
      </View>
    </StoryBorderView>
  </RowView>
);
