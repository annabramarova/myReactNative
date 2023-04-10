import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  SafeAreaView,
  FlatList
} from "react-native";

import { Feather } from "@expo/vector-icons"; 
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const { photo, postId } = route.params;

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { name } = useSelector((state) => state.auth);

  const onSubmit = async () => {
    if (!comment) return;
    setIsLoading(true);
    await addDoc(collection(db, `posts/${postId}`, 'comments'), {
      comment,
      name,
      createdAt: new Date(),
    });
    setIsLoading(false);
    Keyboard.dismiss();
    setComment("");
  };
 const getAllComments = async() => {
    setIsLoading(true);
    const querySnapshot = await onSnapshot(collection(db, `posts/${postId}/comments`), (snapshot) => {
      setAllComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    });
    return querySnapshot;
  };

  const months = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${month}, ${year} | ${hours}:${minutes}`;
}

  useEffect(() => {
    getAllComments();
  }, []);

  
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: photo }} style={{ height: 240, borderRadius: 8 }} />
      </View>
      <SafeAreaView style={{ flex: 1, marginTop: 32 }}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={allComments}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              let isEven = index % 2 === 0;
              return (
                <View
                  style={{
                    flex: 1,
                    marginBottom: 24,
                    flexDirection: isEven ? "row" : "row-reverse",
                    alignItems: 'center'
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
                    {item.createdAt && (
                      <Text style={{textAlign: isEven ? "right" : 'left', ...styles.timestamp}}>
                        {formatDate(item.createdAt.seconds)}
                      </Text>
                    )}
                  </View>
                </View>
              );
            }}
          />
        )}
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
    </View>
  );
};

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
    fontFamily: "RobotoRegular",
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
  },
  timestamp: {
    fontFamily: "RobotoRegular",
    fontSize: 10,
    lineHeight: 12,    
    color: '#BDBDBD',
  }
});

export default CommentsScreen;