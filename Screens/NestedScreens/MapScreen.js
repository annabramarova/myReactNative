import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const { location } = route.params;

    return (
        <View style={styles.container}>
        <MapView
          style={{ flex: 1, paddingHorizontal: 16 }}
          initialRegion={{
            ...location,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
          }}
        >
          <Marker coordinate={location} />
             </MapView>
        </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;