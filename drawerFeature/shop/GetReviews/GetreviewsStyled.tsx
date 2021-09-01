import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { Colors } from '../../../constants/Colors';
import { width, height } from '../../../constants/Layout';
export const ShopDetailsContainer = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;
export const Backgroundimage = styled(FastImage)`
  width: ${width}px;
  height: ${height - 400}px;
`
export const ItemName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  font-family: 'SourceSansPro-Regular';
`;
const DescriptionHeaderTitle = styled.Text`
  font-size: 16px;
  font-family: 'SourceSansPro-SemiBold';
  /* margin-bottom: 5px; */
  `;
// font-weight: 900;
// margin-top: 5px;
const DescriptionText = styled.Text`
  font-family: 'SourceSansPro-Regular';
    margin-top: 5px;  
    width: 300px;
    line-height:18px;
    color: ${Colors.darkGray}
    `;
// margin-bottom: 5px;
// font-size: 12px;
export const DescriptionArea = ({ description, _func,_func2, navigation }: any) => {
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <DescriptionHeaderTitle>Description</DescriptionHeaderTitle>
        <TouchableOpacity
          onPress={() => _func()}
        >
          <DescriptionHeaderTitle style={{ marginLeft: 30, color: '#947d5e' }}>Review</DescriptionHeaderTitle>
        </TouchableOpacity>
      </View>
     {description&& <DescriptionText>{description}</DescriptionText>}
    </>
  )
};
const SizeHeaderTitle = styled.Text`
  font-size: 16px;
  font-family: 'SourceSansPro-SemiBold';
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 5px;
  `;


// margin-bottom: 10px;
// font-size: 12px;
const SizeContainerTitles = styled.Text`
font-family: 'SourceSansPro-Regular';
margin-top: 5px;
margin-bottom: 5px;
color: ${Colors.darkGray}
`;
// font-size: 12px;
const TreatmentTitle = styled.Text`
font-size: 16px;
font-family: 'SourceSansPro-SemiBold';
font-weight: 500;
margin-top: 10px;
`;
// margin-bottom: 10px;
const TreatmentDescription = styled.Text`
font-size: 12px;
font-family: 'SourceSansPro-Regular';
margin-top: 5px;
margin-bottom: 5px;
line-height:18px;
color: ${Colors.darkGray}
`;
export const SizeArea = ({ size: { height, width, diameter } = {} }) => (
  <>
    <SizeHeaderTitle>Size</SizeHeaderTitle>
    <SizeContainerTitles>Height: {height} cm</SizeContainerTitles>
    <SizeContainerTitles>Width: {width} cm</SizeContainerTitles>
    <SizeContainerTitles>Diameter: {diameter} cm</SizeContainerTitles>
  </>
);
export const TreatmentArea = ({ treatment }: any) => (
  <CenterView>
    <TreatmentTitle>Treatment</TreatmentTitle>
    <TreatmentDescription>{treatment}</TreatmentDescription>
  </CenterView>
);
export const CenterView = styled.View`
  justify-content: center;
  align-items: flex-start;
  /* padding-right: 20px; */
`;
export const BackgroundColor = styled.TouchableOpacity<{ color: string }>`
  border: 1px solid transparent;
  background: ${props => props.color ? props.color : 'transparent'};
  height: 20px;
  elevation: 2px;
  width: 20px; 
  border-radius: 10px;
`;
export const ColorContianer = ({ color, _func }: any) => (
  <>
    <BackgroundColor color={color} onPress={_func} />
  </>
);
export const QuantityArea = ({ quantity, _func, _func2 }: any) => {
  return (
    <View style={{}}>
      <SizeHeaderTitle>Quantity</SizeHeaderTitle>
      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity
          onPress={_func}
          style={{ borderWidth: 1, backgroundColor: 'transparent', height: 30, width: 30, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text> - </Text>
        </TouchableOpacity>
        <View style={{ margin: 10 }}><Text>{quantity} </Text></View>
        <TouchableOpacity
          onPress={_func2}
          style={{ borderWidth: 1, backgroundColor: '#947d5e', height: 30, width: 30, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}> + </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};
export const ReserveNowArea = styled.View`
  background-color: ${Colors.black};
  width: 100%;
  height: 13%;
  border-top-left-radius: 50px;
  position: absolute;
  bottom:0;
  z-index:9000000;
  justify-content: space-between;
  align-items: center;
  padding-horizontal:20px;
  flex-direction: row;
`;
