import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput} from "react-native";

import { Feather } from "@expo/vector-icons"; 

const CommentsScreen = ({ navigation, route }) => {
  const { photo } = route.params;
  
    return (
      <View style={styles.container}>
        <View>
          <Image source={{ uri: photo }} style={{height: 240, borderRadius: 8}} />
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.comment}>
          <TextInput placeholder="Комментировать..." style={styles.input}/>
          <View style={styles.btn}>
            <Feather name="arrow-up" size={20} color="#fff"/>
          </View>
        </TouchableOpacity>
        </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 32,
    justifyContent: "space-between",
  },
  comment: {
    position: "relative",
    justifyContent: "center",
    height: 50,
    borderRadius: 100,
    marginBottom: 16,
    paddingLeft: 16,
    ...Platform.select({
      ios: { backgroundColor: "#F6F6F6" },
      android: { backgroundColor: "#F6F6F6" },
    }),
  },
  input: {
    fontFamily: "RobotoMedium",
    color: "#212121",
    fontSize: 16
  },
  btn: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    width: 34,
    backgroundColor: "#FF6C00",
  }
});

export default CommentsScreen;