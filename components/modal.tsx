import Entypo from 'react-native-vector-icons/Entypo';
// import Colors from '../../';
import { Colors } from '../constants/Colors';
import React from "react";
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
const Modal = ({
    _func,
    _func2,
    _modalActive
}) => {
    return (
        <TouchableOpacity
            onPress={_modalActive}
            activeOpacity={0.9}
            style={styles.mainView}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.absWork}>
                <TouchableOpacity
                    style={{ alignItems: "flex-end", padding: 15 }}
                    onPress={_modalActive}
                >
                    <Entypo name="cross" style={{ fontSize: 30, }}
                    />
                </TouchableOpacity>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        style={[{ borderTopWidth: 1 }, styles.options]}
                        onPress={_func2}
                    ><Text style={{ fontSize: 20, }}>Take Photo</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={styles.options}
                        onPress={_func}
                    ><Text style={{ fontSize: 20, }}>Photo from gallery</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={styles.options}
                        onPress={_modalActive}
                    ><Text style={{ fontSize: 20, }}>Cancel</Text></TouchableOpacity>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    options: {
        borderBottomWidth: 1,
        color: Colors.darkGray,
        borderColor: Colors.titleGray,
        padding: 10,
        width: "100%",
        height: 50,
        justifyContent: "center"
    },
    mainView: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(1,1,1,0.9)',
        position: "absolute",
        zIndex: 15
    },
    absWork: {
        height: "50%",
        width: "80%",
        borderRadius: 10,
        backgroundColor: Colors.white,
    }
});
export default Modal;