import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from './Screens/Auth/LoginScreen';
import RegistrationScreen from './Screens/Auth/RegistrationScreen';
import Home from './Screens/Main/Home';

import MapScreen from "./Screens/NestedScreens/MapScreen";
import CommentsScreen from "./Screens/NestedScreens/CommentsScreen";

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
            <Stack.Screen
                name='Map'
                component={MapScreen}
                options={{ 
                    title: 'Карта',
                    headerTitleAlign: "center",
                    headerStyle: {
                        height: 88,
                        borderBottomWidth: 1,
                        borderColor: "#F6F6F6",
                    },
                 }}/>
            <Stack.Screen
                name='Comments'
                component={CommentsScreen}
                options={{ 
                    title: 'Комментарии',
                    headerTitleAlign: "center",
                    headerStyle: {
                        height: 88,
                        borderBottomWidth: 1,
                        borderColor: "#F6F6F6",
                    },
                 }}/>
        </Stack.Navigator>
    )
}

