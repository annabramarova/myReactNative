import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import PostsScreen from './PostsScreen';
import CreatePostScreen from "./CreatePostScreen";
import ProfileScreen from "./ProfileScreen";

const MainTab = createBottomTabNavigator();

const Home = ({ navigation, route }) => {
    const { email, name, image } = route.params;
    return (
        <MainTab.Navigator
            screenOptions={({ route }) => ({
    tabBarStyle: {
        height: 83,
        paddingHorizontal: 81,
        paddingBottom: 34,
        paddingTop: 9,
    },
    headerStyle: {
        height: 88,
        borderBottomWidth: 1,
        borderColor: "#F6F6F6",
    },
    headerTitleAlign: 'center',
    headerTitleStyle: {
        justifyContent: 'flex-end',
        paddingBottom: 11,
        paddingTop: 30,
        fontSize: 17,
        fontFamily: 'RobotoMedium',
        lineHeight: 22,
        color: '#212121',
    },
    tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,

    tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let iconColor = '#BDBDBD';
        let backgroundColor = '#fff';

        if (route.name === "Профиль") {
            iconName = "user";
        } else if (route.name === "Публикации") {
            iconName = "grid";
        } else if (route.name === "Создать публикацию") {
        iconName = "plus";
        }

        if (focused) {
        iconColor = "#fff";
            backgroundColor = "#FF6C00";
        }

        return (
            <View
                style={{
                    backgroundColor,
                    width: 70,
                    height: 40,
                    borderRadius: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Feather name={iconName} size={24} color={iconColor} />
            </View>
        );
  },
})}>
            
            <MainTab.Screen
                name='Публикации'
                initialParams={{ name, email, image }}
                component={PostsScreen}
                options={({ route, navigation }) => ({
                    title: 'Публикации',
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ position: "absolute", bottom: 10, right: 10 }}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Feather name="log-out" size={24} color="#BDBDBD" />
                        </TouchableOpacity>
                    ),
                    
                })}
            />
            <MainTab.Screen
                name='Создать публикацию'
                initialParams={{ name, email, image }}
                component={CreatePostScreen}
                options={({route, navigation}) =>({
                title: 'Создать публикацию',
                    headerLeft: () => (
                    <TouchableOpacity
                            style={{ position: "absolute", bottom: 10, left: 10 }}
                            onPress={() => navigation.navigate("Публикации")}
                        >
                        <Feather name="arrow-left" size={24} color="#212121" />
                        </TouchableOpacity>
                   
                ),
                })}
            />
            <MainTab.Screen
                name='Профиль'
                component={ProfileScreen}
                initialParams={{ name, image }}
                options={{
                    title: 'Профиль',
                    headerShown: false,
                }}
            />
        </MainTab.Navigator>
    )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: '#000'
    }
})

export default Home;