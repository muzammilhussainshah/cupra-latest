import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Colors } from '../../../constants/Colors';

export const Container = styled(SafeAreaView)`
  background-color: ${Colors.secondary};
  flex: 1;
`;
export const BookingTitle = styled.Text`
  font-size: 18px;
  color: ${Colors.primary};
  font-family: 'SourceSansPro-Bold';
`;
export const CalendarTitleHolder = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
`;
export const FakeCalendarView = styled.Text`
  font-size: 18px;
  color: ${Colors.white};
  font-family: 'SourceSansPro-Regular';
`;
export const BookigDetailsTitle = styled.Text`
  font-size: 18px;
  color: ${Colors.white};
  font-family: 'SourceSansPro-Regular';
  padding-left: 20px;
`;
export const Title = styled.Text`
  font-size: 18px;
  color: ${Colors.brownishGrey};
  font-family: 'SourceSansPro-Regular';
  padding-left: 20px;
`;
const CalendarContainer = styled(TouchableOpacity) <{ isSelected?: boolean }>`
  flex-direction: column;
  border-width: 1px;
  border-color: ${Colors.titleGray};
  background-color: ${props =>
    props.isSelected ? Colors.primary : Colors.paleLilac};
  width: ${props => (props.isSelected ? 150 : 40)}px;
  height: 70px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
const DayTitle = styled.Text<{ isSelected?: boolean }>`
  font-size: 18px;
  color: ${props => (props.isSelected ? Colors.white : Colors.black)};
  font-family: 'SourceSansPro-Bold';
`;
const DayNumber = styled.Text<{ isSelected?: boolean }>`
  font-size: 15px;
  color: ${props => (props.isSelected ? Colors.white : Colors.black)};
  font-family: 'SourceSansPro-Regular';
`;
type PickDateTypeProps = {
  Day: string;
  numberOfDays: number;
  onPress?: () => void;
  isSelected?: boolean;
  month?: string;
  fullDay?: string;
};
export const Calendar: React.FC<PickDateTypeProps> = ({
  Day,
  numberOfDays,
  onPress,
  isSelected,
  month,
  fullDay,
}) => (
  <CalendarContainer
    isSelected={isSelected}
    activeOpacity={0.8}
    onPress={onPress}>
    <DayTitle isSelected={isSelected}>{isSelected ? fullDay : numberOfDays}</DayTitle>
    <DayNumber isSelected={isSelected}>
      {isSelected ? `${Day}-${month}` : Day}
    </DayNumber>
  </CalendarContainer>
);
export const DateList = styled(ScrollView)`
  flex-direction: row;
`;
