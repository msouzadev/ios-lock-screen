import { useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  useWindowDimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import wallpaper from "../../../assets/images/wallpaper.webp";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Animated, {
  interpolate,
  SlideInDown,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  useAnimatedGestureHandler,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import NotificationsList from "../../components/notificationsList/NotificationsList";
import SwipeUpToOpen from "../../components/swipeUpToOpen/SwipeUpToOpen";
import home2 from "../../../assets/images/home2.jpg";

export default function LockScreen() {
  const [date, setDate] = useState(dayjs());
  const lockScreenY = useSharedValue(0);
  const footerVisibility = useSharedValue(1);
  const footerHeight = useDerivedValue(() =>
    interpolate(footerVisibility.value, [0, 1], [0, -85])
  );

  const { height } = useWindowDimensions();
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

  const animatedFooterStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(footerVisibility.value, [0, 1], [-85, 0]),
    opacity: footerVisibility.value,
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(lockScreenY.value, {
          duration: 100,
          easing: Easing.linear,
        }),
      },
    ],
  }));

  const unlockGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      console.log("on start");
    },
    onActive: (event) => {
      console.log("active");
      lockScreenY.value = event.translationY;
      console.log({ event });
    },
    onEnd: ({ velocityY }) => {
      if (lockScreenY.value < -height / 2 || velocityY < -500) {
        lockScreenY.value = withTiming(-height, { easing: Easing.linear });
      } else {
        lockScreenY.value = withTiming(0, { easing: Easing.linear });
      }
      console.log("on end");
    },
  });

  return (
    <>
      <Image
        source={home2}
        style={{ width: "100%", height: "100%", ...StyleSheet.absoluteFill }}
      />

      <Animated.View style={[{ flex: 1 }, animatedContainerStyle]}>
        <ImageBackground source={wallpaper} style={styles.container}>
          <NotificationsList
            footerVisibility={footerVisibility}
            footerHeight={footerHeight}
            ListHeaderComponent={Header}
          />
          <Animated.View
            entering={SlideInDown}
            style={[styles.footer, animatedFooterStyle]}
          >
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="flashlight"
                size={24}
                color="white"
              />
            </View>
            <SwipeUpToOpen />

            <View style={styles.icon}>
              <Ionicons name="ios-camera" size={24} color="white" />
            </View>
          </Animated.View>
          <PanGestureHandler onGestureEvent={unlockGestureHandler}>
            <Animated.View
              style={{
                position: "absolute",
                width: "100%",
                height: 100,
                bottom: 0,
              }}
            />
          </PanGestureHandler>
        </ImageBackground>
      </Animated.View>
    </>
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
