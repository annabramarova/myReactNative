import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from './Screens/Auth/LoginScreen';
import RegistrationScreen from './Screens/Auth/RegistrationScreen';
import Home from './Screens/Main/Home'

const Stack = createStackNavigator();


export const useRoute = (isAuth) => {
    return (
        <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Login'}>
            <Stack.Screen name='Login' component={LoginScreen}
                options={{ headerShown: false }} />
            <Stack.Screen name='Registration' component={RegistrationScreen}
                options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={Home}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

