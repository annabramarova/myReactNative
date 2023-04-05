import { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    FlatList
} from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { authSignOut } from "../../redux/auth/authOperations";

const ProfileScreen = ({ navigation }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
    const [posts, setPosts] = useState([]);
    const { userId, name } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(authSignOut());
    }

    const getUserPosts = async () => {
        const postsRef = await collection(db, "posts");
        const q = await query(postsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        const onChange = () => {
            const width = Dimensions.get("window").width;
            setDimensions(width);
        };
        Dimensions.addEventListener("change", onChange);
        getUserPosts();
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../assets/images/background.png")}
                style={styles.image}
            >
                <SafeAreaView style={{ ...styles.content, width: dimensions }}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{name}</Text>
                    </View>

                    <FlatList
                        style={styles.flatList}
                        data={posts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View>
                                <View style={styles.item}>
                                    <Image
                                        source={{ uri: item.photo }}
                                        style={{ height: 240, borderRadius: 8 }}
                                    />
                                </View>
                                <Text style={styles.itemText}>{item.title}</Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 32,
                                        justifyContent: "space-between",
                                    }}>
                                    <View style={{
                                        flexDirection: "row",
                                    }}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate("Комментарии", { postId: item.id })}
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginRight: 24,
                                            }}
                                        >
                                            <Feather
                                                name="message-circle"
                                                size={24}
                                                color="#FF6C00"
                                            />
                                            <Text
                                                style={{
                                                    fontFamily: "RobotoRegular",
                                                    color: "#212121",
                                                    fontSize: 16,
                                                    marginLeft: 6,
                                                }}
                                            >
                                                {"0"}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ flexDirection: "row", alignItems: "center" }}
                                        >
                                            <Feather name="thumbs-up" size={24} color="#FF6C00" />
                                            <Text
                                                style={{
                                                    fontFamily: "RobotoRegular",
                                                    color: "#212121",
                                                    fontSize: 16,
                                                    marginLeft: 6,
                                                }}
                                            >
                                                {"0"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                        onPress={() => {
                                            navigation.navigate("Map", {
                                                location: item.location,
                                            });
                                        }}
                                    >
                                        <Feather name="map-pin" size={24} color="#BDBDBD" />
                                        <Text
                                            style={{
                                                fontFamily: "RobotoRegular",
                                                color: "#212121",
                                                fontSize: 16,
                                                marginLeft: 6,
                                                textDecorationLine: "underline",
                                            }}
                                        >
                                            {item.city}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                    <View
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            transform: [{ translateX: 128 }, { translateY: -60 }],
                            backgroundColor: "#F6F6F6",
                            borderRadius: 16,
                            width: 120,
                            height: 120,
                        }}
                    >
                        <Image source={require("../../assets/images/user.png")}></Image>
                        <Image
                            style={{
                                position: "absolute",
                                width: 25,
                                height: 25,
                                backgroundColor: "#FFFFFF",
                                borderRadius: 100,
                                right: -14,
                                bottom: 14,
                            }}
                            source={require("../../assets/images/delete.png")}
                        ></Image>
                    </View>
                    <TouchableOpacity
                        style={{ position: "absolute", top: 22, right: 16 }}
                        onPress={signOut}
                    >
                        <Feather name="log-out" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
        </View>)
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 147,
    },  
    content: {
        position: "relative",
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 25,
        paddingTop: 92,
        borderTopRightRadius: 25,
        height: '100%',
    },
    header: {
        alignItems: 'center',
    },
    headerText: {
        fontFamily: "RobotoMedium",
        color: "#212121",
        fontSize: 30,
    },
    flatList: {
        position: "relative",
        marginHorizontal: 16,
        backgroundColor: "#fff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        },
    item: {
        backgroundColor: "#F6F6F6",
        height: 240,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 8,
        marginBottom: 8,
    },
    itemText: {
        fontFamily: "Roboto-Medium",
        color: "#212121",
        fontSize: 16,
        marginBottom: 11,
    }
});


export default ProfileScreen;