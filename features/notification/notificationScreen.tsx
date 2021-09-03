import { useNavigation, DrawerActions } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Header } from '../../components/Header';

import FastImage from 'react-native-fast-image';

import { Alert, FlatList, View, Switch } from 'react-native';

import { Colors } from '../../constants/Colors';

import { _getNotification } from '../../store/action/companyAction'

import { Text } from 'react-native-animatable';

export const NotificationScreen: React.FC = () => {
    const currentUser = useSelector((state: any) => state.reducer.currentUser)

    const [isEnabled, setIsEnabled] = useState(false);

    const dispatch = useDispatch();

    const [getnotification, setgetnotification] = useState([]);

    const notification = useSelector((state: any) => state.reducer.notification)

    const navigation = useNavigation()

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        dispatch(_getNotification(currentUser, navigation))
    }, [])
    useEffect(() => {
        console.log(notification, "notificationnotification")
        setgetnotification(notification)
    }, [notification])
    return (
        <View style={{ flex: 1, marginTop: 24 }}>
            <View style={{ flex: 1.5, backgroundColor: Colors.black, justifyContent: "center" }}>
                <Header
                    RatingScreen={true}
                    notiScreen={() => navigation.navigate('notification')}
                    onOpenDrawer={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
            </View>
            <View style={{ flex: 8.5, backgroundColor: Colors.white }}>
                <View style={{ flex: 1.2, justifyContent: 'space-between', paddingHorizontal: 35, alignItems: "center", flexDirection: "row" }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Notification</Text>
                    <View style={{ height: "40%", borderRadius: 20, justifyContent: "center", alignItems: "center", backgroundColor: "black", width: "14%" }}>
                        <Switch
                            trackColor={{ false: "black", true: "black" }}
                            thumbColor={isEnabled ? '#f4f3f4' : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
                <View style={{ flex: 8.8, paddingHorizontal: 20 }}>
                    <FlatList
                        data={[0, 1, 2, 3, 5]}
                        renderItem={({ item }: any) => {
                            return (
                                <View style={{ height: 50, width: "100%", marginVertical: 5, flexDirection: "row" }}>
                                    <View style={{ flex: 1.5, alignItems: "center" }}>
                                        <FastImage style={{ width: '80%', height: "80%" }} source={require('../../assets/ghanti.png')} resizeMode={FastImage.resizeMode.contain} />
                                    </View>
                                    <View style={{ flex: 8.5, justifyContent: "space-between" }}>
                                        <Text style={{ color: Colors.darkGray }}>6h ago</Text>
                                        <Text style={{ color: Colors.black, fontSize: 16 }}>New BMW Part Added to our store</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        </View>
    );
};
