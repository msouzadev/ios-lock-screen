import { useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import wallpaper from "./assets/images/wallpaper.webp";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";
import NotificationsList from "./src/components/notificationsList/NotificationsList";
import SwipeUpToOpen from "./src/components/swipeUpToOpen/SwipeUpToOpen";
export default function App() {
  const [date, setDate] = useState(dayjs());
  useEffect(() => {
    let timer = setInterval(() => {
      setDate(dayjs());
    }, 1000 * 1);

    return () => clearInterval(timer);
  }, []);

  const Header = useMemo(
    () => (
      <Animated.View entering={SlideInUp} style={styles.header}>
        <Ionicons name="ios-lock-closed" size={20} color="white" />
        <Text style={styles.date}>{date.format("dddd, DD MMMM")}</Text>
        <Text style={styles.time}>{date.format("hh:mm")}</Text>
      </Animated.View>
    ),
    [date]
  );
  return (
    <ImageBackground source={wallpaper} style={styles.container}>
      <NotificationsList ListHeaderComponent={Header} />
      <Animated.View entering={SlideInDown} style={styles.footer}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="flashlight" size={24} color="white" />
        </View>
        <SwipeUpToOpen />
        <View style={styles.icon}>
          <Ionicons name="ios-camera" size={24} color="white" />
        </View>
      </Animated.View>
      <StatusBar style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 30,
    marginTop: "auto",
    paddingVertical: 10,
    height: 75,
  },
  icon: {
    backgroundColor: "#00000050",
    width: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
