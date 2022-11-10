import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import bg from "./assets/images/bg.jpeg";
import SensorAnimatedImage from "./src/components/sensorAnimatedImage/SensorAnimatedImage";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <LockScreen /> */}
      <StatusBar style="dark" />
      <SensorAnimatedImage image={bg} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
