import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import wallpaper from "./assets/images/wallpaper.webp";
export default function App() {
  return (
    <ImageBackground source={wallpaper} style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="ios-lock-closed" size={20} color="white" />
        <Text style={styles.date}>Tuesday, 8 November</Text>
        <Text style={styles.time}>15:26</Text>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    height: 250,
    alignItems: "center",
  },
  date: {
    marginTop: 20,
    color: "#C3FFFE",
    fontSize: 20,
    fontWeight: "500",
  },
  time: {
    fontSize: 82,
    fontWeight: "bold",
    color: "#C3FFFE",
  },
});
