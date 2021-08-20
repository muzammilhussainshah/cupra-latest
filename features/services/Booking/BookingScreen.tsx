import React, { useMemo, useState, useEffect } from 'react';

import { Header } from '../../../components/Header';

import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  BookigDetailsTitle,
  BookingTitle,
  Calendar,
  CalendarTitleHolder,
  Container,
  DateList,
  Title,
} from './BookingStyled';

import { Body } from '../../../components/Body';

import FormTextField from '../../../components/FormTextField';

import { Button, ButtonsContainer, ButtonText } from '../../../components/Button';

import { Colors } from '../../../constants/Colors';

import { Alert, Text, View } from 'react-native';

import { _bookService, _error } from "../../../store/action/serviceAction"

import ReservationModal from '../../../components/reservationModal'

import { getDay, getMonth } from '../../../utils/date';

import Select from '../../../components/Select';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import { useNavigation } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';

import Ionicons from 'react-native-vector-icons/Ionicons';
interface IBookingProp {
  name: string;
  phone_number: string;
  second_phone_number: string;
  service: string;
  note: string;
  month: string;
}
const Services = ['service2', 'Nano Ceramic', 'service3'];

export const BookingScreen: React.FC = ({ route }: any) => {
  const { serviceId } = route.params
  const [openModal, setopenModal] = useState(false);

  let dispatch = useDispatch()
  const isError = useSelector((state: any) => state.reducer.isError);
  const currentUser = useSelector((state: any) => state.reducer.currentUser)
  const navigation = useNavigation();
  const [dates1, setDates1] = useState([]);
  const bookingMethods = useForm<IBookingProp>({
    defaultValues: {
      name: currentUser && currentUser.full_name && currentUser.full_name.toString(),
      phone_number: currentUser && currentUser.mobile && currentUser.mobile.toString(),
      second_phone_number: '',
      service: '',
      note: '',
      month: ''
    },
  });
  const monthValue = bookingMethods.watch().month
  const getDaysOfMonthAsList = (n: number, monthValue) => { console.log(); return ([...Array(n)].map((_, i) => getDay(i, monthValue))) }
  const monthsWithYears = useMemo(
    () => [...Array(11)].map((_, i) => getMonth(i + 1)),
    [],
  );
  const currentMonth = moment().month();
  const formatedMonth = getMonth(currentMonth);
  const [selectedDate, setSelectedDate] = useState(formatedMonth);
  const [monthSelection, setmonthSelection] = useState("");
  useEffect(() => {
    setDates1(getDaysOfMonthAsList(moment(monthValue.id).daysInMonth(), monthValue.id))
  }, [monthValue])

  const onSelectDate = date => {
    setSelectedDate(date);
  };

  function onSubmit(model: IBookingProp) {
    if (selectedDate && selectedDate.year) {
      let date = moment(selectedDate.date.toString() + "-" + selectedDate.month.toString()).format();
      let currentDateInNmbr = Date.now()
      let selectedDateInNmbr = Date.parse(date)
      if (selectedDateInNmbr < currentDateInNmbr) {
        dispatch(_error('Date formate is not valid'))

      } else {
        dispatch(_bookService(currentUser, model, date, serviceId, setopenModal, navigation))
      }
    } else {
      dispatch(_error('Date is not selected'))

    }
  }

  return (
    <>
      {openModal &&
        < ReservationModal
          Title={'Sub service has been booked !'}
          _func={() => {
            setopenModal(false)
            navigation.goBack()
          }}
        />
      }
      <Container>
        <Header isGoBack={true} navigateBack={() => navigation.goBack()} />
        <CalendarTitleHolder>
          <BookingTitle>Booking Date</BookingTitle>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Controller
              render={({ onChange, value }) => {
                // setmonthSelection(false)
                return (<>
                  {!monthSelection ?
                    <Select
                      style={{
                        width: 109,
                        borderColor: 'transparent',
                      }}
                      placeholder="Book date"
                      items={monthsWithYears}
                      onChange={(val: any) => {
                        onChange(val)
                        setmonthSelection(val.fullDate)
                      }}
                      value={
                        value !== undefined
                          ? { id: value, name: value.toString() }
                          : undefined
                      }
                    /> :
                    <View>
                      <Text style={{
                        color: "white", fontSize: 20
                      }}>
                        {monthSelection}
                      </Text>
                    </View>
                  }
                </>
                )
              }}
              defaultValue={''}
              control={bookingMethods.control}
              name={'month'}
              rules={{ required: false }}
            />
            <Ionicons name={"ios-arrow-down"} size={20} color={'white'} />
          </View>
        </CalendarTitleHolder>
        <Body>
          <DateList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                flexDirection: 'row',
              }}>
              {dates1.map((date, index) => {
                return (
                  date.day == undefined ? <></> :
                    <Calendar
                      key={index}
                      Day={date.date}
                      fullDay={date.fullDay}
                      month={date.month}
                      numberOfDays={date.day}
                      onPress={() => onSelectDate(date)}
                      isSelected={selectedDate?.date === date?.date}
                    />
                )
              })}
            </View>
          </DateList>
          {/* <BookigDetailsTitle>Booking Details</BookigDetailsTitle> */}

          <FormProvider {...bookingMethods}>
            {/* <FormTextField
            background={'#fff'}
            color={'#000'}
            style={{ width: '100%', borderRadius: 10, paddingHorizontal: 20 }}
            isSelectInput={true}
            name="service"
            items={Services}
            placeholder="Service"
            rules={{
              required: 'service  is required.',
            }}
          /> */}
            <Title>Name</Title>
            <FormTextField
              name="name"
              label=""
              background={'#fff'}
              fontColor={'#000'}
              color={'#000'}
              radius={10}
              style={{ width: '100%', paddingHorizontal: 20, marginBottom: 15 }}
              keyboardType="default"
              rules={{
                required: 'Name is required.',
              }}
            />
            <Title>Phone Number - Extra Phone Number</Title>
            <FormTextField
              name="phone_number"
              label=""
              background={'#fff'}
              fontColor={'#000'}
              color={'#000'}
              radius={10}
              style={{ width: '100%', paddingHorizontal: 20, marginBottom: 15 }}
              keyboardType="number-pad"
              rules={{
                required: 'phone number is required.',
              }}
            />
            <FormTextField
              name="second_phone_number"
              label=""
              background={'#fff'}
              fontColor={'#000'}
              color={'#000'}
              radius={10}
              style={{ width: '100%', paddingHorizontal: 20, marginBottom: 15 }}
              keyboardType="number-pad"
              rules={{
                // required: 'phone number is required.',
              }}
            />
            <Title>Additional Comments</Title>
            <FormTextField
              name="note"
              label=""
              background={'#fff'}
              fontColor={'#000'}
              color={'#000'}
              radius={10}
              numberOfLines={10}
              style={{ width: '100%', paddingHorizontal: 20, marginBottom: 15 }}
              keyboardType="number-pad"
              rules={{
                // required: 'Notes is required.',
              }}
            />
            <ButtonsContainer style={{ paddingHorizontal: 20 }}>
              <Button
                borderRadius={10}
                backgroundColor={Colors.primary}
                onPress={bookingMethods.handleSubmit(onSubmit)}>
                <ButtonText>Book Now</ButtonText>
              </Button>
            </ButtonsContainer>
            {isError !== "" &&
              <Text style={{ color: "red", fontSize: 12, marginTop: 5, alignSelf: "center" }}>{isError}
              </Text>}
          </FormProvider>
        </Body>
        {/* <KeyboardSpacer /> */}
      </Container>
    </>

  );
};
