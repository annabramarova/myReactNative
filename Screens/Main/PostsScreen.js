import { Image, StyleSheet, Text, View } from "react-native";

const PostsScreen = ({ route }) => {
    const { name, email } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#E8E8E8",
                    marginRight: 8,
                }}>
                    <Image source={require('../../assets/images/user.png')} style={styles.avatar} />
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={{
                        fontFamily: "RobotoBold",
                        fontSize: 13,
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
        </View>)
}

const styles = StyleSheet.create({
  container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 32,
    },
    avatar: {
        width: '100%',
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 16,
    }
});


export default PostsScreen;