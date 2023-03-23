import { Image, StyleSheet, Text, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const CreatePostScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.camera}>
                        <FontAwesome name='camera' size={20} color={'#BDBDBD'} />
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom: 32}}>
                    <Text style={styles.text}>Загрузите фото</Text>
                </View>
                <View style={{marginBottom: 16}}>
                    <TextInput placeholder="Название..." style={styles.input} 
                                    placeholderTextColor="#BDBDBD"
                    />
                </View>
                <View style={{position: 'relative', marginBottom: 32}}>
                <TextInput placeholder="Местность..."
                        style={{ ...styles.input, paddingLeft: 28 }}
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
                <TouchableOpacity style={styles.btn} activeOpacity={0.7}>
                    <Text style={styles.btnText}>Опубликовать</Text>
                    {/* <TouchableOpacity style={{ ...styles.btn, backgroundColor: active ? "#ff6c00" : "#F6F6F6" }}>
                    <Text style={{...styles.btnText, color: active? "#fff" : "#BDBDBD"}}>Опубликовать</Text> */}
                </TouchableOpacity>
            </View>
        </View>)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
        paddingHorizontal: 16,
    paddingVertical: 32,
    },
    box: {
        height: 240,
        backgroundColor: '#F6F6F6',
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: '#fff',

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