
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, StyleSheet, Keyboard, KeyboardAvoidingView, ImageBackground, Platform } from 'react-native';

import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';

import * as SplashScreen from "expo-splash-screen";

 const initialState = { 
    name: "",
    email: "",
    password: "",
    };
  
export default function App() {

    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [isLogin, setIsLogin] = useState(false);

    const [fontsLoaded] = useFonts({
        RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
        RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
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
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
                >
      <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            setIsShowKeyboard(false);
        }}>
            <ImageBackground
                source={require("./assets/images/background.png")}
                style={styles.image}
            >
                {isLogin ? (
              <LoginScreen
                isLogin={{ isLogin, setIsLogin }}
              state={{ state, setState }}
              keyboard={{ keyboardHide, setIsShowKeyboard, isShowKeyboard }}
                
              />
            ) : (
              <RegistrationScreen
                isLogin={{ isLogin, setIsLogin }}                
                state={{ state, setState }}
                keyboard={{ keyboardHide, setIsShowKeyboard, isShowKeyboard }}
              />
            )}
      </ImageBackground>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

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
});