import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity } from "react-native";


import { Feather } from "@expo/vector-icons";

const ProfileScreen = ({navigation}) => {
    const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  
  
    useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
      Dimensions.addEventListener("change", onChange);
  }, []);
      

    return (
        <View style={styles.container}>
            <ImageBackground
                    source={require("../../assets/images/background.png")}
                    style={styles.image}
            >
                <View style={{...styles.content, width: dimensions}}>
<View style={styles.header}>
                    <Text style={styles.headerText}>Natali Romanova</Text>
                    </View>
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
            onPress={() => navigation.navigate("Login")}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
                </View>

           </ImageBackground>
        </View>)
}

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
    }
});


export default ProfileScreen;