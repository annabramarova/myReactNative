import { Image, StyleSheet, Text, View } from "react-native";

const MapScreen = () => {
    return (
        <View style={styles.container}>
             <Text>MapScreen</Text>
        </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapScreen;