import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image } from "react-native";
import LockScreen from "./src/screens/LockScreen/LockScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <LockScreen />
      <StatusBar style="dark" />
      {/* <SensorAnimatedImage image={bg} /> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
