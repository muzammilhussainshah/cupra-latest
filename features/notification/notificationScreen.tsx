import { useNavigation, DrawerActions } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Header } from '../../components/Header';

import moment from 'moment';

import FastImage from 'react-native-fast-image';

import { Alert, FlatList, View, Switch, Text } from 'react-native';

import { Colors } from '../../constants/Colors';

import { _getNotification, _error } from '../../store/action/companyAction'

import { ScrollView } from 'react-native-gesture-handler';

import { height } from '../../constants/Layout';

// import { Text } from 'react-native-animatable';

export const NotificationScreen: React.FC = () => {
    const isError = useSelector((state: any) => state.reducer.isError);
    const currentUser = useSelector((state: any) => state.reducer.currentUser)

    const [isEnabled, setIsEnabled] = useState(false);

    const dispatch = useDispatch();

    const [getnotification, setgetnotification] = useState('');

    const notification = useSelector((state: any) => state.reducer.notification)

    const navigation = useNavigation()

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        if (isEnabled) {
            dispatch(_error('Notification disabled  '))
        } else {
            dispatch(_error('Notification Enabled '))
        }
    };
    useEffect(() => {
        dispatch(_getNotification(currentUser, navigation))
    }, [])
    useEffect(() => {
        setgetnotification(notification)
        console.log(notification, "notificationnotification")
    }, [notification])
    return (
        <View style={{ flex: 1, marginTop: 24 }}>
            <View style={{ flex: 1.5, backgroundColor: Colors.black, justifyContent: "center" }}>
                <Header
                    RatingScreen={true}
                    notiScreen={() => navigation.navigate('notification')}
                    onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
                    navigateBack={() => navigation.goBack()}
                    isGoBack={true}
                />
            </View>
            <View style={{ flex: 8.5, backgroundColor: Colors.white }}>
                <View style={{ flex: 1.2, justifyContent: 'space-between', paddingHorizontal: 35, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Notification</Text>
                    <View style={{ height: "40%", borderRadius: 20, justifyContent: "center", alignItems: "center", backgroundColor: "black", width: "14%" }}>
                        <Switch
                            trackColor={{ false: "black", true: "black" }}
                            thumbColor={isEnabled ? Colors.primary : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
                <View style={{ flex: 8.8, paddingHorizontal: 20 }}>
                    <ScrollView style={{}}>
                        <View style={{ height: height / 10 * 7.5, }}>
                            {/* {getnotification && getnotification.length > 0 && */}
                            <FlatList
                                data={notification}
                                renderItem={({ item }: any) => {
                                    return (
                                        <View style={{ width: "100%", marginVertical: 5, flexDirection: "row" }}>
                                            <View style={{ flex: 1.5, alignItems: "center", justifyContent: "center" }}>
                                                <FastImage style={{ width: 50, height: 50 }} source={require('../../assets/images/RealCupraLogo.png')} resizeMode={FastImage.resizeMode.contain} />
                                            </View>
                                            <View style={{ flex: 8.5, }}>
                                                <Text style={{ color: Colors.black, fontSize: 16 }}>{item.title}</Text>
                                                <Text style={{ color: Colors.darkGray, fontSize: 13 }}>{moment(item.createdAt).fromNow()}</Text>
                                                <Text style={{ color: Colors.black, fontSize: 16 }}>{item.body} </Text>

                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </ScrollView>
                    {/* // } */}
                </View>
                {isError !== "" &&
                    <Text style={{ color: Colors.primary, alignSelf: "center" }}>{isError}
                    </Text>}
            </View>
        </View>
    );
};
