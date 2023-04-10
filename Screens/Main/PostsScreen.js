import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, FlatList,SafeAreaView, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";

const PostsScreen = ({ navigation}) => {
  const [posts, setPosts] = useState([]);

  const { userId, name, email } = useSelector((state) => state.auth);

  const getPosts = async () => {
      await onSnapshot(collection(db, "posts"), (querySnapshot) => {
        const updatedPosts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
        setPosts(updatedPosts);
      })
  };

useEffect(() => {
  getPosts();
}, []);
  

  return (
    <View style={styles.page}>
      <View style={styles.user}>
      <View style={{
        width: 60,
          height: 60,
          marginRight: 8
      }}>
        <Image source={require('../../assets/images/user.png')}
          style={{
            width: "100%",
            flex: 1,
            resizeMode: "cover",
            borderRadius: 16,
          }} />
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Text style={{
          fontFamily: "RobotoBold",
            fontSize: 13,
          fontWeight: 'bold',
          lineHeight: 15,
          color: "#212121",
        }}>
          {name}
        </Text>
        <Text style={{
          fontFamily: "RobotoRegular",
          fontSize: 11,
          lineHeight: 13,
          color: "#212121",
        }}>
          {email}
        </Text>
        </View>
        </View>
      {posts && (
        <SafeAreaView style={{paddingBottom:88}}>
          <FlatList
            style={styles.flat}
            data={posts}
            keyExtractor={(_, indx) => indx.toString()}
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
                    marginBottom: 34,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 24,
                      }}
                      onPress={() => {
                        navigation.navigate("Comments", {
                          photo: item.photo,
                          postId: item.id,
                        });
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
                        0
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
        </SafeAreaView>
      )}
    </View>)
};

const styles = StyleSheet.create({
  page: {
        flex: 1,
        backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  user: {
        flexDirection: 'row',
        paddingVertical: 32,
  },
  flat: {
     position: "relative",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  item: {
     backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontFamily: "RobotoMedium",
    color: "#212121",
    fontSize: 16,
    marginBottom: 11,
  }
});


export default PostsScreen;