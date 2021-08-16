import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { width, height } from '../constants/Layout';

const TOP_HEADER_HEIGHT = height;
type MainSheetProps = {
  sheetHeight: number;
  scroll?: boolean;
  contentContainerStyle?: any;
  scrollEnabled?: boolean;
};
const ScrollContainer = styled(ScrollView)`
  flex: 1;
  position: absolute;
  height: ${height}px;
  width: ${width}px;
  background-color: #efefef;
  border-radius: 32px;
  padding-top: 30px;
  padding-left: 24px;
  padding-right: 24px;
  z-index: 1;
`;
const Container = styled(View)`
  position: absolute;
  height: ${height}px;
  width: ${width}px;
  background-color: #efefef;
  border-radius: 32px;
  padding-left: 30px;
  padding-right: 30px;
  z-index: 1;
`;
const ContentView = styled.View`
  justify-content: center;
`;
export const MainSheet: React.FC<MainSheetProps> = (props) => {
  return props.scroll === false ? (
    <Container>
      <ContentView>{props.children}</ContentView>
    </Container>
  ) : (
    <ScrollContainer
      scrollEnabled={props.scrollEnabled}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 20 }}
      style={{
        transform: [{ translateY: TOP_HEADER_HEIGHT * props.sheetHeight }],
      }}>
      <ContentView>{props.children}</ContentView>
      <View style={{ height: height - TOP_HEADER_HEIGHT * 0.7 }} />
    </ScrollContainer>
  );
};

/**
 * MainSheet that can be used with subcomponents
 * for the other screens we will use the sheetHeight={0.2}
 *
 * @example
     <MainSheet sheetHeight={0.4}>
      children
    </MainSheet>
 */
