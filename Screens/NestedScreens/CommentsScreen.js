import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard} from "react-native";

import { Feather } from "@expo/vector-icons"; 
import { useState } from "react";
import { useSelector } from "react-redux";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect } from "react";

const CommentsScreen = ({ navigation, route }) => {
  const { photo, postId } = route.params;

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { name } = useSelector((state) => state.auth);

  const onSubmit = async () => {
    const docRef = await addDoc(collection(db, `posts/${postId}`, 'comments'), {
      comment,
      name,
    });
    Keyboard.dismiss();
    setComment("");
  };

  const getAllPosts = async () => {
    querySnapshot = await getDocs(
      collection(db, `posts/${postId}/comments`)
    );
    setAllComments(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  
    return (
      <View style={styles.container}>
        <View>
          <Image source={{ uri: photo }} style={{height: 240, borderRadius: 8}} />
        </View>
        <SafeAreaView style={{flex: 1, marginTop: 32}}>
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            let isEven = index % 2 === 0;
            return (
              <View
                style={{
                  marginBottom: 24,
                  flexDirection: isEven ? "row" : "row-reverse",
                }}
              >
                <View>
                  <Text>{item.name}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: isEven ? 16 : 0,
                    marginRight: isEven ? 0 : 16,
                    ...styles.commentWrap,
                  }}
                >
                  <Text style={styles.comment}>{item.comment}</Text>
                </View>
              </View>
            );
          }}
        />
      </SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={onSubmit}
      >
        <TextInput
          value={comment}
          onChange={({ nativeEvent: { text } }) => {
            setComment(text);
          }}
          placeholder="Коммментировать..."
          style={styles.input}
        />
        <View
          style={styles.icon}
        >
          <Feather name="arrow-up" size={20} color="#fff" />
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
  button: {
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
  icon: {
    position: "absolute",
    top: 8,
    right: 8,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    width: 34,
    backgroundColor: "#FF6C00",
  },
  comment: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 13,
  },
  commentWrap: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  }
});

export default CommentsScreen;