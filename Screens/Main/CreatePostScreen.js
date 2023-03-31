import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const CreatePostScreen = ({navigation}) => {
    const [photo, setPhoto] = useState(null);    
    const [cameraRef, setCameraRef] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [state, setState] = useState([]);
    
    const { title, city, location } = state;

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
            let { locationStatus } = await Location.requestForegroundPermissionsAsync();
            setHasPermission(locationStatus === "granted");
            setHasPermission(status === "granted");
        })();
    }, []);

    const takePhoto = async () => {
        const { uri } = await cameraRef.takePictureAsync();
        setPhoto(uri);
        const coordinates = await Location.getCurrentPositionAsync({});
        const location = {
            latitude: coordinates.coords.latitude,
            longitude: coordinates.coords.longitude
        };
        console.log(location);
        setState((prevState) => ({ ...prevState, location }));
    }
    const sendPhoto = () => {
        setState([]),
        navigation.navigate('Публикации', {photo, title, city, location})
    }


    const clearPhoto = () => {
        setPhoto(null);
    };
    
    
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={setCameraRef}>
            {photo && (
            <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        right: 0,
                        backgroundColor: "#fff",
                        }}>
                        <Image source={{ uri: photo }} style={{ width: '100%', height: '100%'}} />
                        </View>
                            )}
            
            <TouchableOpacity style={styles.box} onPress={takePhoto}>
            <FontAwesome name='camera' size={20} color={'#BDBDBD'} />
                </TouchableOpacity>
            </Camera>
             
                <View style={{marginBottom: 32}}>
                <Text style={styles.text}>Загрузите фото</Text>
                {photo && (<TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    height: 30,
                    width: 30,
                }} onPress={clearPhoto}>
            <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableOpacity>)} 
            </View>
            
                <View style={{marginBottom: 16}}>
                <TextInput placeholder="Название..." style={styles.input}
                    value={title}
                    onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, title: value }))
                    }
                    placeholderTextColor="#BDBDBD"
                    />
                </View>
                <View style={{position: 'relative', marginBottom: 32}}>
                <TextInput placeholder="Местность..."
                    style={{ ...styles.input, paddingLeft: 28 }}
                    value={city}
                    onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, city: value }))
                    }
                    placeholderTextColor="#BDBDBD"
                    />
                <View
                    style={{
                        color: "#1B4371",
                        position: "absolute",
                        left: 0,
                        top: 12,
                    }}
                >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                </View>
                </View>
                <TouchableOpacity
                style={{ ...styles.btn, backgroundColor: photo ? "#ff6c00" : "#F6F6F6" }}
                activeOpacity={0.7}
                onPress={sendPhoto}>
                    <Text style={{...styles.btnText, color: photo? "#fff" : "#BDBDBD"}}>Опубликовать</Text>
                </TouchableOpacity>
            </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    camera: {
        height: 240,
        backgroundColor: '#F6F6F6',
        marginBottom: 8,
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    box: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        height: 60,
        width: 60,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#BDBDBD',
        fontSize: 16,
        fontFamily: "RobotoRegular",
    },
    input: {
        color: '#BDBDBD',
        fontSize: 16,
        fontFamily: 'RobotoRegular',
        height: 50,
        paddingBottom: 15,
        paddingTop: 16,
        borderBottomWidth: 1,
        borderColor: "#E8E8E8",
        backgroundColor: "#fff",
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 51,
        borderRadius: 100,
        ...Platform.select({
            ios: { backgroundColor: "#F6F6F6" },
            android: { backgroundColor: "#F6F6F6" },
    }),
    },
    btnText: {
        fontFamily: 'RobotoRegular',
        fontSize: 16,
        color: '#BDBDBD'
    }
});

export default CreatePostScreen;