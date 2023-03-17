
import { ImageBackground, KeyboardAvoidingView, StyleSheet } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
// import RegistrationScreen from './Screens/RegistrationScreen';

export default function App() {
  return (
    <View style={styles.container}>
         <LoginScreen />
        {/* <RegistrationScreen /> */}
      </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: "#fff",
  },
});