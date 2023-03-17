import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {

    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [onFocus, setOnFocus] = useState();

    const [fontsLoaded] = useFonts({
        RobotoRegular: require("./../assets/fonts/Roboto-Regular.ttf"),
        RobotoMedium: require("./../assets/fonts/Roboto-Medium.ttf"),
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    }

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        console.log(state);
        setState(initialState);
    };

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
            <View
                style={{
                    ...styles.form,
                    marginBottom: isShowKeyboard ? -105 : 0,
                    paddingBottom: isShowKeyboard ? 0 : 78,
                }}
            >
                <View style={styles.title}>
                    <Text style={styles.titleText}>Регистрация</Text>
                </View>
                <View>
                    <TextInput
                        onFocus={() => {
                            setOnFocus(1);
                            setIsShowKeyboard(true);
                        }}
                        value={state.name}
                        onChangeText={(value) =>
                            setState((prevState) => ({ ...prevState, name: value }))}
                        placeholder='Логин'
                        placeholderTextColor="#BDBDBD"
                        style={
                            onFocus !== 1
                                ? { ...styles.input }
                                : {
                                    ...styles.input,
                                    borderColor: "#ff6c00",
                                    backgroundColor: "#fff",
                                }}
                        onBlur={() => setOnFocus(false)} />
                </View>
                <View>
                    <TextInput
                        onFocus={() => {
                            setOnFocus(2);
                            setIsShowKeyboard(true);
                        }}
                        value={state.email}
                        onChangeText={(value) =>
                            setState((prevState) => ({ ...prevState, email: value }))}
                        placeholder='Адрес электронной почты'
                        placeholderTextColor="#BDBDBD"
                        keyboardType="email-address"
                        style={
                            onFocus !== 2
                                ? { ...styles.input }
                                : {
                                    ...styles.input,
                                    borderColor: "#ff6c00",
                                    backgroundColor: "#fff",
                                }}
                        onBlur={() => setOnFocus(false)}
                    />
                </View>
                <View>
                    <TextInput
                        onFocus={() => {
                            setOnFocus(3);
                            setIsShowKeyboard(true);
                        }}
                        value={state.password}
                        onChangeText={(value) =>
                            setState((prevState) => ({ ...prevState, password: value }))}
                        placeholder='Пароль'
                        placeholderTextColor="#BDBDBD"
                        textContentType="password"
                        secureTextEntry={true}
                        style={
                            onFocus !== 3
                                ? { ...styles.input }
                                : {
                                    ...styles.input,
                                    borderColor: "#FF6C00",
                                    backgroundColor: "#FFFFFF",
                                }}
                        onBlur={() => setOnFocus(false)}
                    />
                    <TouchableOpacity>
                        <Text
                            style={styles.showPass}
                        >
                            Показать
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={keyboardHide}>
                    <Text style={styles.buttonText} >Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.aside}>Уже есть аккаунт? Войти</Text>
                </TouchableOpacity>
                <View style={styles.imgBox}>
                    <Image
                    source={
                        isShowKeyboard
                            ? require("../assets/images/user.png")
                            : ""
                    }
                ></Image>
                <Image
                    style={styles.icon}
                    source={
                        isShowKeyboard
                            ? require("../assets/images/delete.png")
                            : require("../assets/images/add.png")
                    }
                ></Image>
            </View>
            </View>
            </TouchableWithoutFeedback>
    );
};
export default RegistrationScreen;

const styles = StyleSheet.create({
    
    form: {
        position: "relative",
        paddingHorizontal: 16,
        paddingTop: 92,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: "#fff",        
        justifyContent: "center",
    },
    input: {
        height: 50,
        paddingTop: 16,
        paddingBottom: 15,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 8,
        backgroundColor: "#F6F6F6",
        marginBottom: 16,
        fontSize: 16,
        outlineColor: "#FF6C00",       
        color: "#212121",
    },
    imgBox: {
        position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    top: -60,
    right: '50%',
    left: '50%',
    transform: [{ translateX: -60 }],
    },
    icon: {
        position: 'absolute',
    width: 25,
    height: 25,
    top: 81,
        right: -12.5,
    objectFit: 'cover',
    },
    title: {
        alignItems: "center",
        marginBottom: 33
    },
    titleText: {
        fontFamily: "RobotoMedium",
        color: "#212121",
        fontSize: 30,
        lineHeight: 35,
        letterSpacing: 0.16,
    },
    showPass: {
         color: "#1B4371",
        position: "absolute",
                fontSize: 16,
                right: 16,
                bottom: 30,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 27,
        borderRadius: 100,
        height: 51,
        ...Platform.select({
            ios: { backgroundColor: "#FF6C00" },
            android: { backgroundColor: "#FF6C00" },
        }),
    },
    buttonText: {
        fontFamily: 'RobotoRegular',
        fontSize: 16,
        lineHeight: 19,
        color: '#fff',
  },
    aside: {
        fontSize: 16,
        lineHeight: 19,
        marginTop: 16,
        textAlign: "center",
        color: "#1B4371",
    },
});