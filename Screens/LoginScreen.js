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
  email: "",
  password: "",
};

const LoginScreen = () => {

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
            <ImageBackground
                source={require("./assets/images/background.png")}
                style={styles.image}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <View
                        style={{
                            ...styles.form,
                            ...Platform.select({
                                ios: {
                                    marginTop: isShowKeyboard ? 456 : 0,
                                },
                                android: {
                                    marginTop: isShowKeyboard ? 0 : 0,
                                }
                            }),
                        }}
                    >
                        <View style={styles.title}>
                            <Text style={styles.titleText}>Войти</Text>
                        </View>
                        <View>
                            <TextInput
                                onFocus={() => {
                                    setOnFocus(1);
                                    setIsShowKeyboard(true);
                                }}
                                value={state.email}
                                onChangeText={(value) =>
                                    setState((prevState) => ({ ...prevState, email: value }))}
                                placeholder='Адрес электронной почты'
                                placeholderTextColor="#BDBDBD"
                                keyboardType="email-address"
                                style={
                                    onFocus !== 1
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
                                    setOnFocus(2);
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
                                    onFocus !== 2
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
                            <Text style={styles.buttonText} >Войти</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.aside}>Нет аккаунта? Зарегистрироваться</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    
  image: {
        flex: 1,
        resizeMode: "cover",
    justifyContent: "flex-end",
    },
    form: {
        position: "relative",
        paddingHorizontal: 16,
        paddingTop: 32,
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

// import {useState, useEffect } from 'react';
// import {
//     Image,
//   StyleSheet,
//   View,
//   TextInput,
//   Text,
//   Platform,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";

// import * as SplashScreen from "expo-splash-screen";

//     const LoginScreen = ({state, keyboard, isLogin}) => {
//     const [dimensions, setDimensions] = useState(
//     Dimensions.get("window").width - 16 * 2
//     );

//     const [isFocus, setIsFocus] = useState();

//         useEffect(() => {
//             const onChange = () => {
//                 const width = Dimensions.get("window").width - 16 * 2;
//                 setDimensions(width);
//         };
//         Dimensions.addEventListener("change", onChange);
//         }, []);

//         return (
//         <View style={{...styles.main,}}>
//             <View style={{
//                 ...styles.form,
//                 width: dimensions,
//                 marginBottom: keyboard.isShowKeyboard ? -105 : 78,
//                 }}>
//                     <View styles={styles.header}>
//                     <TextInput
//                         value={name}
//                         onChangeText={nameHandler}
//                         placeholder="Username"
//                         style={styles.input}
//                     />
//                     <TextInput
//                         value={password}
//                         onChangeText={passwordHandler}
//                         placeholder="Password"
//                         secureTextEntry={true}
//                         style={styles.input}
//                     />
//                     <Button title={"Login"} style={styles.input} onPress={onLogin} />
//                     </View>
//             </View>
//         </View>
        
//     );
//     }

//     const styles = StyleSheet.create({
    
//     main: {
//         position: "relative",
//         backgroundColor: "#ffffff",
//         borderTopLeftRadius: 25,
//         borderTopRightRadius: 25,
//         paddingTop: 32,
//     },
    
//     form: { marginHorizontal: 16 },
    
//     header: { alignItems: "center", marginBottom: 33 },
    
//     headerTitle: {
//         fontFamily: "Roboto-Medium",
//         color: "#212121",
//         fontSize: 30,
//         },
    
//     input: {
//         height: 50,
//         paddingTop: 16,
//         paddingBottom: 15,
//         paddingLeft: 16,    
//         marginBottom: 16,
//         borderWidth: 1,        
//         borderRadius: 8,
//         borderColor: "#E8E8E8",
//         backgroundColor: "#F6F6F6",
//         outlineColor: "#FF6C00",
//         },
    
//     button: {
//         justifyContent: "center",
//         alignItems: "center",
//         height: 51,
//         borderRadius: 100,
//         marginBottom: 16,
//         marginTop: 27,
//         ...Platform.select({
//         ios: { backgroundColor: "#FF6C00" },
//         android: { backgroundColor: "#FF6C00" },
//         }),
//         },
    
//         buttonTitle: {
//             fontFamily: 'Roboto-Regular',
//             color: '#fff',
//             fontSize: 16
//     }

//     });



// export default LoginScreen;