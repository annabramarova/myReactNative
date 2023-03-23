import { useFonts } from 'expo-font';
import { useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from "expo-splash-screen";

import { useRoute } from './router';


export default function App() {
  const [fontsLoaded] = useFonts({
        RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
        RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
        RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    });
  
  const routing = useRoute(false);
  
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
    <NavigationContainer>
      {routing}
     </NavigationContainer>
  );
}
