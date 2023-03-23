import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";

const initialState = {
  image: "../../assets/images/user.png",
  name: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
    const [onFocus, setOnFocus] = useState();
    const [dimensions, setDimensions] = useState(
        Dimensions.get("window").width - 16 * 2
    );
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [isShowPassword, setIsShowPassword] = useState(true);

    const { image, name, email, password } = state;

    useEffect(() => {
        const onChange = () => {
            const width = Dimensions.get("window").width - 16 * 2;
            setDimensions(width);
        };
        Dimensions.addEventListener("change", onChange);
    }, []);
    
    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        console.log(state);
        setIsShowPassword({ boolean: true, text: "Показать" });
        setState(initialState);
    };

    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
                setIsShowKeyboard(false);
            }}>
                <ImageBackground
                    source={require("../../assets/images/background.png")}
                    style={styles.image}
                >
                    <View style={{ ...styles.main }}>
                        <View style={{
                            ...styles.form,
                            width: dimensions,
                            marginBottom: isShowKeyboard ? -105 : 78,
                        }}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>Регистрация</Text>
                            </View>
                            <View>
                                <TextInput
                                    onFocus={() => {
                                        setOnFocus(1);
                                        setIsShowKeyboard(true);
                                    }}
                                    value={name}
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
                                    onBlur={() => setOnFocus(false)}
                                />
                            </View>
                            <View>
                                <TextInput
                                    onFocus={() => {
                                        setOnFocus(2);
                                        setIsShowKeyboard(true);
                                    }}
                                    value={email}
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
                            <View style={{ position: "relative" }}>
                                <TextInput
                                    onFocus={() => {
                                        setOnFocus(3);
                                        setIsShowKeyboard(true);
                                    }}
                                    value={password}
                                    onChangeText={(value) =>
                                        setState((prevState) => ({ ...prevState, password: value }))}
                                    placeholder='Пароль'
                                    placeholderTextColor="#BDBDBD"
                                    textContentType="password"
                                    secureTextEntry={isShowPassword}
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
                            </View>
                            <TouchableOpacity>
                                <Text
                                    style={styles.showPass}
                                    onPress={() => {
                                    setIsShowPassword((prevState) => !prevState);
                                }}
                                >
                                {isShowPassword ? "Показать" : "Скрыть"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.7}
                                onPress={() => {
                                    navigation.navigate('Home', {email, name, image})                                   
                                    keyboardHide;
                                }}>
                                <Text style={styles.buttonText} >Зарегистрироваться</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <Text style={styles.aside}>Уже есть аккаунт?  </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.aside}>Войти</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.imgBox}>
                            <Image
                                source={
                                    isShowKeyboard
                                        ? require("../../assets/images/user.png")
                                        : ""
                                }
                            ></Image>
                            <Image
                                style={styles.icon}
                                source={
                                    isShowKeyboard
                                        ? require("../../assets/images/delete.png")
                                        : require("../../assets/images/add.png")
                                }
                            ></Image>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};
        
export default RegistrationScreen;

const styles = StyleSheet.create({
    container: {
    flex: 1,    
    backgroundColor: "#fff",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
    justifyContent: "flex-end",
    },  
    main: {
        position: "relative",
        paddingTop: 92,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        backgroundColor: "#fff",        
        justifyContent: "center",
    },    
    form: {
        marginHorizontal: 16,
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
        position: "absolute",
        left: 0,
        top: 0,
        transform: [{ translateX: 128 }, { translateY: -60 }],
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
        width: 120,
        height: 120,
        },
    icon: {
        position: "absolute",
        width: 25,
        height: 25,
        backgroundColor: "#FFFFFF",
        borderRadius: 100,
        right: -14,
        bottom: 14,
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
