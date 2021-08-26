import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import moment from 'moment';
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
  font-family: 'SourceSansPro-Regular;
  /* margin-bottom: 5px; */
  `;
const ServiceHeaderTitle = styled.Text`
  font-size: 16px;
  font-family: 'SourceSansPro-Regular;
  /* margin-bottom: 5px; */
  `;
const DescriptionText = styled.Text`
  font-family: 'SourceSansPro-Regular';
  line-height:18px;
  color: ${Colors.darkGray}
  `;
const removeTags = (str) => {
  if ((str === null) || (str === ''))
    return false;
  else
    str = str.toString();

  // Regular expression to identify HTML tags in 
  // the input string. Replacing the identified 
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/ig, '');
}
export const DescriptionArea = ({ description, _func, _func2, navigation }: any) => {
  return (
    <>
      <View  >
        <DescriptionHeaderTitle style={{ fontFamily: "SourceSansPro-SemiBold", fontSize: 18 }}>Description</DescriptionHeaderTitle>
        {description && <DescriptionText>{removeTags(description)}</DescriptionText>}
      </View>
    </>
  )
};
export const ServiceApplied = ({ serviceTitle, serviceName }: any) => {
  // console.log(serviceTitle, 'serviceTitle')
  useEffect(() => {
  }, [])
  return (
    <View style={{ marginVertical: 5 }}>
      <ServiceHeaderTitle style={{ fontFamily: "SourceSansPro-SemiBold", fontSize: 18, marginBottom: 5 }}>{serviceName}</ServiceHeaderTitle>
      <View style={{ flexDirection: "row", maxWidth: "100%", flexWrap: 'wrap' }}>
        {serviceTitle && serviceTitle.map((value) => {
          return (
            <DescriptionText>{value.en_name} , </DescriptionText>
          )
        })}

      </View>
    </View >
  )
};
export const ClientName = ({ name }: any) => {
  return (
    <>
      <View style={{ marginBottom: 10 }}>
        <DescriptionHeaderTitle>{name}</DescriptionHeaderTitle>
        <TouchableOpacity
        >
        </TouchableOpacity>
      </View>
    </>
  )
};
export const DateOf = ({ date }: any) => {
  return (
    <>
      <View style={{ marginBottom: 10 }}>
        <DescriptionHeaderTitle>{moment(date).format('L')}</DescriptionHeaderTitle>
        <TouchableOpacity
        >
        </TouchableOpacity>
      </View>
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


const SizeContainerTitles = styled.Text`
font-family: 'SourceSansPro-SemiBold';
margin-top:2px;
font-size:16px;
margin-bottom:2px;
color: ${Colors.darkGray}
`;
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
export const SizeArea = ({ Brand, Modal, Year }: any) => (
  <View style={{ marginVertical: 10 }}>
    <SizeContainerTitles>Brand: {Brand}  </SizeContainerTitles>
    <SizeContainerTitles>Modal: {Modal}  </SizeContainerTitles>
    <SizeContainerTitles>Year: {Year}  </SizeContainerTitles>
  </View>
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
  height: 10%;
  border-top-left-radius:55px;
  position: absolute;
  bottom:0;
  z-index:9000000;
  justify-content: space-between;
  align-items: center;
  padding-horizontal:30px;
  flex-direction: row;
`;
