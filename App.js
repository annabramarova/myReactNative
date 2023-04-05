import { useFonts } from 'expo-font';
import { useEffect} from 'react';
import * as SplashScreen from "expo-splash-screen";
import { Provider } from 'react-redux';

import {store} from './redux/store'
import Main from './components/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
        RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
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

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
